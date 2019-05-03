import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './home.scss';

class Home extends Component {

  /**
   * Write function that will be called on 'ADD' button click:
   *  1) Capture text in input box
   *  2) Create new <li> element
   *  3) Text of <li> element should match text content in input box
   *  4) Append new element to DOM at bottom of current <ul>
   *  5) Remove text in input element
   */

  render() {
    return (
      <div className='body home'>
        <div className='input-box'>
          <h2>Add new item</h2>
          {/* Does this form require method="POST"? */}
          <form action="/home">
            <input type="text" placeholder="eggs, chicken, pickles..."></input>
            <button className='addItem'>Add</button>
          </form>
        </div>
          
        <div className='shopping-list'>
          <h2>Shopping list</h2>
          <ul className='items'>
            <li className='item'>Item 1</li>
            <li className='item'>Item 2</li>
            <li className='item'>Item 3</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
