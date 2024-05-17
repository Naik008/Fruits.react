import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//表示するものの指定　⇓⇓
import Fruits from './Fruits';

//import 名前 from './Clock';

import reportWebVitals from './reportWebVitals';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Fruits />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
