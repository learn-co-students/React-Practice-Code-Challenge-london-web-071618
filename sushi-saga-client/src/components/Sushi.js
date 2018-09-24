import React, { Fragment } from 'react'

const Sushi = (props) => {
  const eatSushi = () => {
    props.emptyPlate(props.id)
  }

  const isEaten = props.emptyPlates.includes(props.id)

  return (
    <div className='sushi' key={props.id}>
      <div className='plate'
        onClick={isEaten ? null : eatSushi}>
        {
          /* Tell me if this sushi has been eaten! */
          isEaten
            ? null
            : <img src={props.img_url} width='100%' alt={props.name} />
        }
      </div>
      <h4 className='sushi-details'>
        {props.name} - ${props.price}
      </h4>
    </div>
  )
}

export default Sushi
