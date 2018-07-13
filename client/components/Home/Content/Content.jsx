import React from 'react';
import udemyImg from '../../../assets/Images/udemy-img.jpg';
import classes from './Content.css';
/**
 * @description Search Content
 * @function SearchContent
 * @returns {JSX} jsx
 */
const SearchContent = () => (
  <div className="container-fluid">
    <section title="Favorites">
      <div className={[classes.SearchContent, 'pb-3 mt-3'].join(' ')}>
        <h2>Some Favorites</h2>
        <hr />
      </div>
      <div className="row space-top">
        <div className="col-lg-2 col-md-3 col-sm-4 pb-4 pr-0">
          <div className="card">
            <img src={udemyImg} alt="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">spring roll</h5>
              <p className="card-text">Lorem ipsum dolor sit amet</p>
              <a href="/" className="btn btn-primary">read more</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default SearchContent;

