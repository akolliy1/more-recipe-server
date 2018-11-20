import React from 'react';
import classes from './Segment.css';
/**
 * @function recipe
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const Image = props => (
  <aside className="col-md-4 mb-2">
    <div className="card">
      <div className="card-body">
        <div>
          <div>
            <span className={['click fas fa-globe', classes.Color].join(' ')} />
            Intro
          </div>
          <div className="status">hard working persionate very good all the best blah blah
            <span className={['ml-2 click fas fa-pen-square', classes.Color].join(' ')} />
          </div>
          <hr />
        </div>
        <div>
          <div className={['far fa-thumbs-up', classes.Color].join(' ')} />
          <div>i like cooking ,Infact it's my hobby.
            <span className={['ml-2 click fas fa-pen-square', classes.Color].join(' ')} />
          </div>
          <hr />
        </div>
        <div>
          <button type="button" className="btn btn-primary">
              Favorites
            <span className="badge badge-light ml-1">9</span>
            <span className="sr-only">unread messages</span>
          </button>
          <hr />
        </div>
        <div>
          <button type="button" className="btn btn-primary">
              ALL RECIPES
            <span className="badge badge-light ml-1">19</span>
            <span className="sr-only">unread messages</span>
          </button>
          <hr />
        </div>
      </div>
    </div>
  </aside>
);

export default Image;
