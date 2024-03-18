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

export function checkSentencesInGameFiled(): boolean {
  const guessingSentenceId = document.querySelector('.guessing_container')?.getAttribute('data-draggable-id');

  const droppableWords = document.querySelectorAll(`#_${guessingSentenceId} span`);
  let flag = true;
  Array.from(droppableWords).forEach((el) => {
    const span = el as HTMLElement;
    if (span.getAttribute('data-draggable-span') === span.textContent) {
      span.style.border = '1px solid green';
    } else {
      flag = false;
      span.style.border = '1px solid red';
    }
    setTimeout(() => {
      span.style.border = '';
    }, 5000);
  });
  return flag;
}

