import { StrictMode } from 'react';
import { hydrate, render } from "react-dom";
import './theme/main.scss';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement
  );
} else {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
