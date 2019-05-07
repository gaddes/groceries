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

function SearchBox(props) {
  return (
    <div>
      <p style={{color: 'red'}}>still in development...</p>
      <div className='flex-row'>
        <input className='search-input' type='text' placeholder='search...'></input>
        <button onClick={props.onClick}>Clear</button>
      </div>
    </div>
  );
}

function ListItems(props) {
  let items;
  // Loop through items in state, add each one to array as <li>
  if (props.shoppingListIsBeingEdited) {
    items = props.items.map((item, index) =>
      <li key={index}>{item}<button key={index} onClick={() => props.onClick(index)}>Delete</button></li>
    );
  } else {
    items = props.items.map((item, index) =>
      <li key={index}>{item}</li>
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
      // NOTE: this list is for testing only - items will be added by using the 'add' function in production
      items: [
        'item 1',
        'item 2',
        'item 3'
      ],
      currentSearch: 'test'
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

  clearSearch = () => {
    // TODO: Clear state
    this.setState({ currentSearch: '' });
    // Clear input box
    document.querySelector(`.search-input`).value = '';
  }

  /**
   * This function adds a new item to the list
   */
  addItem = () => {
    // Select input box
    const inputField = document.querySelector(`.item-input`);
    const inputContent = inputField.value;

    // Check not empty
    if (inputContent !== '') {
      // Update state by concatenating previous state with an array containing only the new item
      this.setState(previousState => ({ items: previousState.items.concat([inputContent]) }));
      // Clear input field
      inputField.value = '';
    }
  }

  /**
   * This function deletes an item from the list
   * 
   * @param {integer} index - index of item to be deleted
   */
  deleteItem = (index) => {
    // Update state by filtering previousState so it no longer includes the item corresponding to the clicked delete button
    this.setState(previousState => ({ items: previousState.items.filter((item, key) => key !== index) }));
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
  }

  render() {
    return (
      <div className="shopping-list">
        <br/>
        <SearchBox
          currentSearch={this.state.currentSearch}
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
        />
      </div>
    );
  }
}

function Home() {
  return (
    <div className='home'>
      <ShoppingList />
    </div>
  );
}

export default Home;