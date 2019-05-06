import React, {Component} from 'react';
import './home.scss';

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingListIsBeingEdited: false,
      // NOTE: this list is for testing only - items will be added by using the 'add' function in production
      items: [
        'item 1',
        'item 2',
        'item 3'
      ]
    }
  }

  componentDidMount() {
    console.group('componentDidMount');
      console.log(this.state);
    console.groupEnd('componentDidMount');
  }

  componentDidUpdate() {
    console.group('componentDidUpdate');
      console.log(this.state);
    console.groupEnd('componentDidUpdate');
  }

  deleteItem = () => {
    this.setState({ shoppingListIsBeingEdited: true });
    console.log('item deleted!');
  }

  addItem = () => {
    // Select input box
    const inputField = document.querySelector(`.item-input`);
    const inputContent = inputField.value;
    // Check not empty
    if (inputContent !== '') {
      // Create new array by concatenating existing state with new item
      const newItems = this.state.items.concat([inputContent]);
      this.setState({ items: newItems });
      // Clear input field
      inputField.value = '';
    }
  }

  render() {
    // Loop through items in state, add each one to array as <li>
    const items = this.state.items.map((item, index) =>
      <li key={`item-${index + 1}`}>{item}</li>
    );

    return (
      <div className="shopping-list">
        <div className='flex-row'>
          <h2>Shopping list</h2>
          <button className='item-edit'>Edit</button>
        </div>
        <ul className="list-items">
          {items}
        </ul>
        {/* <button className='item-delete' onClick={() => this.deleteItem()}>Delete</button> */}
        <div className='flex-row'>
          <input className='item-input' type='text' placeholder='eggs, chicken, pickles...'></input>
          <button className='item-add' onClick={() => this.addItem()}>Add</button>
        </div>
      </div>
    );
  }
}

class Home extends Component {
  /**
   * TODO: create event listeners to add functionality to buttons on click
   */

  /**
   * TODO: Write function that will be called on 'ADD' button click:
   *  1) Capture text in input box
   *  2) Create new <li> element
   *  3) Text of <li> element should match text content in input box
   *  4) Append new element to DOM at bottom of current <ul>
   *  5) Remove text in input element
   */

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     shoppingListIsBeingEdited: false,
  //     numberOfItems: 0
  //   }
  // }

  render() {
    return (
      <div className='home'>
        <div>
          <h2>Add new item</h2>
          <p>input box to be added back in here...</p>
          {/* <div className='flex-row'>
            <input className='item-input' type='text' placeholder='eggs, chicken, pickles...'></input>
            <button className='item-add'>Add</button>
          </div> */}
        </div>
        <ShoppingList />
      </div>
    );
  }
}

export default Home;