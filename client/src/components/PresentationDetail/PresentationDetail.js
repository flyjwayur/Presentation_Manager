import React, { Component, Fragment } from "react";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";

class PresentationDetail extends Component {
  state = {
    singlePresentation: null,
    isLoading: false,
    error: false,
    hasError: false
  };

  componentDidMount() {
    this.loadSinglePresentation(this.props.match);
  }

  loadSinglePresentation = match => {
    this.setState({ isLoading: true }, () => {
      axios
        .get("/presentations/" + match.params.presentationId)
        .then(response => {
          console.log(response.data);
          this.setState({
            isLoading: false,
            singlePresentation: response.data
          });
        })
        .catch(error => {
          this.setState({
            error: error.response
          });
        });
    });
  };

  render() {
    const { error, isLoading, singlePresentation } = this.state;

    const displayDetail = () => {
      if (singlePresentation) {
        const {
          presenter,
          evaluator,
          topic,
          article,
          keywords,
          date,
          summary
        } = singlePresentation;
        return (<div>
          <p>
            <span>Presenter: </span>
            {presenter}
          </p>
          <p>
            <span>Evaluator: </span>
            {evaluator}
          </p>
          <p>
            <span>Topic: </span>
            {topic}
          </p>
          <p>
            <span>Article: </span>
            {article}
          </p>
          <p>
            <span>Keywords: </span>
            {keywords}
          </p>
          <p>
            <span>Date: </span>
            {date}
          </p>
          <p>
            <span>Summary: </span>
            {summary}
          </p>
          <button> Detail </button>
        </div>)
      }else{ return null}
    };

    console.log("from detail", singlePresentation);
    return (
      <Fragment>
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <Spinner />}
        {displayDetail()}
      </Fragment>
    );
  }
}

export default PresentationDetail;
