import { json } from 'stream/consumers';
import { data } from '../../../take-data/data';

export interface IdObject {
  lvlElementIndex: number;
  nextGuessingIndexWord: number;
  currentRound: number;
}

export const continuousBTN = (idWords: number, lvlId: string) => {
  const wordsId = idWords;

  disabledSentencesAlreadyMade(idWords);

  console.log(idWords, 'idWords Contin func');
  const IdLvlGame = localStorage.getItem('IdObject') as string;
  const IdLvlGameObject = JSON.parse(IdLvlGame);

  let lvlElementIndex = data[IdLvlGameObject.lvlElementIndex].rounds.findIndex((word) => word.levelData.id === lvlId);

  let nextGuessingIndexWord = data[IdLvlGameObject.lvlElementIndex].rounds[
    IdLvlGameObject.currentRound
  ].words.findIndex(
    // let nextGuessingIndexWord = data[IdLvlGameObject.lvlElementIndex].rounds[lvlElementIndex].words.findIndex(
    (word) => word.id === wordsId
  );
  // console.log(
  //   data[IdLvlGameObject.lvlElementIndex].rounds[IdLvlGameObject.currentRound],
  //   'nextGuessingIndexWord before'
  // );

  nextGuessingIndexWord++;
  // console.log(nextGuessingIndexWord, 'nextGuessingIndexWord after');
  if (nextGuessingIndexWord >= 10) {
    IdLvlGameObject.currentRound++;
  }
  // console.log(lvlElementIndex, 'lvl');
  // console.log(nextGuessingIndexWord, 'words');
  // console.log(IdLvlGameObject.currentRound, 'round');

  IdLvlGameObject.lvlElementIndex = lvlElementIndex;
  IdLvlGameObject.nextGuessingIndexWord = nextGuessingIndexWord;
  localStorage.setItem('IdObject', JSON.stringify(IdLvlGameObject));
  // console.log(nextGuessingIndexWord, 'first localS');
  return [IdLvlGameObject.lvlElementIndex, IdLvlGameObject.currentRound, IdLvlGameObject.nextGuessingIndexWord];

  // console.log(lvlElementIndex);
  // console.log(lvlElementIndex);
};

function disabledSentencesAlreadyMade(wordsId: number) {
  const sentencesDone = document.querySelectorAll(`#_${wordsId} span`);
  sentencesDone.forEach((span) => {
    const clonedSpan = span.cloneNode(true) as HTMLElement;
    clonedSpan.style.border = '';
    clonedSpan.removeAttribute('draggable');
    span.replaceWith(clonedSpan);
  });
}

// Удаляем все дочерние элементы
export function deletedParentElement() {
  const parentElement = document.querySelector('.main') as HTMLElement;
  const childElementDeleted = document.querySelector('.guessing-field') as HTMLElement;

  parentElement.removeChild(childElementDeleted);
}
