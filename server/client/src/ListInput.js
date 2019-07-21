import React from 'react'

export default function ListInput(props) {
  const { clickHandler } = props;

  return (
    <div className='flex-row space-between'>
      <input className='item-input' type='text' placeholder='eggs, chicken, pickles...'></input>
      <button className='item-add' onClick={clickHandler}>Add</button>
    </div>
  )
}
