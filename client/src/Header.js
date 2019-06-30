import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

function Header() {
  return (
    <div className='header'>
      <Link className='title' to='/'>
        <span className='title__text'>Groceries App</span>
      </Link>
    </div>
  );
}

export default Header;