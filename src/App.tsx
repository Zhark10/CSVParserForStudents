import React, { useContext, useEffect } from 'react';
import { TranslatorContext } from './store/translator-context';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import './App.css';
import CSVReader from 'react-csv-reader';
import { useRef } from 'react';
import { ELanguage } from './store/translator-types';

function App() {
  const { actions, state } = useContext(TranslatorContext)
  const importCSVRef: React.LegacyRef<HTMLInputElement> = useRef(null)

  const readCSVFile = () => {
    if (actions && (importCSVRef.current as any)) {
      (importCSVRef.current as any).click()
    }
  }

  const inactiveLanguage = state.currentLanguage === ELanguage.RUS ? ELanguage.ENG : ELanguage.RUS
  const currentDictionaryLabel = state.currentDictionary ? `${state.currentDictionary.name} (количество слов: ${state.currentDictionary.words.length})` : "не выбран"

  if (!actions) return <React.Fragment />

  return (
    <div className="App">
      <h6>Текущий словарь: {currentDictionaryLabel}</h6>
      <div className="App-container">
        <div className="App-button-groups">
          <div>
            <Button variant="primary" className="App-button" onClick={readCSVFile}>Загрузить словарь</Button>
            <Dropdown as={ButtonGroup} onSelect={actions.selectDictionary} className="App-button">
              <Dropdown.Toggle disabled={!state.dictionaries?.length} id="dropdown-basic">
                Выбрать словарь
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {state.dictionaries?.map((dict, key) => <Dropdown.Item key={key} eventKey={dict.name}>{dict.name}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <CSVReader inputRef={importCSVRef} inputStyle={{ display: 'none' }} onFileLoaded={actions.addDictionary} />
          <Button variant="primary" className="App-button" onClick={actions.changeLanguage}>{state.currentLanguage}</Button>
        </div>
        <div className="App-main-content">
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
        <div className="App-button-groups">
          <Button variant="primary" className="App-button" onClick={actions.showTranslate}>Показать перевод</Button>
          <Button variant="primary" className="App-button" onClick={actions.nextWord}>Следующее слово</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
