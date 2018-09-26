import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = { 
    sushis : [],
    eatenSushis: [],
    balance: 100,
    currentIndex: 0
   }

   getSushis = () => {
     fetch(API)
     .then( resp => resp.json())
     .then( sushis => this.setState({ sushis }))
   }

   getNextFour = () => {
     this.setState( { currentIndex: this.state.currentIndex + 4})
   }

   eatSushi = sushi => {
     if (this.isSushiEaten(sushi)) return
     if (this.state.balance - sushi.price < 0 ) return

     this.setState({
        eatenSushis: [...this.state.eatenSushis, sushi],
        balance: this.state.balance - sushi.price
      })
   }

   isSushiEaten = sushi => {
    return this.state.eatenSushis.includes(sushi)
   }

   componentDidMount() {
     this.getSushis()
   }

  render() {
    const { sushis, currentIndex, balance, eatenSushis } = this.state
    return (
      <div className="app">
        <SushiContainer 
        sushis={ sushis.slice(currentIndex, currentIndex + 4) }
        nextSushis={this.getNextFour}
        eatSushi={this.eatSushi}
        isSushiEaten={this.isSushiEaten}
        />
        <Table 
        balance={balance}
        eatenSushis={eatenSushis}
        />
      </div>
    );
  }
}

export default App;