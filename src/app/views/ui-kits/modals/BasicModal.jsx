import React, { useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

const BasicModal = ({ name, children, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Fragment style={{ maxWidth: "800px" }}>
      <Button className="text-capitalize" onClick={() => setShow(true)}>
        {name || "Launch demo modal"}
      </Button>
      <Modal show={show} onHide={handleClose} {...props}   >
        <Modal.Header closeButton >
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default BasicModal;
