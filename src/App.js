import './App.css';

import React, { Component } from 'react'
import News from './Components/News';
import Navebar from './Components/Navebar';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navebar/>
        <News/>
      </div>
    )
  }
}
