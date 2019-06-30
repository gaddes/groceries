import React from 'react';
import Header from './Header';
import ShoppingList from './ShoppingList';
import './_reset.scss';

function Home() {
  return (
    <React.Fragment>
      <Header/>
      <ShoppingList/>
    </React.Fragment>
  );
}

export default Home;
