type ClickHandler = (this: HTMLElement, ev?: FocusEvent) => void;

export const checkInput: ClickHandler = function (ev?: FocusEvent) {
  console.log(ev?.target);
};
