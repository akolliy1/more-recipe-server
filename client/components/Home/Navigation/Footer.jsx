import React from 'react';
import classes from './Header.css';
/**
 * @description search footer
 * @function searchFooter
 * @returns {JSX} jsx
 */
const searchFooter = () => (
  <footer>
    <div className="container-fluid mt-3">
      <div className="text-center">
        <strong className={['copyright',
        classes.Color].join(' ')}
        >
          More-recipe-server © 2018, All Rights Reserved,
          Design &amp; Developed By: ADESANMI AKOLADE DOTUN
        </strong>
      </div>
      <div className="text-center">
        <a href="/" className="pr-2">Terms</a>
        <a href="/" className="pr-2">Privacy</a>
        <a href="/" className="pr-2">Security</a>
        <a href="/" className="pr-2">Contact Akolliy</a>
      </div>
    </div>
  </footer>
);

export default searchFooter;
