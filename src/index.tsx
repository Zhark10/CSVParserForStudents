import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TranslatorProvider } from './store/translator-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TranslatorProvider>
      <App />
    </TranslatorProvider>
  </React.StrictMode>
);

reportWebVitals();
