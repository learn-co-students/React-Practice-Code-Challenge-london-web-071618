import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

state = {
  sushis: [],
  eatenSushis: [],
  money: 100,
  currentIndex: 0
}


getSushis = () => {
  fetch(API)
    .then(resp => resp.json())
    .then(sushis => this.setState({ sushis: sushis}) )
    // .then(data => this.setState({ sushis: data.sushis}) )
}

componentDidMount = () => {
  this.getSushis()
}

nextFourSushis = () => {
  const nextIndex = this.state.currentIndex + 4 >= this.state.sushis.length ?
    0 : this.state.currentIndex + 4
  this.setState({ currentIndex: nextIndex })
}

eatSushi = sushi => {
  if (this.isSushiEaten(sushi)) return
  // if (this.state.money - sushi.price <  0) return
  if (sushi.price > this.state.money) return
  this.setState({
    eatenSushis: [...this.state.eatenSushis, sushi],
    money: this.state.money -sushi.price
  })
}

isSushiEaten = sushi => {
  //this will return a boolean
  return this.state.eatenSushis.includes(sushi)
}

  render() {
    return (
      <div className="app">
        <SushiContainer  sushis={this.state.sushis.slice(this.state.currentIndex, this.state.currentIndex + 4)}
        nextFourSushis= {this.nextFourSushis}
        eatSushi={this.eatSushi}
        isSushiEaten={this.isSushiEaten}/>
        <Table money={this.state.money} eatenSushis={this.state.eatenSushis}/>
      </div>
    );
  }
}

export default App;
