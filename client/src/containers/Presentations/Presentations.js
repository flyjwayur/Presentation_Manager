import React, { Component } from "react";
import axios from "axios";
import Presentation from "../../components/Presentation/Presentation";
import Spinner from "../../components/UI/Spinner/Spinner";
import uuid from 'uuid';

export default class Presentations extends Component {
  state = {
    presentations: [],
    isLoading: false,
    error: false
  };

  componentDidMount() {
    this.loadpresentations();
    console.log("isLoaing from mount",this.state.isLoading);
  }

  loadpresentations = () => {
    this.setState({ isLoading: true }, () => {
    axios
      .get("/presentations")
      .then(response => {
        console.log(response.data);
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
    console.log("Are presentaions is coming from data", presentations);
    return presentations.map(presentation => {
      console.log('is there presentation?' , presentation);
      return (
        <Presentation key={presentation._id} presentation={presentation} />
      );
    });
  };

  componentDidUpdate(){
    console.log('isLoading after udpate', this.state.isLoading);
  }

  render() {
    const { isLoading, error, presentations} = this.state;

    return (
      <div>
        <p>{this.state.presentations.length}</p>
        {error && <div style={{ color: "#900" }}>{error}</div>}
        { isLoading && <Spinner/>}
        { (presentations.length > 0) && this.renderPresentations()}
      </div>
    );
  }
}
