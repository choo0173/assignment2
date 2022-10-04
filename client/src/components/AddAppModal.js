import React, { useEffect, useState } from "react";
import userService from "../service/user.service";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

function AddAppModal(props) {
  const [showapplicationAcronym, setapplicationAcronym] = useState("");
  const [showapplicationDesc, setapplicationDesc] = useState("");
  const [showapplicationRnum, setapplicationRnum] = useState("");
  const [showapplicationStart, setapplicationStart] = useState("");
  const [showapplicationEnd, setapplicationEnd] = useState("");
  const [showapplicationPOpen, setapplicationPOpen] = useState("");
  const [showapplicationPCreate, setapplicationPCreate] = useState("");
  const [showapplicationPTodo, setapplicationPTodo] = useState("");
  const [showapplicationPDoing, setapplicationPDoing] = useState("");
  const [showapplicationPDone, setapplicationPDone] = useState("");
  const [showGroupList, setGroupList] = useState([]);

  function handleCreateApp(e) {
    e.preventDefault();

    const appInfo = {
      applicationAcronym: showapplicationAcronym,
      applicationDesc: showapplicationDesc,
      applicationRnum: showapplicationRnum,
      applicationStart: showapplicationStart,
      applicationEnd: showapplicationEnd,
      applicationPOpen: showapplicationPOpen,
      applicationPCreate: showapplicationPCreate,
      applicationPTodo: showapplicationPTodo,
      applicationPDoing: showapplicationPDoing,
      applicationPDone: showapplicationPDone
    };

    userService.createApp(appInfo).then((response) => {
      notify(response);
      console.log(response);
      if (response.create === "Application Created") {
        setapplicationAcronym("");
        setapplicationDesc("");
        setapplicationRnum("");
        setapplicationStart("");
        setapplicationEnd("");
        setapplicationPOpen("");
        setapplicationPCreate("");
        setapplicationPTodo("");
        setapplicationPDoing("");
        setapplicationPDone("");

        console.log("App createddd");
      } else {
        console.log("Stop");
      }
    });
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  // API call for fetching groups
  const fetchGroups = () => {
    userService.viewGroup().then((response) => {
      setGroupList(response);
    });
  };

  const notify = (error_msg) => {
    if (error_msg.duplicate != false) {
      toast.error(error_msg.duplicate, {});
    }
    if (error_msg.create != false) {
      toast.success(error_msg.create, {});
    }
    if (error_msg.mandatory != false) {
      toast.warning(error_msg.mandatory, {});
    }
  };

  return (
    <>
      <Modal size="xl" show={props.show} cancel={props.close} centered>
        <Modal.Header closeButton={true} onClick={props.close}>
          <Modal.Title class="formboxheader">Create Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  required
                  placeholder="Application Title"
                  onChange={(e) => {
                    setapplicationAcronym(e.target.value);
                  }}
                  value={showapplicationAcronym}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>RNumber *</Form.Label>
                <Form.Control
                  required="true"
                  type="number"
                  precision={1}
                  step={1}
                  onChange={(e) => {
                    setapplicationRnum(e.target.value);
                  }}
                  value={showapplicationRnum}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Start Date *</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    setapplicationStart(e.target.value);
                  }}
                  value={showapplicationStart}
                />
              </Form.Group>{" "}
              <Form.Group as={Col}>
                <Form.Label>End Date *</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    setapplicationEnd(e.target.value);
                  }}
                  value={showapplicationEnd}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                onChange={(e) => {
                  setapplicationDesc(e.target.value);
                }}
                value={showapplicationDesc}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Permit Create *</Form.Label>
                <Form.Select
                  className="px-1"
                  // defaultValue="Choose..."
                  onChange={(e) => {
                    setapplicationPCreate(e.target.value);
                  }}
                  value={showapplicationPCreate}
                >
                  <option>Choose...</option>
                  {showGroupList.map((group) => {
                    return (
                      <option key={group.groupName} value={group.groupName}>
                        {group.groupName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Permit Open *</Form.Label>
                <Form.Select
                  className="px-1"
                  // defaultValue="Choose..."
                  onChange={(e) => {
                    setapplicationPOpen(e.target.value);
                  }}
                  value={showapplicationPOpen}
                >
                  <option>Choose...</option>
                  {showGroupList.map((group) => {
                    return (
                      <option key={group.groupName} value={group.groupName}>
                        {group.groupName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Permit To Do *</Form.Label>
                <Form.Select
                  className="px-1"
                  // defaultValue="Choose..."
                  onChange={(e) => {
                    setapplicationPTodo(e.target.value);
                  }}
                  value={showapplicationPTodo}
                >
                  <option>Choose...</option>
                  {showGroupList.map((group) => {
                    return (
                      <option key={group.groupName} value={group.groupName}>
                        {group.groupName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Permit Doing *</Form.Label>
                <Form.Select
                  className="px-1"
                  // defaultValue="Choose..."
                  onChange={(e) => {
                    setapplicationPDoing(e.target.value);
                  }}
                  value={showapplicationPDoing}
                >
                  <option>Choose...</option>
                  {showGroupList.map((group) => {
                    return (
                      <option key={group.groupName} value={group.groupName}>
                        {group.groupName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Permit Done *</Form.Label>
                <Form.Select
                  className="px-2"
                  // defaultValue="Choose..."
                  onChange={(e) => {
                    setapplicationPDone(e.target.value);
                  }}
                  value={showapplicationPDone}
                >
                  <option>Choose...</option>
                  {showGroupList.map((group) => {
                    return (
                      <option key={group.groupName} value={group.groupName}>
                        {group.groupName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
           */}
          <Button
            variant="secondary"
            onClick={
              props.close
              //  = () => {
              // setapplicationAcronym("");
              // setapplicationDesc("");
              // setapplicationRnum("");
              // setapplicationStart("");
              // setapplicationEnd("");
              // setapplicationPOpen("");
              // setapplicationPCreate("");
              // setapplicationPTodo("");
              // setapplicationPDoing("");
              // setapplicationPDone("");
              // }
            }
          >
            Back
          </Button>
          {/* <Button variant="success" onClick={handleShow}> */}
          <Button variant="success" onClick={handleCreateApp}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAppModal;
