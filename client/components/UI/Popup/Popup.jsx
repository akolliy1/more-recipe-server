import React, { Component } from 'react';
import Aux from '../../../hoc/Auxs/Auxs';
import Modal from '../Modal/Modal';
import Post from '../Post/Post';
/**
 * @description the Popup Post box in desktop
 * @class Popup
 * @param {*} props
 * @returns {JSX} jsx
 */
class Popup extends Component {
    state = {
      show: true,
    }
    onOpenCloseModalHandler = () => {
      this.setState(prevState => ({ show: !prevState.show }));
    }
  /**
     * @description render
     * @returns {JSX} jsx
     */
    render() {
      return (
        <Aux>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
            integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.12/css/all.css"
            integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9"
            crossOrigin="anonymous"
          />
          <Modal show={this.state.show} modalClosed={this.onOpenCloseModalHandler}>
            <div className="row">
              <div className="col">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                >
              Post Recipe
                </h5>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onOpenCloseModalHandler}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <Post closed={this.onOpenCloseModalHandler} />
          </Modal>
        </Aux>
      );
    }
}

export default Popup;
