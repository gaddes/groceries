import React, { Component } from 'react';
import './shoppingList.scss';
// Axios helps us make http requests
import axios from 'axios';
import ListFilter from './ListFilter';
import ListHeader from './ListHeader';
import ListInput from './ListInput';
import ListItems from './ListItems';

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
    const itemId = this.state.items[index]._id;
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
   * Set whether an item is checked or not
   *
   * @param {integer} index - index of item to check
   */
  setChecked = (index) => {
    const itemId = this.state.items[index]._id;
    // Calculate inverse of previous state
    const newCheckedState = !this.state.items[index].isChecked;

    /**
     * 1) Copy previous state
     * 2) Modify property of specific item
     * 3) Return modified items (this sets new state)
     */
    this.setState(previousState => {
      const newItems = [ ...previousState.items ];
      newItems[index].isChecked = newCheckedState;
      return { items: newItems };
    });

    // Update item in database
    axios.put(`/items/${itemId}`, {
      isChecked: newCheckedState
    })
      .then((response) => {
        // Do stuff here if needed
      })
      .catch((error) => console.log(error));
  }

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
          clickHandler={() => this.addItem()}
        />
        <ListItems
          items={this.state.items}
          shoppingListIsBeingEdited={this.state.shoppingListIsBeingEdited}
          clickHandler={(index) => this.deleteItem(index)}
          currentSearch={this.state.currentSearch}
          isCheckedHandler={(index) => this.setChecked(index)}
        />
      </div>
    );
  }
}

export default ShoppingList;