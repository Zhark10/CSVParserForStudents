import { useEffect } from "react"
import { ELanguage, TState } from "./translator-types";

export enum DATABASE_KEYS {
  DICTIONARIES = "dictionaries",
  CURRENT_DICTIONARY = "currentDictionary",
  CURRENT_LANGUAGE = "currentLanguage",
}

// TODO: here you can send queries to the database instead of saving to localStorage in browser
export const useDataBase = ({currentDictionary, dictionaries, currentLanguage}: TState, setState: React.Dispatch<React.SetStateAction<TState>>) => {  
  const saveData = (entityKey: DATABASE_KEYS, data: any, initialData: any = null) => {
    if (data) {
      localStorage.setItem(entityKey, JSON.stringify(data));
      return
    }
    saveInStoreFromDataBase(entityKey, initialData)
  }

  const saveInStoreFromDataBase = (entityKey: DATABASE_KEYS, initialData: any) => {
    const savedData = localStorage.getItem(entityKey)
    const parsedData = savedData ? JSON.parse(savedData) : initialData
    setState(currentState => {
      return {
        ...currentState,
        [entityKey]: parsedData,
      }
    })
  }

  useEffect(function saveDictionariesInDataBase() {
    saveData(DATABASE_KEYS.DICTIONARIES, dictionaries)
  }, [dictionaries])

  useEffect(function saveCurrentDictInDataBase() {
    saveData(DATABASE_KEYS.CURRENT_DICTIONARY, currentDictionary)
  }, [currentDictionary])

  useEffect(function saveLanguageInDataBase() {
    saveData(DATABASE_KEYS.CURRENT_LANGUAGE, currentLanguage, ELanguage.RUS)
  }, [currentLanguage])
}