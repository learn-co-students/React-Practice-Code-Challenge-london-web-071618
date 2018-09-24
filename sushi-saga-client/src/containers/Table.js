import React, { Fragment } from 'react'

const Table = (props) => {

  const renderPlates = (array) => {
    return array.map((x, index) => {
      return <div className="empty-plate" style={{ top: -7 * index }}/>
    })
  }

  const sushiCost = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return props.eatenSushi.map(s => s.price).reduce(reducer, 0)
  }

  return (
    <Fragment>
      <h1 className="remaining">
        You have: ${10000 - sushiCost()} remaining!
      </h1>
      <div className="table">
        <div className="stack">
          {
            renderPlates(props.eatenSushi)
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Table