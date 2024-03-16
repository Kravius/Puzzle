import { User } from './type';
import { createTag } from '../base-components/base-components';

export class UserLogFunc {
  private _user: User | undefined;
  constructor() {
    this._user;
    this.checkUserInLocalStorage();
  }
  private checkUserInLocalStorage() {
    const jsonUser = localStorage.getItem('user');
    if (jsonUser !== null) {
      this._user = JSON.parse(jsonUser);
      console.log(this._user);
      return this._user;
    }
    return false;
  }

  get getUser(): User | undefined {
    return this._user;
  }

  logIn() {
    const userTextLog = document.querySelector('.user-name') as HTMLElement;
    if (this._user) {
      this.greetingMessage();
      setTimeout(() => {
        if (this._user) userTextLog.textContent = `_ ${this._user.name} ${this._user.surname} _`;
      }, 3000);

      return;
    } else return false;
  }

  logOutText() {
    localStorage.removeItem('user');
    const userTextLog = document.querySelector('.user-name') as HTMLElement;
    userTextLog.textContent = ``;
  }

  greetingMessage() {
    let content = '';
    if (this._user) {
      content = `Hello ${this._user.name} ${this._user.surname}`;
    }
    const messages = createTag({
      tag: 'div',
      className: 'messages',
      childrenArray: [{ tag: 'p', textContent: content }],
    });
    document.querySelector('.main')?.append(messages);
    setTimeout(() => {
      document.querySelector('.messages')?.remove();
    }, 2000);
  }
}

export const userLogFuncClass = new UserLogFunc();
