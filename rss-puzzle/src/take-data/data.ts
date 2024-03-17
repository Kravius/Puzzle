import { GameData } from './type';
// we see all time an object with right type in all documents;
export let data: GameData;

async function loaderDate(): Promise<void> {
  try {
    const response = await fetch('../../public/data/wordCollectionLevel1.json');
    if (!response.ok) {
      throw new Error('Error loader data');
    }
    data = await response.json();
  } catch (Error) {
    console.log(Error);
  }
}
loaderDate();
