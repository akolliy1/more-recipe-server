import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxs/Auxs';
import Backdrop from '../Backdrop/Backdrop';

/**
 * @description for Modal Display
 * @lends Backdrop
 * @requires showProps , and some Clicked Listeners
 * @class Modal
 */
/* eslint-disable */
class Modal extends Component {
  /**
     * @method shouldComponentUpdate
     * @param {*} nextProps
     * @param {*} nextState
     * @returns {Boolean} Boolean
     */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  /**
   * @method render
   * @returns {JSX} jsx
   * @requires showProps , and some Clicked Listeners
   */
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
