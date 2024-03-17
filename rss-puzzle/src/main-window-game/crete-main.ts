import { createTag } from '../base-components/base-components';
import './main-window.scss';
import { data } from '../take-data/data';
import { ClickMoveDraggableSpan } from './functional-game/click-guessing';

export class CreateMainGameWindow {
  private main: HTMLElement | null;
  clickMoveDraggable: ClickMoveDraggableSpan;
  constructor() {
    this.main = document.querySelector('.main');
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
      const spanNum = createTag({ tag: 'span', className: 'span-num', textContent: `${i++}` });

      // i can t undestend why can t fine document.querySelectorAll(`#${sentencesId} span`);
      // write that selector can t be number so i make id='_num'
      const sentencesDiv = createTag({ tag: 'div', className: 'droppable_sentences', id: `_${el.id}` });
      containerSpanNum.append(spanNum);
      const textArray = el.textExample.split(' ');

      this.createWordSpanOnSentences(textArray, sentencesDiv, 'data-draggable-span');

      containerSentences.append(sentencesDiv);
      playingField.append(containerSpanNum, containerSentences);
    });
  }

  //create words in span
  createWordSpanOnSentences(sentences: string[], parent: HTMLElement, typeAttribute: string, guessing?: string) {
    sentences.forEach((el) => {
      const spanWordTextEnglish = createTag({
        tag: 'span',
        className: 'droppable_word',
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
        }
      }, 0);
    });
  }

  createSentenceForGuessing() {
    const guessingField = createTag({ tag: 'section', className: ['section', 'guessing-field'] });
    const containerGuessing = createTag({
      tag: 'div',
      className: ['section', 'guessing_container'],
      // id: `${data.rounds[0].words[0].id}`,
      attributeType: { type: 'data-draggable-id', text: `${data.rounds[0].words[0].id}` },
    });
    const sentencesGuessing = data.rounds[0].words[0].textExample.split(' ');
    this.createWordSpanOnSentences(sentencesGuessing, containerGuessing, 'data-draggable-span', 'true');

    guessingField.append(containerGuessing);
    this.main?.append(guessingField);
  }
}
