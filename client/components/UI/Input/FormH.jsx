import React from 'react';
import Aux from '../../../hoc/Auxs/Auxs';
import classes from './FormH.css';
import bgImage from '../../../assets/Images/sitttin-img-1.jpg';

/**
 * @description Header form
 *
 * @function HeaderForm
 *
 * @param {*} props
 *
 * @returns {JSX} jsx
 */
const HeaderForm = props => (
  /* eslint-disable */
  <Aux>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/css/uikit.min.css" />
    {/* <img src={bgImage} alt="background" className={classes.bgImage} /> */}
    <div className={['container', classes.Justify, 'mt-4'].join(' ')}>
      <div className={classes.JustifyContentCenter}>
        <div className="card mt-2">
          <div className="field card-body">
            <h2>More-recipe-server</h2>
            <hr />
            <form>
              {/* eslint-disable */}
              <div className="error-message">
                {props.resMsg}
              </div>

              {props.children}
              {/* eslint-enable */}
            </form>
          </div>
        </div>
        <div className="card mt-2">
          <div className="field card-body">
            {/* eslint-disable */}
            <p>{props.footerStatus}? <a href={props.footerLink}> {props.footerAction}.</a></p>
          </div>
        </div>
      </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/js/uikit.min.js" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.42/js/uikit-icons.min.js" />
  </Aux>
);

export default HeaderForm;

