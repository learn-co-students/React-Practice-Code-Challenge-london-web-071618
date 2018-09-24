import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className='belt'>
        {
          props.nextFour.map(sushi => {
            return <Sushi {...sushi} emptyPlate={props.emptyPlate} emptyPlates={props.emptyPlates } />
          })
        }
        <MoreButton getNextFour={props.getNextFour} />
      </div>
    </Fragment>
  )
}

export default SushiContainer
