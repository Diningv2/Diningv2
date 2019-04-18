import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { italic } from 'ansi-colors';

italic('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);

});