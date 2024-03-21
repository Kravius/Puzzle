import './main-window.scss';
import { createTag } from '../base-components/base-components';
import { baseComponentsTypes } from '../base-components/type';
import { data, checkWhatLvlNowJson } from '../take-data/data';
import { ClickMoveDraggableSpan } from './functional-game/move-words';
import { checkGuessingSentencesForEmpty, checkSentencesInGameFiled } from './functional-game/buttons/check-btn';
import { continuousBTN, deletedParentElement } from './functional-game/buttons/continuous-btn';

import { Rounds } from '../take-data/type';

export class CreateMainGameWindow {
  private main: HTMLElement | null;
  // clickMoveDraggable: ClickMoveDraggableSpan;
  private dataLvlForStart: Rounds | null;

  lvlElementIndex: number;
  currentRound: number;
  id: number;
  constructor() {
    this.main = document.querySelector('.main');
    this.initialize();

    this.dataLvlForStart = null;

    this.lvlElementIndex = 0;
    this.currentRound = 0;
    this.id = 0;
  }

  initialize() {
    this.createSectionCarts();
    this.createSentenceForGuessing();
    const clickMoveDraggable = new ClickMoveDraggableSpan();
    console.log(clickMoveDraggable);
  }

  createSectionCarts() {
    const playingField = createTag({ tag: 'section', className: ['section', 'playing-field'] });
    if (data) {
      this.createSentences(playingField);
    }
    this.main?.append(playingField);
  }

  createSentences(playingField: HTMLElement) {
    const containerSentences = createTag({ tag: 'div', className: 'container_field' });
    let i = 1;
    const containerSpanNum = createTag({ tag: 'div', className: 'container-num' });

    //take JSON file we work now
    [this.dataLvlForStart, this.currentRound, this.id] = checkWhatLvlNowJson();

    if (this.dataLvlForStart) {
      this.dataLvlForStart.words.forEach((el, index) => {
        const spanNum = createTag({ tag: 'span', className: 'span-num', textContent: `${i++}` });
        containerSpanNum.append(spanNum);

        // i can t undestend why can t fine document.querySelectorAll(`#${sentencesId} span`);
        // write that selector can t be number so i make id='_num'
        const sentencesDiv = createTag({ tag: 'div', className: 'droppable_sentences', id: `_${el.id}` });
        let idForSentencesWhereWeMustStop: number | null = this.id;
        if (index >= this.id) {
          idForSentencesWhereWeMustStop = null;
        }
        const textArray = el.textExample.split(' ');

        this.createWordSpanOnSentences(
          textArray,
          sentencesDiv,
          'data-draggable-span',
          ['word', 'droppable-word'],
          //delete true
          idForSentencesWhereWeMustStop
        );

        containerSentences.append(sentencesDiv);
        playingField.append(containerSpanNum, containerSentences);
      });
    }
  }

  //create words in span
  createWordSpanOnSentences(
    sentences: string[],
    parent: HTMLElement,
    typeAttribute: string,
    className: string | string[],
    putIdInSentences?: number | null
  ) {
    parent.addEventListener('drop', (event: DragEvent) => {
      this.drop(event);
    });
    sentences.forEach((el) => {
      const spanWordTextEnglish = createTag({
        tag: 'span',
        className: className,
        //if we have create for guessing we write word
        textContent: putIdInSentences ? el : '',
        id: el,
        attributeType: [
          { type: typeAttribute, text: el },
          { type: 'draggable', text: 'true' },
        ],
      });
      spanWordTextEnglish.addEventListener('dragover', (event: DragEvent) => {
        event.preventDefault();
      });
      spanWordTextEnglish.addEventListener('dragstart', (event: DragEvent) => {
        this.dragStart(event);
      });

      parent.append(spanWordTextEnglish);
      setTimeout(() => {
        if (putIdInSentences) {
          spanWordTextEnglish.style.width = `${spanWordTextEnglish.offsetWidth}px`;
          spanWordTextEnglish.style.height = `${spanWordTextEnglish.offsetHeight}px`;
        }
      }, 0);
    });
  }

