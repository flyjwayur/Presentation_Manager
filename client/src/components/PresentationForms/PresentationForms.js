import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PresentaionForms extends Component {
  state = {
    presenter: (this.props.singlePresentation) ?  this.props.singlePresentation.presenter : "",
    evaluator: (this.props.singlePresentation)?  this.props.singlePresentation.evaluator : "",
    topic: (this.props.singlePresentation)? this.props.singlePresentation.topic : "",
    article: (this.props.singlePresentation)? this.props.singlePresentation.article :  "",
    date: (this.props.singlePresentation) ? this.props.singlePresentation.date : "",
    keywords: (this.props.singlePresentation) ? this.props.singlePresentation.keywords : "",
    summary: (this.props.singlePresentation)? this.props.singlePresentation.summary : ""
  };

  handleInputsChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleInputsSubmit = e => {
    e.preventDefault();

    const newPresentation = this.state;
    this.props.postNewPresentation(newPresentation)
    this.props.history.push("/presentations");
  };


  handleUpdate = (e, id) => {
    e.preventDefault();

    const edittedPresentation = this.state;
    this.props.editPresentation(edittedPresentation, id);
    this.props.history.push(`/presentations/${id}`);    
  };

  render() {
    const {
      singlePresentation,
      formType
    } = this.props;

    let keysOnSinglePresentation = null;
    //If it is edit type, give edit fields
    if (formType === 'editForm') {
      //Get the all keys except _id and _V to create edit field with existing value
      keysOnSinglePresentation = Object.keys(singlePresentation).slice(
        1,
        Object.keys(singlePresentation).length - 1
      );

      return (
        <Edit
          keysOnSinglePresentation={keysOnSinglePresentation}
          singlePresentation={singlePresentation}
          handleInputsChange={this.handleInputsChange}
          handleUpdate={this.handleUpdate}
          allInputs={this.state}
        />
      );
    }

    //If it's add type, it works as a form for adding presentation (reusable code)
    return (
      <div>
        <form onSubmit={this.handleInputsSubmit} method="POST">
          {Object.keys(this.state).map((inputKey, index) => {
            if(inputKey === 'date'){
              return (
                <div key={`${inputKey + index}`}>
                  <label htmlFor={`${inputKey}`}>{inputKey}</label>
                  <input
                    type="date"
                    id={`${inputKey}`}
                    name={`${inputKey}`}
                    value={`${this.state[inputKey]}`}
                    onChange={this.handleInputsChange}
                    required
                  />
                </div>
              );
            }
            return (
              <div key={`${inputKey + index}`}>
                <label htmlFor={`${inputKey}`}>{inputKey}</label>
                <input
                  type="text"
                  id={`${inputKey}`}
                  name={`${inputKey}`}
                  value={`${this.state[inputKey]}`}
                  onChange={this.handleInputsChange}
                  required
                />
              </div>
            );
          })}
          <button type="submit">Add Presentation</button>
        </form>
      </div>
    );
  }
}

const Edit = props => {
  const {
    keysOnSinglePresentation,
    singlePresentation,
    handleUpdate,
    handleInputsChange
  } = props;
  return (
    <form onSubmit={e => handleUpdate(e, singlePresentation._id)} method="PUT">
      {keysOnSinglePresentation.map((inputKey, index) => {
        if(inputKey === 'date'){
          return (
            <div key={`${inputKey + index}`}>
              <label htmlFor={`${inputKey}`}>{inputKey}</label>
              <input
                type="date"
                id={`${inputKey}`}
                name={`${inputKey}`}
                defaultValue={`${singlePresentation[inputKey]}`}
                onChange={handleInputsChange}
                required
              />
            </div>
          );
        }
        return (
          <div key={`${inputKey + index}`}>
            <label htmlFor={`${inputKey}`}>{inputKey}</label>
            <input
              type="text"
              id={`${inputKey}`}
              name={`${inputKey}`}
              defaultValue={`${singlePresentation[inputKey]}`}
              onChange={handleInputsChange}
              required
            />
          </div>
        );
      })}
      <button type="submit">Update</button>
    </form>
  );
};

PresentaionForms.propTypes = {
  editable: PropTypes.bool
};
