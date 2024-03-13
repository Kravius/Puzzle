// import { createTeg } from '../base-components/base-components';
// import { checkInput } from './func-login';

// export class LoginWindow {
//   constructor() {}

//   public createMain(): HTMLElement {
//     const main = createTeg({
//       tag: 'main',
//       className: 'main',
//     });

//     this._createLoginForm(main);
//     return main;
//   }

//   private _createLoginForm(main: HTMLElement) {
//     const div = document.createElement('div');

//     const form = this._createFormLogin();
//     div.append(form);
//     main.append(div);
//     checkInputName();
//   }

//   private _createFormLogin(): HTMLElement {
//     //we use class basic tag components to create and check new tgs;
//     const form = createTeg({
//       tag: 'form',
//       className: 'form-login',
//       childrenArray: [
//         {
//           tag: 'p',
//           className: 'login',
//           textContent: 'Login',
//         },
//         {
//           tag: 'label',
//           attributeType: { type: 'for', text: 'username' },
//         },
//         {
//           tag: 'input',
//           attributeType: { type: 'name', text: 'userName' },
//           id: 'username',
//         },
//         {
//           tag: 'label',
//           attributeType: { type: 'for', text: 'userSurname' },
//         },
//         {
//           tag: 'input',
//           attributeType: { type: 'name', text: 'userName' },
//           id: 'userSurname',
//         },
//         { tag: 'button', className: 'form-login_btn', textContent: 'Login' },
//       ],
//     });
//     form.addEventListener('click', (ev) => {
//       if (ev.target instanceof HTMLElement && ev.target.classList.contains('form-login_btn')) {
//         console.log(333);
//       }
//     });
//     return form;
//   }
// }
import { createTeg } from '../base-components/base-components';
import { checkInput } from './func-login';
import './login-window.scss';
export class LoginWindow {
  constructor() {}

  public createMain(): HTMLElement {
    const main = createTeg({
      tag: 'main',
      className: 'main',
    });

    this._createLoginForm(main);
    return main;
  }

  private _createLoginForm(main: HTMLElement) {
    const div = document.createElement('div');

    const form = this._createFormLogin();
    div.append(form);
    main.append(div);
    // checkInput();
  }

  private _createFormLogin(): HTMLElement {
    //we use class basic tag components to create and check new tgs;
    const form = createTeg({
      tag: 'form',
      className: 'form-login',
    });
    const inputUsername = createTeg({
      tag: 'input',
      attributeType: { type: 'name', text: 'userName' },
      id: 'username',
      className: 'form-input',
    });
    inputUsername.setAttribute('required', '');
    inputUsername.addEventListener('blur', checkInput);

    const labelUsername = createTeg({
      tag: 'label',
      attributeType: { type: 'for', text: 'username' },
      textContent: 'Username',
    });

    const inputUserSurname = createTeg({
      tag: 'input',
      attributeType: { type: 'name', text: 'userSurname' },
      id: 'userSurname',
      className: 'form-input',
    });
    inputUserSurname.setAttribute('required', '');
    inputUserSurname.addEventListener('blur', checkInput);

    const labelUserSurname = createTeg({
      tag: 'label',
      attributeType: { type: 'for', text: 'userSurname' },
      textContent: 'User Surname',
    });

    // const paragraph = createTeg({
    //   tag: 'p',
    //   className: 'login',
    //   textContent: 'Login',
    // });
    const BTN = createTeg({ tag: 'button', className: 'form-login_btn', textContent: 'Login' });

    BTN.addEventListener('click', (ev) => {
      if (ev.target instanceof HTMLElement && ev.target.classList.contains('form-login_btn')) {
        console.log(333);
      }
    });
    form.append(labelUsername, inputUsername, labelUserSurname, inputUserSurname, BTN);
    return form;
  }
}