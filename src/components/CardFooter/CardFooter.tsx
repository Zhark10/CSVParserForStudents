import React, { FC, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './CardFooter.css';

import { TranslatorContext } from "../../store/translator-context";
import { ELanguage } from "../../store/translator-types";

export const CardFooter: FC = () => {
  const { actions, state } = useContext(TranslatorContext)
  const { transcript, listening } = useSpeechRecognition();

  useEffect(function checkTranslateByVoice() {
    if (!state.currentLanguage || !actions || !state.currentDictionary) return
    const lang = {
      [ELanguage.RUS]: ELanguage.ENG,
      [ELanguage.ENG]: ELanguage.RUS,
    }
    const inactiveLanguage = lang[state.currentLanguage]
    if (transcript === state.currentDictionary.currentWord[inactiveLanguage]) actions.nextWord()
  }, [listening, transcript, state.currentLanguage, actions])

  const listen = () => {
    const language = state.currentLanguage === ELanguage.RUS ? "en" : "ru"
    SpeechRecognition.startListening({language})
    const resetByTime = setTimeout(SpeechRecognition.stopListening, 3000)
    return () => clearTimeout(resetByTime)
  }

  if (!actions) return <React.Fragment />

  return (
    <div className="Footer-button-groups">
      <div>
        <Button variant="primary" className="Footer-button" onClick={actions.showTranslate}>Показать перевод</Button>
        <Button variant="primary" className="Footer-button" onClick={actions.nextWord}>Следующее слово</Button>
      </div>
      <Button disabled={listening} variant="primary" className="Footer-button" onClick={listen}>{listening ? 'Говорите...' : 'Сказать перевод'}</Button>
    </div>
  )
}