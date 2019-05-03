import React, { Component } from 'react';
import './home.scss';

class Home extends Component {
  render() {

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

    return (
      <div className='home'>
        <div>
          <h2>Add new item</h2>
          <div className='flex-row'>
            <input className='item-input' type='text' placeholder='eggs, chicken, pickles...'></input>
            <button className='item-add'>Add</button>
          </div>
        </div>
          
        <div className='shopping-list'>
          <div className='flex-row'>
            <h2>Shopping list</h2>
            <button className='item-edit'>Edit</button>
          </div>
          <ul className='items'>
            <li className='item'>
              <span>Item 1</span>
              <button className='item-delete'>Delete</button>
            </li>
            <li className='item'>
              <span>Item 2</span>
              <button className='item-delete'>Delete</button>
            </li>
            <li className='item'>
              <span>Item 3</span>
              <button className='item-delete'>Delete</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
