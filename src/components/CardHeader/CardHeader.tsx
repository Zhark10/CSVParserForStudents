import React, { FC, useContext, useRef } from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import CSVReader from "react-csv-reader";
import './CardHeader.css';

import { TranslatorContext } from "../../store/translator-context";

export const CardHeader: FC = () => {
  const { actions, state } = useContext(TranslatorContext)
  const importCSVRef: React.LegacyRef<HTMLInputElement> = useRef(null)

  const readCSVFile = () => {
    if (actions && (importCSVRef.current as any)) {
      (importCSVRef.current as any).click()
    }
  }

  if (!actions) return <React.Fragment />

  return (
    <div className="Header-button-groups">
      <div>
        <Button variant="primary" className="Header-button" onClick={readCSVFile}>Загрузить словарь</Button>
        <Dropdown as={ButtonGroup} onSelect={actions.selectDictionary} className="Header-button">
          <Dropdown.Toggle disabled={!state.dictionaries?.length} id="dropdown-basic">
            Выбрать словарь
        </Dropdown.Toggle>
          <Dropdown.Menu>
            {state.dictionaries?.map((dict, key) => <Dropdown.Item key={key} eventKey={dict.name}>{dict.name}</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <CSVReader inputRef={importCSVRef} inputStyle={{ display: 'none' }} onFileLoaded={actions.addDictionary} />
      <Button variant="primary" className="Header-button" onClick={actions.changeLanguage}>{state.currentLanguage}</Button>
    </div>
  )
}