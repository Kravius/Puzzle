import { createTag } from '../base-components/base-components';
import './start.scss';
import { startGameBtn } from './start-btn';
// import { Header } from '../header/header';

export class StartWindow {
  loginScreen: HTMLElement | null;
  main: HTMLElement | null;
  startWindow: HTMLElement | null;
  // headerClass: Header;
  constructor() {
    this.main = null;
    this.loginScreen = null;
    this.startWindow = null;
    // this.headerClass = new Header();
  }
  createStartWindow() {
    this.startWindow = createTag({
      tag: 'div',
      id: 'start-screen',
      childrenArray: [
        { tag: 'h1', textContent: 'ENGLISH PUZZLE' },
        { tag: 'p', textContent: 'Click on words, collect phrases.' },
        { tag: 'p', textContent: 'Words can be dragged and dropped.' },
        { tag: 'p', textContent: 'Select tooltips in the menu.' },
      ],
    });
    const startBTN = createTag({ tag: 'button', className: 'start-btn', textContent: 'Start' });
    startBTN.addEventListener('click', () => {
      startGameBtn(this.main, this.startWindow);
    });
    this.startWindow.append(startBTN);
    this.main?.append(this.startWindow);
  }
  removeLoginWindowFromMain() {
    this.main = document.querySelector('.main');
    this.loginScreen = document.querySelector('#login-screen') as HTMLElement;
    console.log(this.main);
    if (this.main) {
      this.loginScreen = this.main?.removeChild(this.loginScreen) as HTMLElement;
      this.main.style.backgroundImage = `url('../../public/background-start/stars.jpeg')`;
      this.main.style.backgroundSize = '100vw 100vh';
    }
    //create Start window
    this.createStartWindow();
  }

  removeStartWindowFromMain() {
    if (this.main) {
      if (this.startWindow) {
        this.startWindow = this.main?.removeChild(this.startWindow) as HTMLElement;
      }
      if (this.loginScreen) {
        this.main?.append(this.loginScreen);
        this.main.style.backgroundImage = ``;
        this.main.style.backgroundSize = '';
      }
    }
  }
}

export const startWindow = new StartWindow();
