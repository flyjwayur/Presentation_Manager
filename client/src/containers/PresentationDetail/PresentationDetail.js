import React, { Component, Fragment } from "react";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";

class PresentationDetail extends Component {
  state = {
    singlePresentation: null,
    isLoading: false,
    error: false,
    errorMessage: ""
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
          console.log("error from detail", error);
          this.setState({
            error: true,
            errorMessage: error.response.data
          });
        });
    });
  };

  render() {
    const { error, errorMessage, isLoading, singlePresentation } = this.state;

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
        return (
          <div>
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
          </div>
        );
      } else {
        return null;
      }
    };

    return (
      <Fragment>
        {error && (
          <div style={{ color: "#900" }}>
            <div>{errorMessage.title}</div>
          </div>
        )}
        {isLoading && <Spinner />}
        {displayDetail()}
      </Fragment>
    );
  }
}

export default PresentationDetail;
