import React, { useContext } from 'react';
import './App.css';

import { TranslatorContext } from './store/translator-context';
import { CardHeader } from './components/CardHeader/CardHeader';
import { CardFooter } from './components/CardFooter/CardFooter';
import { CardContent } from './components/CardContent/CardContent';

function App() {
  const { state } = useContext(TranslatorContext)

  const currentDictionaryLabel = state.currentDictionary ? `${state.currentDictionary.name} (количество слов: ${state.currentDictionary.words.length})` : "не выбран"

  return (
    <div className="App">
      <h6>Текущий словарь: {currentDictionaryLabel}</h6>
      <div className="App-card">
        <CardHeader />
        <CardContent />
        <CardFooter />
      </div>
    </div>
  );
}

export default App;
