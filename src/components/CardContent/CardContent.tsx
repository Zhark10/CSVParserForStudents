import React, { FC, useContext } from "react";
import './CardContent.css';

import { TranslatorContext } from "../../store/translator-context";
import { ELanguage } from "../../store/translator-types";

export const CardContent: FC = () => {
  const { state } = useContext(TranslatorContext)
  const inactiveLanguage = state.currentLanguage === ELanguage.RUS ? ELanguage.ENG : ELanguage.RUS

  return (
    <div className="App-card-content">
    {
      state.currentDictionary?.currentWord ?
        <>
          <h1>{state.currentLanguage ? state.currentDictionary.currentWord[state.currentLanguage] : ""}</h1>
          <h1>{state.currentDictionary.currentWord.secret ? state.currentDictionary.currentWord[inactiveLanguage] : "???????????"}</h1>
        </>
        : <>
          <h1>Загрузите словарь</h1>
        </>
    }
  </div>
  )
}