import React, { Component } from 'react'
import SushiContainer from './containers/SushiContainer'
import Table from './containers/Table'

// Endpoint!
const API = 'http://localhost:3000/sushis'

class App extends Component {
  constructor () {
    super()
    this.state = {
      allSushis: [],
      allMinusFirstFour: [],
      nextFour: [],
      emptyPlates: [],
      runningTotal: 100
    }
    this.getNextFour.bind(this)
    this.emptyPlate.bind(this)
  }

  componentDidMount () {
    fetch(API)
      .then(resp => resp.json())
      .then(data => {
        const allMinusFirstFour = JSON.parse(JSON.stringify(data))
        const nextFour = allMinusFirstFour.splice(0, 4)
        this.setState({ allSushis: data, allMinusFirstFour, nextFour })
      })
  }

  getNextFour = () => {
    const allMinusFirstFour = this.state.allMinusFirstFour
    const nextFour = allMinusFirstFour.splice(0, 4)
    this.setState({ allMinusFirstFour, nextFour })
  }

  emptyPlate = (id) => {
    let newTotal = this.state.runningTotal - this.state.allSushis.find(sushi => sushi.id === id).price
    newTotal < 0 ? alert("You can't afford this, no more sushi for you!") : this.setState({ emptyPlates: this.state.emptyPlates.concat(id), runningTotal: newTotal })
  }

  render () {
    return (
      <div className='app'>
        <SushiContainer nextFour={this.state.nextFour} getNextFour={this.getNextFour} emptyPlate={this.emptyPlate} emptyPlates={this.state.emptyPlates} />
        <Table emptyPlates={this.state.emptyPlates} runningTotal={this.state.runningTotal} />
      </div>
    )
  }
}

export default App
