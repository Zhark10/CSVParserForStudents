export enum ELanguage {
  RUS = "RUS",
  ENG = "ENG"
}

export type TContext = {
  state: TState,
  actions?: TActions,
}

export type TDictionary = {
  name: string;
  words: TWord[];
  currentWord: TWord;
}

export type TWord = {
  [ELanguage.RUS]: string;
  [ELanguage.ENG]: string;
  secret?: boolean;
};

export type TActions = {
  selectDictionary: (name: string | null) => void;
  showTranslate: () => void;
  nextWord: () => void;
  addDictionary: (data: [string, string][], fileInfo: any) => void;
  changeLanguage: () => void;
};

export type TState = {
  currentLanguage: ELanguage | null;
  dictionaries: TDictionary[] | null;
  currentDictionary: TDictionary | null;
};