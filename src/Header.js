import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

function Header() {
  return (
    <div className='header'>
      <Link className='logo' to='/home'>
        <span className='logo__text -title'>Groceries App</span>
      </Link>
    </div>
  );
}

export default Header;