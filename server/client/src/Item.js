import React from 'react'
import './item.scss';

export default function Item(props) {
  const { index, content, isChecked, isCheckedHandler, shoppingListIsBeingEdited, deleteItem } = props;

  const calculateChecked = () => {
    return isChecked ? 'checked' : 'unchecked';
  }

  return (
    <div
      className='item flex-row'
      onClick={isCheckedHandler}
    >
      <div className={calculateChecked()}></div>
      <span>{content}</span>
      {/* Show button only when list is being edited */}
      {shoppingListIsBeingEdited &&
        <button onClick={() => deleteItem(index)}>NewDelete</button>
      }
    </div>
  )
}
