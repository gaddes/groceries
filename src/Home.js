import React, {Component} from 'react';
import './home.scss';

function InputBox(props) {
  return (
    <div className='flex-row'>
      <input className='item-input' type='text' placeholder='eggs, chicken, pickles...'></input>
      <button className='item-add' onClick={props.onClick}>Add</button>
    </div>
  );
}

function ListItems(props) {
  // Loop through items in state, add each one to array as <li>
  const items = props.items.map((item, index) =>
    <li key={`item-${index + 1}`}>{item}</li>
  );

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
      // NOTE: this list is for testing only - items will be added by using the 'add' function in production
      items: [

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

  addItem = (items) => {
    // Select input box
    const inputField = document.querySelector(`.item-input`);
    const inputContent = inputField.value;
    // Check not empty
    if (inputContent !== '') {
      // Create new array by concatenating existing state with new item
      const newItems = items.concat([inputContent]);
      this.setState({ items: newItems });
      // Clear input field
      inputField.value = '';
    }
  }

  deleteItem = () => {
    this.setState({ shoppingListIsBeingEdited: true });
    console.log('item deleted!');
  }

  render() {
    return (
      <div className="shopping-list">
        <div className='flex-row'>
          <h2>Shopping list</h2>
          <button className='item-edit'>Edit</button>
        </div>
        <InputBox
          onClick={() => this.addItem(this.state.items)}
        />
        <ListItems
          items={this.state.items}
        />
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
        <ShoppingList />
      </div>
    );
  }
}

export default Home;