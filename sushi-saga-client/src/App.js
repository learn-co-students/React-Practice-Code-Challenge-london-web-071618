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


  eatSushi = (sushi) => {
    if (this.isSushiEaten(sushi)) return
    if (sushi.price > this.state.money) return
    
    this.setState({
      eatenSushis: [...this.state.eatenSushis, sushi],
      money: this.state.money - sushi.price
    })
  }

  isSushiEaten = (sushi) => {
    return this.state.eatenSushis.includes(sushi)
  }


  nextFourSushis = () => {
    const nextIndex = this.state.currentIndex + 4 >= this.state.sushis.length ?
      0 :
      this.state.currentIndex + 4

    this.setState( {currentIndex: nextIndex })
  }

  getSushis = () => {
    fetch(API)
      .then(resp => resp.json())
      .then(sushis => this.setState({
        sushis
      }))
  }

  componentDidMount() {
    this.getSushis()
  }


  render() {
    const {sushis, currentIndex, money, eatenSushis} = this.state
    return (
      <div className="app">
        <SushiContainer
          sushis={sushis.slice(currentIndex, currentIndex + 4)}
          nextFourSushis={this.nextFourSushis}
          eatSushi={this.eatSushi}
          isSushiEaten={this.isSushiEaten}
        />
        <Table money={money}
          eatenSushis={eatenSushis}
          />
      </div>
    );
  }
}

export default App;
