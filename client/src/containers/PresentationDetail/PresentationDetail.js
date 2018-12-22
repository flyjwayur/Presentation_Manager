import React, { Component, Fragment } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";

class PresentationDetail extends Component {
  enableEdit = e => {
    this.props.history.push(
      `/presentations/${this.props.match.params.presentationId}/edit`
    );
  };

  handleDelete = e => {
    const selectedPresentation = this.props.singlePresentation;
    this.props.deletePresentation(
      selectedPresentation,
      selectedPresentation._id
    );
    this.props.history.push("/presentations");
  };

  renderPresentationDetail = () => {
    const singlePresentation = this.props.singlePresentation;
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
          <button onClick={this.enableEdit}>Edit</button>
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      );
    } else {
      return <h1>There is no presentation.</h1>;
    }
  };

  render() {
    const { error, isLoading } = this.props;

    return (
      <Fragment>
        {error && (
          <div style={{ color: "#900" }}>
            <div>{error.title}</div>
          </div>
        )}
        {isLoading && <Spinner />}
        {this.renderPresentationDetail()}
      </Fragment>
    );
  }
}

export default PresentationDetail;
