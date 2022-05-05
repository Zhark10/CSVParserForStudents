import React, { FC, useContext } from "react";
import { Button } from "react-bootstrap";
import './CardFooter.css';

import { TranslatorContext } from "../../store/translator-context";

export const CardFooter: FC = () => {
  const { actions } = useContext(TranslatorContext)

  if (!actions) return <React.Fragment />

  return (
    <div className="Footer-button-groups">
      <Button variant="primary" className="Footer-button" onClick={actions.showTranslate}>Показать перевод</Button>
      <Button variant="primary" className="Footer-button" onClick={actions.nextWord}>Следующее слово</Button>
    </div>
  )
}