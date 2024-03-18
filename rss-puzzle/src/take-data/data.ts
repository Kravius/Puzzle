import { GameData } from './type';
import { IdObject } from '../main-window-game/functional-game/buttons/continuous-btn';
// we see all time an object with right type in all documents;
export let data: GameData[] = [];

async function loaderDate(): Promise<void> {
  try {
    for (let i = 1; i <= 6; i++) {
      const response = await fetch(
        `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${i}.json`
      );
      if (!response.ok) {
        throw new Error('Error loader data');
      }
      const dataJson = await response.json();
      data.push(dataJson);
    }
  } catch (Error) {
    console.log(Error);
  }
}

export function checkWhatLvlNowJson() {
  let dataLvlForStart;
  const IdLvlGame = localStorage.getItem('IdObject');

  if (!IdLvlGame) {
    const IdObjectData: IdObject = {
      lvlElementIndex: 0,
      nextGuessingIndexWord: 0,
      currentRound: 0,
    };
    localStorage.setItem('IdObject', JSON.stringify(IdObjectData));
    dataLvlForStart = data[IdObjectData.lvlElementIndex].rounds[IdObjectData.currentRound];
    console.log(IdObjectData.lvlElementIndex, 'first');
    return [dataLvlForStart, IdObjectData.currentRound, IdObjectData.nextGuessingIndexWord];
  } else {
    const IdObjectData = JSON.parse(IdLvlGame);
    dataLvlForStart = data[IdObjectData.lvlElementIndex].rounds[IdObjectData.currentRound];

    console.log(IdObjectData.lvlElementIndex, 'second');
    return [dataLvlForStart, IdObjectData.currentRound, IdObjectData.nextGuessingIndexWord];
  }
}
loaderDate();
