export class ClickMoveDraggableSpan {
  constructor() {
    this.moveToFirstFreeSpaceInGuessingSentences();
  }
  moveToFirstFreeSpaceInGuessingSentences() {
    const guessingSentencesToMove = document.querySelector('.guessing_container');

    const sentencesId = guessingSentencesToMove?.getAttribute('data-draggable-id');

    console.log(typeof sentencesId);
    const guessingSentences = document.querySelectorAll(`#_${sentencesId} span`);

    guessingSentencesToMove?.addEventListener('click', function (this: HTMLElement, ev) {
      const targetElement = ev.target as HTMLElement;
      if (targetElement) {
        for (let i = 0; i < guessingSentences.length; i++) {
          const el = guessingSentences[i];
          if (el.textContent === '') {
          el.textContent = targetElement.textContent;
          break;
          }
        }
      }
    });
    console.log(guessingSentencesToMove);
    console.log(guessingSentences);
  }
}
