import React from 'react';
import classes from './RFooter.css';

/**
 * @function rightChild
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const RFooter = props => (
    /* eslint-enable */
  <div className="card mt-5">
    <div className="card-body">
      <footer>
        <div className="container-fluid">
          <div className="text-center">
            <strong className={['copyright', classes.Color].join(' ')}>More-recipe-server &copy; 2018, All Rights Reserved, Design &amp; Developed By: ADESANMI AKOLADE DOTUN</strong>
          </div>
          <div className="text-center mt-2">
            <a href="/" className="pr-2">Terms</a>
            <a href="/" className="pr-2">Privacy</a>
            <a href="/" className="pr-2">Security</a>
            <a href="/" className="pr-2">Contact Akolliy</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
);

export default RFooter;
