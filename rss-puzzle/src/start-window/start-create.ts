import { createTeg } from '../base-components/base-components';
import './start.scss';
export class StartWindow {
  loginScreen: HTMLElement | null;
  main: HTMLElement | null;
  constructor() {
    this.loginScreen = null;
    this.main = document.querySelector('.main');
  }
  createStartWindow() {
    const divStart = createTeg({
      tag: 'div',
      id: 'start-screen',
      childrenArray: [
        { tag: 'h1', textContent: 'ENGLISH PUZZLE' },
        { tag: 'p', textContent: 'Click on words, collect phrases.' },
        { tag: 'p', textContent: 'Words can be dragged and dropped.' },
        { tag: 'p', textContent: 'Select tooltips in the menu.' },
      ],
    });
    const startBTN = createTeg({ tag: 'button', className: 'start-btn', textContent: 'Start' });
    divStart.append(startBTN);
    this.main?.append(divStart);
  }
  removeLoginWindowFromMain() {
    const loginScreen = document.querySelector('#login-screen') as HTMLElement;
    if (this.main) {
      this.loginScreen = this.main?.removeChild(loginScreen) as HTMLElement;
      // this.main.style.setProperty('background-image', `url('../../public/background-start/planet.jpg')`);
      this.main.style.backgroundImage = `url('../../public/background-start/stars.jpeg')`;
      this.main.style.backgroundSize = '100vw 100vh';
    }
    this.createStartWindow();
  }
}
