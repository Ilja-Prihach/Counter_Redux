import React, {useState} from 'react';
import './App.css';
import {Counter} from "../common/components/Counter";
import {Set}  from "../common/components/Set";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {useAppSelector} from "../common/hooks/useAppSelector";

function App() {
  return (
    <div className="App">
      <Set/>
      <Counter/>
    </div>
  )
}

export default App;

