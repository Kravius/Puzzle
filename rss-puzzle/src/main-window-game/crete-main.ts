import { createTag } from '../base-components/base-components';
import './main-window.scss';
import { data } from '../take-data/data';
import { ClickMoveDraggableSpan } from './functional-game/move-words';
import { checkGuessingSentencesForEmpty, checkSentencesInGameFiled } from './functional-game/check-btn';

export class CreateMainGameWindow {
  private main: HTMLElement | null;
  private id: string | null;
  clickMoveDraggable: ClickMoveDraggableSpan;
  constructor() {
    this.main = document.querySelector('.main');
    this.id = null;
    this.initialize();
    this.clickMoveDraggable = new ClickMoveDraggableSpan();
  }

  initialize() {
    // delete
    // console.log(12);
    this.createSectionCarts();
    this.createSentenceForGuessing();
  }

  createSectionCarts() {
    const playingField = createTag({ tag: 'section', className: ['section', 'playing-field'] });
    if (data) {
      this.createSentences(playingField);
      //delete
      // console.log(data.rounds[0].words[0].textExample);
      //all picture
      // console.log(data.rounds[1].words);
    }
    this.main?.append(playingField);
  }

  createSentences(playingField: HTMLElement) {
    const containerSentences = createTag({ tag: 'div', className: 'container_field' });
    let i = 1;
    const containerSpanNum = createTag({ tag: 'div', className: 'container-num' });
    data.rounds[0].words.forEach((el) => {
      this.id = `_${el.id}`;
      const spanNum = createTag({ tag: 'span', className: 'span-num', textContent: `${i++}` });

      // i can t undestend why can t fine document.querySelectorAll(`#${sentencesId} span`);
      // write that selector can t be number so i make id='_num'
      const sentencesDiv = createTag({ tag: 'div', className: 'droppable_sentences', id: `_${el.id}` });
      containerSpanNum.append(spanNum);
      const textArray = el.textExample.split(' ');

      this.createWordSpanOnSentences(textArray, sentencesDiv, 'data-draggable-span', ['word', 'droppable-word']);

      containerSentences.append(sentencesDiv);
      playingField.append(containerSpanNum, containerSentences);
    });
  }

  //create words in span
  createWordSpanOnSentences(
    sentences: string[],
    parent: HTMLElement,
    typeAttribute: string,
    className: string | string[],
    guessing?: string
  ) {
    sentences.forEach((el) => {
      const spanWordTextEnglish = createTag({
        tag: 'span',
        className: className,
        //if we have create for guessing we write word
        textContent: guessing ? el : '',
        attributeType: [
          { type: typeAttribute, text: el },
          { type: 'draggable', text: 'true' },
        ],
      });
      parent.append(spanWordTextEnglish);
      setTimeout(() => {
        if (guessing) {
          spanWordTextEnglish.style.width = `${spanWordTextEnglish.offsetWidth}px`;
          spanWordTextEnglish.style.height = `${spanWordTextEnglish.offsetHeight}px`;
        }
      }, 0);
    });
  }

  createSentenceForGuessing() {
    const guessingField = createTag({ tag: 'section', className: ['section', 'guessing-field'] });
    const containerGuessing = createTag({
      tag: 'div',
      className: 'guessing_container',
      // id: `${data.rounds[0].words[0].id}`,
      attributeType: { type: 'data-draggable-id', text: `${data.rounds[0].words[0].id}` },
    });
    const sentencesGuessing = data.rounds[0].words[0].textExample.split(' ');
    this.createWordSpanOnSentences(
      sentencesGuessing,
      containerGuessing,
      'data-draggable-span',
      ['word', 'draggable-word'],
      'true'
    );

    containerGuessing.addEventListener('click', () => {
      checkGuessingSentencesForEmpty();
    });
    guessingField.append(containerGuessing);

    this.createCheckBtn(guessingField);
    this.main?.append(guessingField);
  }

  createCheckBtn(parent: HTMLElement) {
    const divBtns = createTag({ tag: 'div', className: 'guessing-field__btn' });
    const checkBtn = createTag({
      tag: 'button',
      className: ['button', 'guessing-field__check-btn'],
      textContent: 'Check',
      attributeType: { type: 'disabled', text: '' },
    });

    checkBtn.addEventListener('click', () => {
      if (this.id) {
        checkSentencesInGameFiled();
      }
    });
    divBtns.append(checkBtn);
    parent.append(divBtns);
  }
}
