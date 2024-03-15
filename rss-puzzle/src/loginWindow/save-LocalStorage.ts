type SubmitFunc = (this: HTMLElement, ev?: Event) => void;

// maybe we will need in future to check BTN
export const checkAfterClickBtnInputs: SubmitFunc = (ev?: Event) => {
  const inputName = document.querySelectorAll('.form-input')[0] as HTMLInputElement;
  const inputSurname = document.querySelectorAll('.form-input')[1] as HTMLInputElement;

  const userJSON = { name: inputName.value, surname: inputSurname.value };

  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify(userJSON));
  }
  localStorage.setItem('user', JSON.stringify(userJSON));
  // ev?.preventDefault();
  // console.log(123);
};
