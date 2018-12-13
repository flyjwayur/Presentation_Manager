import React, { Component } from "react";
import axios from 'axios';

export default class Addpresentation extends Component {
  state = {
    presenter: "",
    evaluator: "",
    topic: "",
    article: "",
    date: "",
    keywords: ""
  };

  handleChange = e => {
    console.log(e.target.type);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);

    axios
      .post("/presentations", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };
  
  componentDidUpdate(){
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} method="POST">
        <label htmlFor="presenter">Presenter</label>
          <input
            type="text"
            id="presenter"
            name="presenter"
            value={this.state.presenter}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="evaluator">Evaluator</label>
          <input
            type="text"
            id="evaluator"
            name="evaluator"
            value={this.state.evaluator}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="topic">Topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={this.state.topic}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="article">Article</label>
          <input
            type="text"
            id="article"
            name="article"
            value={this.state.article}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="keywords">Keywords</label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={this.state.keywords}
            onChange={this.handleChange}
            required
          />
          <button>Add Presentation</button>
        </form>
      </div>
    );
  }
}
