import React, { Component } from 'react';
import './App.css';
import Presentations from './containers/Presentations/Presentations';
import Addpresentation from './components/AddPresentation/Addpresentation';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Addpresentation/>
      <Presentations/>
      <h1>Hei</h1>
      </div>
    );
  }
}

export default App;
