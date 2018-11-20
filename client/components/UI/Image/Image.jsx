import React from 'react';
import Fastfood from '../../../assets/Images/banner-img-3.jpg';

/**
 * @description btn tip i
 * @function image
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const image = () => (
  <div className="image mt-3">
    <button type="button" className="btn btn-default">
      <span className="badge badge-light">500k</span>
      <span className="sr-only">unread messages</span>
            Views
    </button>
    <img src={Fastfood} alt="" className="card-img-top" />

  </div>
);

export default image;

