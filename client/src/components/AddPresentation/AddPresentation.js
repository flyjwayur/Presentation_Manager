import React, { Component } from "react";


export default class AddPresentation extends Component {
  render() {
    const { handleInputsChange, handleInputsSubmit, formInputs } = this.props;
    return (
      <div>
        <form onSubmit={handleInputsSubmit} method="POST">
        <label htmlFor="presenter">Presenter</label>
          <input
            type="text"
            id="presenter"
            name="presenter"
            value={formInputs.presenter}
            onChange={handleInputsChange}
            required
          />
          <label htmlFor="evaluator">Evaluator</label>
          <input
            type="text"
            id="evaluator"
            name="evaluator"
            value={formInputs.evaluator}
            onChange={handleInputsChange}
            required
          />
          <label htmlFor="topic">Topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formInputs.topic}
            onChange={handleInputsChange}
            required
          />
          <label htmlFor="article">Article</label>
          <input
            type="text"
            id="article"
            name="article"
            value={formInputs.article}
            onChange={handleInputsChange}
            required
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formInputs.date}
            onChange={handleInputsChange}
            required
          />
          <label htmlFor="keywords">Keywords</label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={formInputs.keywords}
            onChange={handleInputsChange}
            required
          />
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={formInputs.summary}
            onChange={handleInputsChange}
            required
          />
          <button>Add Presentation</button>
        </form>
      </div>
    );
  }
}
