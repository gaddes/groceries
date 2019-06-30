import React, {Component} from 'react';
import './shoppingList.scss';
// Axios helps us make http requests
import axios from 'axios';

function InputBox(props) {
  return (
    <div className='flex-row'>
      <input className='item-input' type='text' placeholder='eggs, chicken, pickles...'></input>
      <button className='item-add' onClick={props.onClick}>Add</button>
    </div>
  );
}

function SearchBox(props) {
  return (
    <div>
      <div className='flex-row'>
        <input className='search-input' type='text' onKeyUp={props.onKeyUp} placeholder='search...'></input>
        <button onClick={props.onClick}>Clear</button>
      </div>
    </div>
  );
}

function ListItems(props) {
  const currentSearch = props.currentSearch;
  let items;

  // Create new array containing only items that include search text
  const filteredItems = props.items.filter(item => {
    const itemText = item.desc;
    if (itemText.indexOf(currentSearch) === -1) {
      // eslint-disable-next-line
      return;
    }
    return itemText;
  });

  // Loop through filtered items, add each one to array as <li>
  if (props.shoppingListIsBeingEdited) {
    items = filteredItems.map((item, index) =>
      <li key={index}>{item.desc}<button key={index} onClick={() => props.onClick(index)}>Delete</button></li>
    );
  } else {
    items = filteredItems.map((item, index) =>
      <li key={index}>{item.desc}</li>
    );
  }

  return (
    <ul className="list-items">
      {items}
    </ul>
  );
}

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingListIsBeingEdited: false,
      editButtonText: 'Edit',
      // NOTE: items currently defined in backend items.js, but these will be migrated to MongoDB
      items: [],
      currentSearch: ''
    }
  }

  componentDidMount() {
    // Grab items from backend and place them in state
    fetch('/items')
      .then(res => res.json())
      /**
       * We could pass only the .desc property into state
       * But we pass everything, just in case we need to work with
       * _id or some other property further down the line
       */
      .then(items => this.setState({ items }));
  }

  componentDidUpdate() {
    console.group('componentDidUpdate');
    console.log(this.state);
    console.groupEnd('componentDidUpdate');
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
    /**
     * TODO: rewrite this so the input text is passed directly as a param
     *       ...it's really stupid to use a query selector unnecessarily
     */
      // Select input box
    const inputField = document.querySelector(`.item-input`);
    const inputContent = inputField.value;

    // Check not empty
    if (inputContent !== '') {
      // Update state by concatenating previous state with an array containing only the new item
      this.setState(previousState => ({ items: previousState.items.concat([{ desc: inputContent }]) }));
      // Trigger POST request
      axios.post('http://localhost:3001/', {
        desc: inputContent
      })
        .then((response) => console.log(response))
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
    axios.delete('http://localhost:3001/', {
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
        <SearchBox
          currentSearch={this.state.currentSearch}
          onKeyUp={(e) => this.searchItem()}
          onClick={() => this.clearSearch()}
        />
        <div className='flex-row'>
          <h2>Shopping list</h2>
          <button
            className='item-edit'
            onClick={() => this.editList()}
          >
            {this.state.editButtonText}
          </button>
        </div>
        <InputBox
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