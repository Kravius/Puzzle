import { createTag } from '../base-components/base-components';
import { data } from '../take-data/data';
import './hints.scss';
export class ButtonTransition {
  constructor() {}

  runBTN() {
    this.createBTNHitsSentences();
    this.textfHits();
  }

  createBTNHitsSentences() {
    const divContainer = createTag({ tag: 'div', className: ['container-hints'] });
    const BTN = createTag({ tag: 'button', className: ['button', 'hints-sentences-btn'], textContent: 'Hint' });

    BTN.addEventListener('click', () => {
      document.querySelector('.text-hits')?.classList.toggle('none');
    });
    divContainer.append(BTN);
    const LogOut = document.querySelector('.log-out_btn');
    document.querySelector('.header')?.insertBefore(divContainer, LogOut);
  }

  textfHits() {
    const Json = localStorage.getItem('IdObject');
    let IdObject;
    if (Json) {
      IdObject = JSON.parse(Json);
    }

    let { lvlElementIndex, nextGuessingIndexWord, currentRound } = IdObject;
    let sentences = data[lvlElementIndex].rounds[currentRound].words[nextGuessingIndexWord].textExampleTranslate;

    const textHits = createTag({ tag: 'h2', className: ['text-hits'], textContent: `${sentences}` });

    document.querySelector('.main')?.prepend(textHits);
  }
}
