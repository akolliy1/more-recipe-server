import React from 'react';
import classes from './CardBtn.css';

/**
 * @description btn tip i
 * @function image
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const cardBtn = () => (
  <div className="card-footer">
    <div className={classes.CardBtn}>
      <a
        href="/recipe"
        className={['card-footer-item', classes.CardBtnCol1].join(' ')}
      >
        <span className={['far fa-thumbs-down pl-2',
        classes.CardBtnTurnIcon].join(' ')}
        /> Hit
      </a>
      <a
        href="/recipe"
        className={['card-footer-item',
      classes.CardBtnCol2].join(' ')}
      >
        <span
          className={['far fa-comment-alt pl-2',
          classes.CardBtnFlipIcon].join(' ')}
        /> Comment
      </a>
      <a
        href="/recipe"
        className={['card-footer-item',
      classes.CardBtnCol3].join(' ')}
      >
        <span className={['far fa-hand-rock pl-2',
        classes.CardBtnTurnIcon].join(' ')}
        />Knock
      </a>
    </div>
  </div>
);

export default cardBtn;

