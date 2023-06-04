import React from 'react';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      &copy; EZEats
      <br />
      <a href="https://www.flaticon.com/free-icons/food" title="food icons">Food icons created by Smashicons - Flaticon</a>
    </footer>
  );
}

export default Footer;
