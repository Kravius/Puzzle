import { createTag } from '../base-components/base-components';
import { checkInput } from './func-login';
import './login-window.scss';
import { checkAfterClickBtnInputs } from './save-LocalStorage';
export class LoginWindow {
  constructor() {}

  public createMain(): HTMLElement {
    const main = createTag({
      tag: 'main',
      className: 'main',
    });

    this._createLoginForm(main);
    return main;
  }

  private _createLoginForm(main: HTMLElement) {
    const div = document.createElement('div');
    div.id = 'login-screen';
    const form = this._createFormLogin();
    div.append(form);
    main.append(div);
    // checkInput();
  }

  private _createFormLogin(): HTMLElement {
    //we use class basic tag components to create and check new tgs;
    const form = createTag({
      tag: 'form',
      className: 'form-login',
    });
    const inputUsername = createTag({
      tag: 'input',
      attributeType: { type: 'name', text: 'username' },
      id: 'username',
      className: 'form-input',
    });
    inputUsername.setAttribute('required', '');
    inputUsername.addEventListener('blur', checkInput);

    const labelUsername = createTag({
      tag: 'label',
      attributeType: { type: 'for', text: 'username' },
      textContent: 'Username',
    });

    const inputUserSurname = createTag({
      tag: 'input',
      attributeType: { type: 'name', text: 'user-surname' },
      id: 'user-surname',
      className: 'form-input',
    });
    inputUserSurname.setAttribute('required', '');
    inputUserSurname.addEventListener('blur', checkInput);

    const labelUserSurname = createTag({
      tag: 'label',
      attributeType: { type: 'for', text: 'user-surname' },
      textContent: 'User Surname',
    });

    // const paragraph = createTag({
    //   tag: 'p',
    //   className: 'login',
    //   textContent: 'Login',
    // });
    const BTN = createTag({ tag: 'button', className: 'form-login_btn', textContent: 'Login' });

    BTN.addEventListener('click', checkAfterClickBtnInputs);
    form.append(labelUsername, inputUsername, labelUserSurname, inputUserSurname, BTN);
    return form;
  }
}
