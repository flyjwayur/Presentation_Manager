import React, { Component } from "react";
import axios from "axios";
import Presentation from "../../components/Presentation/Presentation";

export default class Presentations extends Component {
  state = {
    presentations: []
  };

  componentDidMount() {
    axios.get("/presentations").then(response => {
      console.log(response.data);
      this.setState({
        presentations: this.state.presentations.concat(response.data)
      })
    }).catch(error => {
      console.log(error);
    });
  }

  renderPresentations = () => {
    let presentations = this.state.presentations;
    return presentations.map(presentation => {
      return (
        <Presentation key={presentation._id} presentation={presentation} />
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
