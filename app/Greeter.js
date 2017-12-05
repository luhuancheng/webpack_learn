// Greeter.js
import React from 'react';
import config from './config.json';

import './main.css';
import styles from './Greeter.css';


export default class Greeter extends React.Component{
    render(){
        return (
            <div className={styles.root}>
                {config.greetText}
            </div>
        );
    }
}