import React, { Component } from "react";
import axios from "axios";
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

    const newPresentation = {
      presenter: this.state.presenter,
      evaluator: this.state.evaluator,
      topic: this.state.topic,
      article: this.state.article,
      date: this.state.date,
      keywords: this.state.keywords,
      summary: this.state.summary
    };
    //console.log("new Presentation? ", newPresentation);
    //console.log("this.state :", this.state);
    axios
      .post("/presentations", newPresentation)
      .then(response => {
        console.log("post :",response);
        /* When it was in app.js
        However we fetch data from db, so we dont need to set state,
        just need to fetch the data again after update*/ 
        // this.setState({
        //   presentations : this.state.presentations.concat(response.data)
        // })
      })
      .catch(err => console.log(err));
      //this.props.history.goBack();
      this.props.history.push("/presentations");
  };


  handleUpdate = (e, id) => {
    e.preventDefault();
    console.log("test single _id", id);
    //this.props.disableEdit();
  
    const edittedPresentation = {
      presenter: this.state.presenter,
      evaluator: this.state.evaluator,
      topic: this.state.topic,
      article: this.state.article,
      date: this.state.date,
      keywords: this.state.keywords,
      summary: this.state.summary
    };

    //console.log("editted Presentation? ", edittedPresentation);
    //console.log("this.state :", this.state);
    axios
      .put(`/presentations/${id}`, edittedPresentation)
      .then(response => {
        console.log("put :", response.data);
        /* When it was in app.js*/ 
        // this.setState({
        //   presentations: this.state.presentations.map(presentation => {
        //     if (presentation.id === id) {
        //       return response.data;
        //     } else {
        //       return presentation;
        //     }
        //   })
        // });
        this.props.history.push(`/presentations/${id}`);
      })
      .catch(err => console.log(err));
      
  };

  /*Before it was needed to have existing contents in inputs */
  // componentDidMount() {
  //   if(this.props.singlePresentation){
  //   this.props.onPresentationFormsLoad(this.props.singlePresentation);}
  // }

  render() {
    const {
      singlePresentation,
      formType
    } = this.props;
    console.log("render form", this.props);
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
    handleInputsChange,
    allInputs
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
                //defaultValue={`${singlePresentation[inputKey]}`}
                value={ `${allInputs[inputKey]}`}
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
