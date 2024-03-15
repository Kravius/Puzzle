import { User } from './type';

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
      userTextLog.textContent = `_ ${this._user.name} ${this._user.surname} _`;
      return;
    } else return false;
  }

  logOutText() {
    localStorage.removeItem('user');
    const userTextLog = document.querySelector('.user-name') as HTMLElement;
    userTextLog.textContent = ``;
  }
}

export const userLogFuncClass = new UserLogFunc();
