import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

function ViewEditModal() {
  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title class="formboxheader">Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="success" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewEditModal;
