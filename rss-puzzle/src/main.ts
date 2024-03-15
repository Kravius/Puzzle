import './style.scss';
import { startWindow } from './start-window/start-create';
// import { StartWindow } from './start-window/start-create';
import { Wrapper } from './wrapper/wrapper';
import { Header } from './header/header';
import { userLogFuncClass } from './header/func-log';

const wrapper = new Wrapper();
wrapper.createWrapper();

const headerClass = new Header();

//check Have we user or not to load startWindow
if (userLogFuncClass) {
  console.log(userLogFuncClass.getUser);
  if (userLogFuncClass.getUser) {
    headerClass.createHeader();
    startWindow.removeLoginWindowFromMain();
  }
}
// startScreen.removeStartWindowFromMain();
// const main = document.querySelector('.main');
// if (startScreen.loginScreen) {
//   main?.append(startScreen.loginScreen);
// }
