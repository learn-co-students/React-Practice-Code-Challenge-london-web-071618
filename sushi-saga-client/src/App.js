import React, { Component } from 'react'
import SushiContainer from './containers/SushiContainer'
import Table from './containers/Table'

const API = 'http://localhost:3000/sushis'

class App extends Component {
  state = {
    sushis: [],
    eatenSushis: [],
    money: 100,
    currentIndex: 0
  }

  nextFourSushis = () => {
    const currentIndex = this.state.currentIndex + 4 >= this.state.sushis.length
      ? 0
      : this.state.currentIndex + 4

    this.setState({ currentIndex })
  }

  eatSushi = sushi => {
    if (this.isSushiEaten(sushi)) return 
    // if sushi has been eaten stop here
    if (this.state.money - sushi.price < 0) return 
    // if there i not enough money, stop here
    // if any of the above conditions are true then this will happen

    this.setState({
      eatenSushis: [...this.state.eatenSushis, sushi],
      money: this.state.money - sushi.price
    })
  }

  isSushiEaten = sushi => {
    return this.state.eatenSushis.includes(sushi) 
    // this will return true or false
  }

  getSushis = () => {
    fetch(API)
      .then(resp => resp.json())
      .then(sushis => this.setState({ sushis }))
  }
  componentDidMount = () => {
    this.getSushis()
  }
  render () {
    const { sushis, currentIndex, money, eatenSushis } = this.state
    return (
      <div className='app'>
        <SushiContainer
          sushis={sushis.slice(currentIndex, currentIndex + 4)}
          nextFourSushis={this.nextFourSushis}
          eatSushi={this.eatSushi}
          isSushiEaten={this.isSushiEaten}
        />

        <Table
          eatenSushis={eatenSushis}
          money={money}
        />
      </div>
    )
  }
}

export default App
