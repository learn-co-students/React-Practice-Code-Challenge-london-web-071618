import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      allSushis: [],
      eatenSushis: [],
      sushiIndex: 0
    }
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(sushis => this.setState({allSushis: sushis}))
  }

  // fourSushi = () => {
  //   return this.state.allSushis.slice(this.state.sushiIndex, this.state.sushiIndex + 4)
  //   this.setState({
  //     sushiIndex: this.state.sushiIndex + 4
  //   })
  // }

  eatSushi = (sushi) => {
    const updatedEatenSushis = [...this.state.eatenSushis, sushi]
    this.setState({ eatenSushis: updatedEatenSushis}, () => console.log(this.state.eatenSushis))
  }

  incrementIndex = () => {
    this.state.sushiIndex < 96 ? (
      this.setState({ sushiIndex: this.state.sushiIndex + 4}, console.log(this.state.sushiIndex))
    ) : (
      this.setState({ sushiIndex: 0}, console.log(this.state.sushiIndex))
    )
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushiIndex={this.state.sushiIndex} incrementIndex={this.incrementIndex} sushis={this.state.allSushis} eatenSushi={this.state.eatenSushis} eatSushi={this.eatSushi} />
        <Table eatenSushi={this.state.eatenSushis}/>
      </div>
    );
  }
}

export default App;