import React from 'react';
import classes from './Image.css';
import userPics from '../../../assets/Images/banner-img-2.jpg';
import userPics2 from '../../../assets/Images/banner-img-3.jpg';
/**
 * @function recipe
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const Image = props => (
    /* eslint-enable */
  <div className="row">
    <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12">
      <div className="card profile-pic">
        <img src={userPics} srcSet={userPics2} alt="Pics" className={['card-images', classes.Image].join(' ')} />
        <div className="card-content">
          <div className={['media media-flex', classes.BoxSizing].join(' ')}>
            <div className="row media-left">
              <figcaption className="col-md-4 image is-48x48 m-4">
                <img src={userPics2}className={classes.SmallPic} srcSet={userPics} alt="Avatar" />
              </figcaption>
              <div className={['media-content', classes.MediaContent].join(' ')}>
                <p className="title is-4">Jenny Hess</p>
                <p className="subtitle is-6">@jennyhess</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default Image;
