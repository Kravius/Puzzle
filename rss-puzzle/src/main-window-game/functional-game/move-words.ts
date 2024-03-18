export class ClickMoveDraggableSpan {
  guessingWordsToMove: NodeListOf<HTMLElement> | null;
  guessingSentences: NodeListOf<HTMLElement> | null;
  constructor() {
    this.guessingWordsToMove = document.querySelectorAll('.draggable-word');
    this.guessingSentences = null;
    this.moveGuessingWordToGameField();
    this.removeWordToGuessingSentences();
  }

  moveGuessingWordToGameField() {
    const guessingSentenceToMove = document.querySelector('.guessing_container');

    const sentencesId = guessingSentenceToMove?.getAttribute('data-draggable-id');

    console.log(typeof sentencesId);
    this.guessingSentences = document.querySelectorAll(`#_${sentencesId} span`);
    if (this.guessingWordsToMove) {
      this.moveWord(this.guessingWordsToMove, this.guessingSentences);
    }
  }

  moveWord(fromSentence: NodeListOf<HTMLElement>, toSentence: NodeListOf<HTMLElement>) {
    fromSentence.forEach((el) => {
      el?.addEventListener('click', function (this: HTMLElement, ev) {
        console.log(fromSentence);
        const targetElement = ev.target as HTMLElement;
        if (targetElement && toSentence) {
          for (let i = 0; i < toSentence.length; i++) {
            const el = toSentence[i];
            if (el.textContent === '') {
              el.textContent = targetElement.textContent;
              targetElement.textContent = '';
              break;
            }
          }
        }
      });
    });
  }

  removeWordToGuessingSentences() {
    if (this.guessingWordsToMove && this.guessingSentences) {
      this.moveWord(this.guessingSentences, this.guessingWordsToMove);
    }
  }
}
