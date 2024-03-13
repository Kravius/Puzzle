type fucusFunc = (this: HTMLElement, ev?: FocusEvent) => void;
type FirstLetter = (value: string) => boolean;
type SubmitFunc = (this: HTMLElement, ev?: SubmitEvent) => boolean;
type lengthFunc = (value: string, length: number) => boolean;

const checkInput: fucusFunc = function (ev?: FocusEvent) {
  if (ev?.target instanceof HTMLInputElement && ev.target.id === 'username') {
    const name = ev?.target.value;

    //in test name mast be 3 or more
    if (!checkLengthAndRegExp(name, 3)) {
      return changeValueInput('short', ev.target);
    }
    if (!isFirstLetterCapitalized(name)) {
      return changeValueInput('', ev.target);
    }
    ev.target.style.borderColor = 'green';
  }
  if (ev?.target instanceof HTMLInputElement && ev.target.id === 'user-surname') {
    const surname = ev?.target.value;

    //in test name mast be 3 or more
    if (!checkLengthAndRegExp(surname, 3)) {
      return changeValueInput('short', ev.target);
    }
    if (!isFirstLetterCapitalized(surname)) {
      return changeValueInput('', ev.target);
    }
    ev.target.style.borderColor = 'green';
  }
};

const checkLengthAndRegExp: lengthFunc = (value, length) => {
  const regularTest = /^[a-zA-Z-]+$/;
  return value.length >= length && regularTest.test(value);
};

const isFirstLetterCapitalized: FirstLetter = (input) => {
  return /^[A-Z]/.test(input);
};

// type Change = (name: string, ev?: FocusEvent | SubmitEvent, input?: HTMLInputElement) => boolean;
type Change = (name: string, ev?: Element) => boolean;

const changeValueInput: Change = (name, ev) => {
  //short is  name of function where we call it
  const textForPlaceholder: string = name === 'short' ? 'to short must be 3 or more letter' : 'first Letter Big';
  if (ev instanceof HTMLInputElement) {
    ev.value = '';
    ev.placeholder = textForPlaceholder;
    ev.style.borderColor = 'red';
  }
  return false;
};

export { checkInput };
