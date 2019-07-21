import React from 'react'
import './item.scss';

export default function Item(props) {
  const { index, content, isChecked, isCheckedHandler, shoppingListIsBeingEdited, deleteItem } = props;

  const calculateChecked = () => {
    return isChecked ? 'checked' : 'unchecked';
  }

  const setChecked = (index) => {
    console.log(index);

    /**
     * TODO: Set state of isChecked for specific item
     * TODO: Do this by providing a click handler as props;
     * TODO: this click handler will trickle all the way down
     * TODO: from the ShoppingList component, where state actually lives!
     * 
     * TODO: see https://reactjs.org/docs/lifting-state-up.html
     */
    
    // 2) Update textDecoration - how to do this conditionally?
    // style={{textDecoration: 'line-through'}}
  
    // 3) Update isChecked on server

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
