import React, { Component } from 'react';
import MainApp from './MainApp';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

export default class App extends Component {
    render() {
        return (
            <div>
                <MainApp/>
            </div>
        )
    }
}
