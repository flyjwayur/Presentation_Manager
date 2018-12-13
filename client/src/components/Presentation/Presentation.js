import React, { Component } from 'react'

class Presentation extends Component {
    
  render() {
    const {presenter, evaluator, topic, article, keywords, date} = this.props.presentation; 

    return (
      <div>      
      <p> {presenter}</p>
      <p> {evaluator}</p>
      <p> {topic}</p>
      <p> {article}</p>
      <p> {keywords}</p>
      <p> {date}</p>
      </div>
    )
  }
}

export default Presentation;
