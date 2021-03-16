/* This tells the application to load into the html object with an id of "root"
NOTE: There normally isn't a reason to change this file
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
