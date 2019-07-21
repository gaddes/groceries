import React from 'react'
import Item from './Item';
import './listItems.scss';

export default function ListItems(props) {
  const { 
    currentSearch,
    items,
    shoppingListIsBeingEdited,
    clickHandler,
    isCheckedHandler
  } = props;

  // Create new array containing only items that include search text
  const filteredItems = items.filter(item => {
    const itemText = item.desc;
    if (itemText.indexOf(currentSearch) === -1) {
      // eslint-disable-next-line
      return;
    }
    return itemText;
  });

  const renderedItems = filteredItems.map((item, index) =>
    <Item
      key={index}
      index={index}
      isChecked={item.isChecked}
      isCheckedHandler={() => isCheckedHandler(index)}
      content={item.desc}
      deleteItem={clickHandler}
      shoppingListIsBeingEdited={shoppingListIsBeingEdited}
    />
  );

  return (
    <div className="list-items">
      {renderedItems}
    </div>
  )
}
