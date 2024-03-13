import './wrapper.scss';
import { LoginWindow } from '../loginWindow/login-window';

export class Wrapper {
  private wrapper: HTMLElement;
  constructor() {
    this.wrapper = document.createElement('div') as HTMLElement;

    document.body.append(this.wrapper);
  }
  createWrapper() {
    this.wrapper.className = 'wrapper';
    const loginWindow = new LoginWindow();
    this.wrapper.append(loginWindow.createMain());
  }
}
