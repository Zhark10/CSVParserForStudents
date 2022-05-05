import React, { useEffect, useState } from 'react';
import { parseCSV } from '../utils/parseCSV';
import { useDataBase } from './translator-hook';
import { ELanguage, TContext, TDictionary, TState } from './translator-types';

const InitialState = {
  dictionaries: null,
  currentLanguage: null,
  currentDictionary: null,
};

export const TranslatorContext = React.createContext<TContext>({
  state: InitialState,
});

export const TranslatorProvider: React.FC<any> = (props) => {
  const [state, setState] = useState<TState>(InitialState);

  const selectDictionary = (name: string | null) => {
    setState(currentState => {
      const currentDictionary = currentState.dictionaries?.find(dict => dict.name === name) || null
      return {...currentState, currentDictionary}
    })
  }

  const showTranslate = () => {
    setState(currentState => {
      const curDict = currentState.currentDictionary
      if (!curDict) return currentState
      return {
        ...currentState,
        currentDictionary: {
          ...curDict,
          currentWord: {
            ...curDict.currentWord,
            secret: true
          }
        }
      }
    })
  }

  const nextWord = () => {
    setState(currentState => {
      const curDict = currentState.currentDictionary
      if (!curDict) return currentState
      const currentWordIndex = curDict.words.findIndex(word => curDict.currentWord[ELanguage.RUS] === word[ELanguage.RUS])
      const isLast = curDict.words.length - 1 === currentWordIndex
      const notFound = currentWordIndex === -1
      const nextWordIndex = (notFound || isLast) ? 0 : currentWordIndex + 1
      const nextWord = curDict.words[nextWordIndex]
      return {
        ...currentState,
        currentDictionary: {
          ...curDict,
          currentWord: nextWord
        }
      }
    })
  }

  const addDictionary = (csvTable: [string, string][], fileInfo: any) => {
    const words = parseCSV(csvTable)
    const newDictionary: TDictionary = {
      name: fileInfo.name,
      words,
      currentWord: words[0]
    }
    setState(currentState => {
      return {
        ...currentState,
        dictionaries: currentState.dictionaries ? [...currentState.dictionaries, newDictionary] : [newDictionary],
        currentDictionary: newDictionary,
      }
    })
  }

  const changeLanguage = () => {
    setState(currentState => {
      const nextLang = {
        [ELanguage.RUS]: ELanguage.ENG,
        [ELanguage.ENG]: ELanguage.RUS,
      }
      if (!currentState.currentLanguage) return currentState 
      return {
        ...currentState,
        currentLanguage: nextLang[currentState.currentLanguage]
      }
    })
  }

  useDataBase(state, setState)

  const value = { state, actions: {selectDictionary, showTranslate, nextWord, addDictionary, changeLanguage} }

  return (
    <TranslatorContext.Provider value={value}>
      {props.children}
    </TranslatorContext.Provider>
  );
};
