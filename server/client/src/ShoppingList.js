import React, { Component } from 'react';
import './shoppingList.scss';
// Axios helps us make http requests
import axios from 'axios';
import Item from './Item';
import ListFilter from './ListFilter';

function ListHeader(props) {
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
  );
}

function ListInput(props) {
  return (
    <div className='flex-row'>
      <input className='item-input' type='text' placeholder='eggs, chicken, pickles...'></input>
      <button className='item-add' onClick={props.onClick}>Add</button>
    </div>
  );
}

function ListItems(props) {
  const { currentSearch, items } = props;

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
      content={item.desc}
      deleteItem={() => props.onClick(index)}
      shoppingListIsBeingEdited={props.shoppingListIsBeingEdited}
    />
  );

  return (
    <div className="list-items">
      {renderedItems}
    </div>
  );
}

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingListIsBeingEdited: false,
      editButtonText: 'Edit',
      items: [],
      currentSearch: '',
    }
  }

  fetchItemsAndUpdateState() {
    /**
     * Fetch items from backend and place them in state
     *
     * We could pass only the .desc property into state
     * But we pass everything, just in case we need to work with
     * _id or some other property further down the line
     */
    axios.get('/items')
      .then(res => {
        const items = res.data;
        this.setState({ items });
      });
  };

  componentDidMount() {
    this.fetchItemsAndUpdateState();
  }

  /**
   * This function performs a live search on the shopping list
   */
  searchItem = () => {
    // Set currentSearch in state as the value of the search input box
    const searchInput = document.querySelector('.search-input').value;
    this.setState({currentSearch: searchInput});
  };

  /**
   * This function clears the search term from state and removes text from the input box
   */
  clearSearch = () => {
    // Clear state
    this.setState({ currentSearch: '' });
    // Clear input box
    document.querySelector(`.search-input`).value = '';
  };

  /**
   * This function adds a new item to the list
   */
  addItem = () => {
    // Select value from input box
    const inputField = document.querySelector(`.item-input`);
    const inputContent = inputField.value;

    // Check not empty
    if (inputContent !== '') {
      // Trigger POST request
      axios.post('/items', {
        desc: inputContent,
        isChecked: false,
      })
        .then((response) => {
          console.log(response);
          // Fetch and display items (incl. the new one we've just posted)
          this.fetchItemsAndUpdateState();
        })
        .catch((error) => console.log(error));

      // Clear input field
      inputField.value = '';
    }
  };

  /**
   * This function deletes an item from the list
   *
   * @param {integer} index - index of item to be deleted
   */
  deleteItem = (index) => {
    const itemId = this.state.items[index]._id
    // Update state by filtering previousState so it no longer includes the item corresponding to the clicked delete button
    this.setState(previousState => ({ items: previousState.items.filter((item, key) => key !== index) }));
    // Remove from database
    axios.delete('/items', {
      // 'data' keyword is required by axios to populate the req.body
      data: {
        id: itemId
      }
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  /**
   * This function sets the state of various attributes,
   * depending on the state of the edit button
   */
  editList = () => {
    if (this.state.shoppingListIsBeingEdited === false) {
      this.setState({ shoppingListIsBeingEdited: true });
      this.setState({ editButtonText: 'Done'});
    } else {
      this.setState({ shoppingListIsBeingEdited: false });
      this.setState({ editButtonText: 'Edit'});
    }
  };

  render() {
    return (
      <div className="shopping-list">
        <br/>
        <ListFilter
          currentSearch={this.state.currentSearch}
          keyUpHandler={(e) => this.searchItem()}
          clickHandler={() => this.clearSearch()}
        />
        <ListHeader
          buttonText={this.state.editButtonText}
          buttonClickHandler={() => this.editList()}
        />
        <ListInput
          onClick={() => this.addItem()}
        />
        <ListItems
          items={this.state.items}
          shoppingListIsBeingEdited={this.state.shoppingListIsBeingEdited}
          onClick={(index) => this.deleteItem(index)}
          currentSearch={this.state.currentSearch}
        />
      </div>
    );
  }
}

export default ShoppingList;