import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  return (
    <Fragment>
      <div className="belt">
        {
          props.sushis.slice(props.sushiIndex, props.sushiIndex + 4).map(sushi => {
            return <Sushi sushi={sushi} eatSushi={props.eatSushi} eatenSushi={props.eatenSushi} />
          })
        }
        <MoreButton moreSushi={props.incrementIndex} />
      </div>
    </Fragment>
  )
}

export default SushiContainer