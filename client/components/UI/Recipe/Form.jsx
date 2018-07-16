import React from 'react';
import Aux from '../../../hoc/Auxs/Auxs';

/**
 * @description the Post box
 * @function Post
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const Post = props => (
  <Aux>
    <hr />
    <form action="" method="post">
      <div className="ui form">
        <div className="field">
          <label>Recipe name</label>
          <input type="text" name="name" id="" />
        </div>
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            name="description"
            id=""
            placeholder="what's the description
            e.g Pounded Yam and,Just the way you like it "
          />
        </div>
        <div className="field">
          <label>Ingredients
            <button
              type="button"
              className="fas fa-info btn btn-default"
              data-container="field"
              data-toggle="popover"
              data-placement="top"
              data-content="Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus."
            />
          </label>
          <textarea
            rows="4"
            placeholder="what are your Recipe Ingredients?
            e,g Yam;;Vagetable;;water e.t.c"
            name="ingredients"
          />
        </div>
        <div className="field">
          <label>Procedure</label>
          <textarea
            rows="4"
            placeholder="what's your Recipe Procedure?"
            name="procedure"
          />
        </div>
        <div className="field">
          <label>Image</label>
          <input type="file" name="image" accept="image/*" />
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={props.closed}>Close</button>
        <button type="submit" className="btn btn-primary">Post</button>
      </div>
    </form>
  </Aux>
);

export default Post;
