/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* This tells the application to load into the html object with an id of "root"
NOTE: There normally isn't a reason to change this file
*/

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './scss/index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
