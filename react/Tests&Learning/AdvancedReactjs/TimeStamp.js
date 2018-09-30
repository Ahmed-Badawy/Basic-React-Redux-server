
import React, { Component } from 'react'

export default class TimeStamp extends Component {
  componentWillUpdate = (nextProps, nextState) => {
    console.log(`... ${this.constructor.name} Component is updating... `);
  }  
  render() {
    return (
      <div>
        {this.props.state.timestamp.toString()}
      </div>
    )
  }
}


