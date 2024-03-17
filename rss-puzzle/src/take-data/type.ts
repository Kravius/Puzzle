interface Words {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

interface Rounds {
  levelData: LevelData;
  words: Words[];
}

export interface GameData {
  rounds: Rounds[];
}
