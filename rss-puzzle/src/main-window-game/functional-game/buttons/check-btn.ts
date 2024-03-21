export function checkGuessingSentencesForEmpty() {
  const draggableWord = document.querySelectorAll('.draggable-word');

  const checkSentences = [...draggableWord].every((span) => {
    return !span.textContent || span.textContent.trim() === '';
  });
  // console.log(checkSentences);
  if (checkSentences) {
    const checkBtn = document.querySelector('.guessing-field__check-btn');
    checkBtn?.removeAttribute('disabled');
  }
}

export function checkSentencesInGameFiled(sentencesGuessingArray: string[]): boolean {
  const guessingSentenceId = document.querySelector('.guessing_container')?.getAttribute('data-draggable-id');

  const droppableWords = document.querySelectorAll(`#_${guessingSentenceId} span`);

  let flag = true;
  const arrForCheck = Array.from(droppableWords);
  arrForCheck.forEach((el, index) => {
    const span = el as HTMLElement;
    if (sentencesGuessingArray[index] === span.textContent) {
      span.style.border = '1px solid green';
    } else {
      flag = false;
      span.style.border = '1px solid red';
    }
    setTimeout(() => {
      span.style.border = '';
    }, 5000);
  });
  if (flag === true) {
    deleteDragoble(flag, arrForCheck);
  }
  return flag;
}

function deleteDragoble(key: boolean, arr: Element[]) {
  arr.forEach((el) => {
    el.removeAttribute('draggable');
  });
}
