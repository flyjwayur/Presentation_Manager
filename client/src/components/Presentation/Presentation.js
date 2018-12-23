import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

class Presentation extends Component {
  handleDelete = e => {
    const selectedPresentation = this.props.presentation;
    this.props.deletePresentation(
      selectedPresentation,
      selectedPresentation._id
    );
  };

  handleEdit = e => {
    console.log(this.props);
    const selectedPresentation = this.props.presentation;
    this.props.history.push(
      `/presentations/${selectedPresentation._id}/edit`
    );
  };

  render() {
    const {
      _id,
      presenter,
      evaluator,
      topic,
      article,
      keywords,
      date,
      summary
    } = this.props.presentation;

    return (
      <Fragment>
        <Link to={`/presentations/${_id}`} style={{ textDecoration: "none" }}>
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
              {moment(date).format('YYYY-MM-DD')}
            </p>
            <p>
              <span>Summary: </span>
              {summary}
            </p>
            <button> Detail </button>
          </div>
        </Link>
        <button onClick={this.handleEdit}> Edit</button>
        <button onClick={this.handleDelete}> Delete </button>
      </Fragment>
    );
  }
}

export default Presentation;
