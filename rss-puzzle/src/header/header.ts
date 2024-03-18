import { createTag } from '../base-components/base-components';
import './header.scss';
import { userLogFuncClass } from './func-log';
import { startWindow } from '../start-window/start-create';

export class Header {
  private _wrapper: HTMLElement | null;
  private _header: HTMLElement | null;
  constructor() {
    this._wrapper = document.querySelector('.wrapper');
    this._header = null;
  }
  createHeader() {
    this._header = createTag({
      tag: 'header',
      className: 'header',
      childrenArray: [
        { tag: 'p', textContent: 'Welcome:' },
        { tag: 'h2', className: 'user-name' },
      ],
    });
    this._wrapper?.prepend(this._header);

    userLogFuncClass.logIn();
    this.createLogOutBtn();
  }

  private createLogOutBtn() {
    const logOutBtn = createTag({ tag: 'button', className: ['log-out_btn', 'button'], textContent: 'Log Out' });
    logOutBtn.addEventListener('click', () => {
      userLogFuncClass.logOutText();
      this.removeHeaderFromWrapper();
      startWindow.removeStartWindowFromMain();
    });
    this._header?.append(logOutBtn);
  }

  get getHeaderHTML() {
    return this._header;
  }

  removeHeaderFromWrapper() {
    //save _header for future use
    if (this._header) this._header = this._wrapper?.removeChild(this._header) as HTMLElement;
  }
}
