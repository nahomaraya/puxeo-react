import React, { useState, Fragment, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { ModalContext } from "app/providers/ModalContext";

const BasicModal = ({ name, children, ...props }) => {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Fragment style={{ maxWidth: "800px" }}>
      <Button className="text-capitalize" onClick={() => setShowModal(true)}>
        {name || "Launch demo modal"}
      </Button>
      <Modal show={showModal} onHide={handleClose} {...props}>
        <Modal.Header closeButton  style={{ background: "#800080" }}>
          <Modal.Title style={{ color: "white" }}>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Fragment>
  );
};

export default BasicModal;
