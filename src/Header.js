import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <Link className='logo' to='/home'>
          <span className='logo__text -title'>Groceries App</span>
        </Link>
      </div>
    );
  }
}

export default Header;