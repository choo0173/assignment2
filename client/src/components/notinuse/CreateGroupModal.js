import React, { useEffect } from "react";
import Modal from "react-bootstrap/esm/ModalHeader";

function CreateGroupModal() {
  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title class="formboxheader">Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="container p-3  ">
            <div className="row justify-content-around">
              <Form.Group className="mb-3 col">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  className="form-control form-control-sm  forminputfield "
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3 col">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  name="status"
                  className="form-control form-control-sm  forminputfield "
                  type="text"
                  placeholder="Status"
                  autoComplete="off"
                />
              </Form.Group>
            </div>
            <div className="row justify-content-around">
              <Form.Group className="mb-3 col" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div class="input-group ">
                  <Form.Control
                    name="password"
                    className="form-control form-control-sm forminputfield "
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3 col">
                <Form.Label>Groups</Form.Label>
                <Form.Control
                  name="groups"
                  className="form-control form-control-sm  forminputfield "
                  type="text"
                  placeholder="Groups"
                  autoComplete="off"
                />
              </Form.Group>
            </div>
            <div className="row justify-content-left">
              <Form.Group className="mb-3 col">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  className="form-control form-control-sm  forminputfield "
                  type="text"
                  placeholder="Email"
                  autoComplete="off"
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
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

export default CreateGroupModal;
