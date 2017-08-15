import React, { Component } from "react";
import {Modal} from  "react-bootstrap";
import styles from "./Books.css";

class CustomModal extends Component {

    render() {
        return (
<div className="static-modal">
    <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>{this.props.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body className={styles.dialogBody}>
      {this.props.body}
    </Modal.Body>

    <Modal.Footer>
            {this.props.footer}
    </Modal.Footer>

  </Modal.Dialog>
  </div>
        )
    }
}

export default CustomModal;

