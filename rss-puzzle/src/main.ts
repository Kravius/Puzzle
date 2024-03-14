import './style.scss';
import { StartWindow } from './start-window/start-create';
import { Wrapper } from './wrapper/wrapper';

const wrapper = new Wrapper();
wrapper.createWrapper();
export const startScreen = new StartWindow();
startScreen.removeLoginWindowFromMain();
// const main = document.querySelector('.main');
// if (startScreen.loginScreen) {
//   main?.append(startScreen.loginScreen);
// }
