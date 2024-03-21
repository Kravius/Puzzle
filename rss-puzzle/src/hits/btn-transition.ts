import { createTag } from '../base-components/base-components';
import { data } from '../take-data/data';
import './hints.scss';
export class ButtonTransition {
  parentHeader: HTMLElement | null;
  containerBtns: HTMLElement | null;
  constructor() {
    this.parentHeader = document.querySelector('.header');
    this.containerBtns = null;
  }

  json() {
    const Json = localStorage.getItem('IdObject');
    if (Json) {
      return JSON.parse(Json);
    }
  }

  runBTN() {
    this.createHints();
    this.textfHits();
  }

  createHints() {
    this.containerBtns = createTag({ tag: 'div', className: ['container-hints'] });

    this.containerBtns.append(this.createBTNHitsSentences(), this.creatAudioBtn(), this.createImageBtn());
    const LogOut = document.querySelector('.log-out_btn');
    document.querySelector('.header')?.insertBefore(this.containerBtns, LogOut);
  }

  createBTNHitsSentences() {
    const BTN = createTag({ tag: 'button', className: ['button', 'hints-sentences-btn'], textContent: 'Hint' });

    BTN.addEventListener('click', () => {
      document.querySelector('.text-hits')?.classList.toggle('none');
      BTN.classList.toggle('active');
    });

    return BTN;
  }

  textfHits() {
    let { lvlElementIndex, nextGuessingIndexWord, currentRound } = this.json();
    let sentences = data[lvlElementIndex].rounds[currentRound].words[nextGuessingIndexWord].textExampleTranslate;

    const textHits = createTag({ tag: 'h2', className: ['text-hits'], textContent: `${sentences}` });

    document.querySelector('.main')?.prepend(textHits);
  }

  creatAudioBtn() {
    const BTN = createTag({ tag: 'button', className: ['button', 'hints-audio-btn'], textContent: 'play' });
    let audio: HTMLAudioElement | null = null;

    BTN.addEventListener('click', () => {
      let { lvlElementIndex, nextGuessingIndexWord, currentRound } = this.json();
      let audioFile = data[lvlElementIndex].rounds[currentRound].words[nextGuessingIndexWord].audioExample;
      BTN.classList.toggle('active');

      if (audio && !audio.paused) {
        audio.pause();
        BTN.classList.remove('active');
      } else {
        audio = new Audio(`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioFile}`);
        audio.play();
        audio.addEventListener('ended', () => {
          BTN.classList.remove('active');
        });
      }
    });
    return BTN;
  }

  createImageBtn() {
    const BTN = createTag({ tag: 'button', className: ['button', 'hints-img-btn'], textContent: 'img' });
    BTN.addEventListener('click', () => {
      let arrSpan = document.querySelectorAll('.word');
      Array.from(arrSpan).forEach((el) => {
        el.classList.toggle('active-word-img');
      });
      // background: rgba(0, 0, 0, 0) !important;

      BTN.classList.toggle('active');
    });
    return BTN;
  }
}
