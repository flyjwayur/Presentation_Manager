import React, { Component } from 'react'

class Presentation extends Component {
  
  
  render() {
    return (
      <div>      
      <p> {this.props.presentation.presenter}</p>
      <p> {this.props.presentation.evaluator}</p>
      <p> {this.props.presentation.topic}</p>
      <p> {this.props.presentation.article}</p>
      <p> {this.props.presentation.keywords}</p>
      <p> {this.props.presentation.date}</p>
      </div>
    )
  }
}

export default Presentation;
