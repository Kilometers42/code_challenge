import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

function prettyPrintArray(array) {
  return array.join(', ');
}

export default class ConsecutiveRuns extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputNumber: 0,
      integerArray: [],
      indicesArray: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.addNumber = this.addNumber.bind(this)
    this.searchConsecutiveNumbers = this.searchConsecutiveNumbers.bind(this)
    this.reset = this.reset.bind(this)
  }

  handleChange(event) {
    this.setState({
      inputNumber: event.target.value
    })
  }

  addNumber() {
    this.setState((prevState) => {
      return {
        integerArray: prevState.integerArray.concat([parseInt(prevState.inputNumber)]),
        inputNumber: 0,
      }
    })
  }

  searchConsecutiveNumbers() {
    console.log(this.state)
    let inConsecutive = false
    const tempIndicesArray = [];
    for (let i = 0; i < this.state.integerArray.length - 1; i++) {
      const element = this.state.integerArray[i];
      const nextElement = this.state.integerArray[i + 1];
      const offByOne = (element + 1 === nextElement || element - 1 === nextElement);
      if (offByOne && !inConsecutive) {
        tempIndicesArray.push(i)
        inConsecutive = true
      } else if (!offByOne) {
        inConsecutive = false;
      }
    }
    this.setState({
      indicesArray: tempIndicesArray,
    })
  }

  reset() {
    this.setState({
      integerArray: [],
      inputNumber: 0,
      indicesArray: []
    })
  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Find Consecutive Runs"
        />
        <CardText >
          <input type="number" value={this.state.inputNumber} onChange={this.handleChange} />
          <br />
          Integer Array: {prettyPrintArray(this.state.integerArray)}
          <br />
          Indices Array: {this.state.indicesArray.length !== 0 ? prettyPrintArray(this.state.indicesArray) : 'No Runs Found'}
        </CardText>

        <CardActions>
          <FlatButton label="Add Number" onClick={this.addNumber} />
          <FlatButton label="Search Indices" onClick={this.searchConsecutiveNumbers} />
          <FlatButton label="Reset" onClick={this.reset} />
        </CardActions>
      </Card>
    )
  }
}
