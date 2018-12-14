import React, { Component } from "react";
import axios from "axios";
import Presentation from "../../components/Presentation/Presentation";
import Spinner from "../../components/UI/Spinner/Spinner";

export default class Presentations extends Component {
  state = {
    presentations: [],
    isLoading: false,
    error: false
  };

  componentDidMount() {
    this.loadpresentations();
  }

  loadpresentations = () => {
    this.setState({ isLoading: true }, () => {
      axios
        .get("/presentations")
        .then(response => {
          this.setState({
            isLoading: false,
            presentations: this.state.presentations.concat(response.data)
          });
        })
        .catch(error => {
          this.setState({
            error: error.response
          });
        });
    });
  };

  renderPresentations = () => {
    let presentations = this.state.presentations;
    return presentations.map(presentation => {
      return (
        <Presentation key={presentation._id} presentation={presentation} />
      );
    });
  };

  render() {
    const { isLoading, error, presentations } = this.state;

    return (
      <div>
        <p>{this.state.presentations.length}</p>
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <Spinner />}
        {presentations.length > 0 && this.renderPresentations()}
      </div>
    );
  }
}
