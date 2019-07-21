import React from 'react'

export default function ListFilter(props) {
  const { clickHandler, keyUpHandler } = props;

  return (
    <div className='flex-row space-between'>
      <input className='search-input' type='text' onKeyUp={keyUpHandler} placeholder='search...'></input>
      <button onClick={clickHandler}>Clear</button>
    </div>
  );
}
