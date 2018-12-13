import React, { Component } from "react";
import axios from "axios";
import Presentation from "../../components/Presentation/Presentation";
import uuid from 'uuid';

export default class Presentations extends Component {
  state = {
    presentations: []
  };

  componentDidMount() {
    axios.get("/presentations").then(response => {
      console.log(response.data);
      this.setState({
        presentations: [...this.state.presentations, (response.data)]
      })
    }).catch(error => {
      console.log(error);
    });
  }

  renderPresentations = () => {
    let presentations = this.state.presentations;
    console.log("Are presentaions is coming from data", presentations);
    return presentations.map(presentation => {
      return (
        <Presentation key={uuid.v4()} presentation={presentation} />
      );
    });
  };

  render() {
    return (
      <div>
        <p>{this.state.presentations.length}</p>
        {this.renderPresentations()}
      </div>
    );
  }
}
