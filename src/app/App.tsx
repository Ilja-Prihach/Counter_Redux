import React from 'react';
import './App.css';
import {Counter} from "../common/components/Counter";
import {Set} from "../common/components/Set";
import {Watch} from "../common/components/watch/Watch";

function App() {
    return (
        <div className="App">
            <Watch/>
            <Set/>
            <Counter/>
        </div>
    )
}

export default App;

