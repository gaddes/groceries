import React from 'react'

export default function ListHeader(props) {
  const { buttonText, buttonClickHandler } = props;

  return (
    <div className='flex-row'>
      <h2>Shopping list</h2>
      <button
        className='item-edit'
        onClick={buttonClickHandler}
      >
        {buttonText}
      </button>
    </div>
  )
}