  drop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      const draggableElementData = event.dataTransfer.getData('text');
      const droppableElementData = (event.target as HTMLElement).id;
      const element = document.querySelector(`#${droppableElementData}`);
      if (element) {
        element.textContent = draggableElementData;
      }
      console.log(droppableElementData);
    }
  }

  dragStart(event: DragEvent) {
    if (event.dataTransfer) {
      const targetId = (event.target as HTMLElement).getAttribute('data-draggable-span');
      event.dataTransfer.setData('text', targetId as string);
    }
  }

  // drop(event: DragEvent) {
  //   event.preventDefault(); // This is in order to prevent the browser default handling of the data
  //   // event.target.classList.remove('droppable-hover');
  //   const draggableElementData = event.dataTransfer.getData('text'); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
  //   const droppableElementData = event.target.getAttribute('data-draggable-id');
  //   // const isCorrectMatching = draggableElementData === droppableElementData;
  //   // if (isCorrectMatching) {
  //   const draggableElement = document.getElementById(draggableElementData);
  //   event.target.classList.add('dropped');
  //   // }
  // }

  createSentenceForGuessing() {
    console.log(this.id);
    console.log(this.dataLvlForStart);
    if (this.dataLvlForStart) {
      const guessingField = createTag({ tag: 'section', className: ['section', 'guessing-field'] });
      const containerGuessing = createTag({
        tag: 'div',
        className: 'guessing_container',
        attributeType: { type: 'data-draggable-id', text: `${this.dataLvlForStart.words[this.id].id}` },
      });
      const sentencesGuessingArray = this.dataLvlForStart.words[this.id].textExample.split(' ');
      const sentencesGuessing = sentencesGuessingArray.sort(() => Math.random() - 0.5);

      this.createWordSpanOnSentences(
        sentencesGuessing,
        containerGuessing,
        'data-draggable-span',
        ['word', 'draggable-word'],
        // make active true
        sentencesGuessing.length
      );

      containerGuessing.addEventListener('click', () => {
        checkGuessingSentencesForEmpty();
      });
      guessingField.prepend(containerGuessing);

      this.createCheckBtn(guessingField);
      this.main?.append(guessingField);
    }
  }

  createCheckBtn(parent: HTMLElement) {
    const divBtns = createTag({ tag: 'div', className: 'guessing-field__btn' });
    const checkBtn = this.farmToCreateButton({
      tag: 'button',
      className: ['button', 'guessing-field__check-btn'],
      textContent: 'Check',
      attributeType: { type: 'disabled', text: '' },
    });

    checkBtn.addEventListener('click', () => {
      if (checkSentencesInGameFiled()) {
        document.querySelector('.guessing-field__check-btn')?.remove();
        divBtns.append(this.createContinueCheckBtn());
      }
    });
    divBtns.append(checkBtn);
    parent.append(divBtns);
  }

  createContinueCheckBtn(): HTMLElement {
    const continueBtn = this.farmToCreateButton({
      tag: 'button',
      className: ['button', 'guessing-field__continue-btn'],
      textContent: 'Continue',
    });

    continueBtn.addEventListener('click', () => {
      //we have index of next element
      // console.log(this.id, 'befor check json');
      [this.dataLvlForStart, this.currentRound, this.id] = checkWhatLvlNowJson();

      // console.log(this.id, 'after check json');
      if (this.dataLvlForStart) {
        // console.log(this.dataLvlForStart.words[this.id].id, 'id continBTN');
        const IdLvlGameObject = continuousBTN(
          this.dataLvlForStart.words[this.id].id,
          this.dataLvlForStart.levelData.id
        );
        if (IdLvlGameObject) {
          [this.lvlElementIndex, this.currentRound, this.id] = IdLvlGameObject;
        }
      }
      // console.log(this.currentRound);
      // console.log(this.id);
      // Удаляем все дочерние элементы
      deletedParentElement();

      this.createSentenceForGuessing();
      const clickMoveDraggable = new ClickMoveDraggableSpan();
      console.log(clickMoveDraggable);
    });
    return continueBtn;
  }

  farmToCreateButton(btnParams: baseComponentsTypes): HTMLElement {
    const checkBtn = createTag({
      tag: btnParams.tag,
      className: btnParams.className,
      textContent: btnParams.textContent,
      attributeType: btnParams.attributeType,
    });
    return checkBtn;
  }
}
