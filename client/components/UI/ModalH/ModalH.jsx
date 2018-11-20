import React from 'react';
import Modal from '../Modal/Modal';
/**
 * @description the Popup Post box in desktop
 * @function modalH
 * @param {*} props
 * @returns {JSX} jsx
 */
const modalH = props => (
  /* eslint-disable */
  <Modal show={props.show} modalClosed={props.modalClosed}>
    <div className="row mb-2">
      <div className="col">
        <h5 className="modal-title" id="exampleModalLabel">
          {props.title}
        </h5>
      </div>
      <div className="col">
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={props.modalClosed}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <hr />
    {props.children}
  </Modal>
);
export default modalH;
