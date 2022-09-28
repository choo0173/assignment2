import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import userService from "../service/user.service";
import moment from "moment";

function ViewAppModal(props) {
  // console.log(props.setUpdateSave);
  // console.log(props.key);
  // console.log(props);
  const [showapplicationAcronym, setapplicationAcronym] = useState(props.id);
  const [showapplicationDesc, setapplicationDesc] = useState(
    props.appDetails.applicationDesc
  );
  const [showapplicationRnum, setapplicationRnum] = useState(
    props.appDetails.applicationRnum
  );
  const [showapplicationStart, setapplicationStart] = useState(
    props.appDetails.applicationStart
  );
  const [showapplicationEnd, setapplicationEnd] = useState(
    props.appDetails.applicationEnd
  );
  const [showapplicationPOpen, setapplicationPOpen] = useState(
    props.appDetails.applicationPCreate
  );
  const [showapplicationPCreate, setapplicationPCreate] = useState(
    props.appDetails.applicationPOpen
  );
  const [showapplicationPTodo, setapplicationPTodo] = useState(
    props.appDetails.applicationPTodo
  );
  const [showapplicationPDoing, setapplicationPDoing] = useState(
    props.appDetails.applicationPDoing
  );
  const [showapplicationPDone, setapplicationPDone] = useState(
    props.appDetails.applicationPDone
  );
  const [showGroupList, setGroupList] = useState([]);

  // const [updateSave, setUpdateSave] = useState(false);
  // const [updateChanges, setUpdateChanges] = useState(false);

  const styleforminputObj = {
    height: "3.8rem"
  };

  // Display Applications
  // useEffect(() => {
  //   setapplicationAcronym(props.id);
  //   setapplicationDesc(props.appDetails.applicationDesc);
  //   setapplicationRnum(props.appDetails.applicationRnum);
  //   setapplicationStart(props.appDetails.applicationStart);
  //   setapplicationEnd(props.appDetails.applicationEnd);
  // }, []);

  const formatStartDate = moment(showapplicationStart).format("YYYY-MM-DD");
  const formatEndDate = moment(showapplicationEnd).format("YYYY-MM-DD");
  // Fetch Groups
  useEffect(() => {
    fetchGroups();
  }, []);

  // API call for fetching groups
  const fetchGroups = () => {
    userService.viewGroup().then((response) => {
      setGroupList(response);
    });
  };

  // Handle Update
  const handleUpdateTask = (e) => {
    e.preventDefault();

    const updateAppInfo = {
      applicationAcronym: showapplicationAcronym,
      applicationDesc: showapplicationDesc,
      applicationStart: formatStartDate,
      applicationEnd: formatEndDate,
      applicationPCreate: showapplicationPCreate,
      applicationPOpen: showapplicationPOpen,
      applicationPTodo: showapplicationPTodo,
      applicationPDoing: showapplicationPDoing,
      applicationPDone: showapplicationPDone
    };

    // Update Task Notes (Audit trail)
    userService.updateApp(updateAppInfo).then((response) => {
      // notify(response.isGroup, response.bmessage);
      if (response.isUpdateApp == "success") {
        console.log("app updated");
        props.setUpdateSave(true);
      } else {
        console.log("Stop");
      }
    });

    props.setUpdateSave(false);
    props.close();
  };

  return (
    <Modal
      size="xl"
      show={props.show}
      cancel={props.close}
      centered
      key={props.key}
    >
      <Modal.Header closeButton={true} onClick={props.close}>
        <Modal.Title class="formboxheader">
          Edit {showapplicationAcronym}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-2">
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                style={styleforminputObj}
                placeholder="Application Title"
                value={showapplicationAcronym}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>RNumber</Form.Label>
              <Form.Control
                style={styleforminputObj}
                type="number"
                precision={1}
                step={1}
                value={showapplicationRnum}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                Start Date{" "}
                <Form.Text className="text-muted">
                  Current: {props.appDetails.applicationStart.slice(0, 10)}
                </Form.Text>
              </Form.Label>

              <Form.Control
                type="date"
                // value={showapplicationStart}
                onChange={(e) => {
                  setapplicationStart(
                    moment(e.target.value).format("YYYY-MM-DD")
                  );
                }}
              />
            </Form.Group>{" "}
            <Form.Group as={Col}>
              <Form.Label>
                End Date{" "}
                <Form.Text className="text-muted">
                  Current: {props.appDetails.applicationEnd.slice(0, 10)}
                </Form.Text>
              </Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => {
                  // setapplicationEnd(e.target.value);
                  setapplicationEnd(
                    moment(e.target.value).format("YYYY-MM-DD")
                  );
                }}
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
              <Form.Label>Permit Create</Form.Label>
              <Form.Select
                className="px-1"
                // defaultValue="Choose..."
                onChange={(e) => {
                  setapplicationPCreate(e.target.value);
                }}
                defaultValue={showapplicationPCreate}
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
              <Form.Label>Permit Open</Form.Label>
              <Form.Select
                className="px-1"
                // defaultValue="Choose..."
                onChange={(e) => {
                  setapplicationPOpen(e.target.value);
                }}
                defaultValue={showapplicationPOpen}
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
              <Form.Label>Permit To Do</Form.Label>
              <Form.Select
                className="px-1"
                // defaultValue="Choose..."
                onChange={(e) => {
                  setapplicationPTodo(e.target.value);
                }}
                defaultValue={showapplicationPTodo}
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
              <Form.Label>Permit Doing</Form.Label>
              <Form.Select
                className="px-1"
                // defaultValue="Choose..."
                onChange={(e) => {
                  setapplicationPDoing(e.target.value);
                }}
                defaultValue={showapplicationPDoing}
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
              <Form.Label>Permit Done</Form.Label>
              <Form.Select
                className="px-2"
                // defaultValue="Choose..."
                // onChange={(e) => {
                //   setapplicationPDone(e.target.value);
                // }}
                defaultValue={showapplicationPDone}
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
        <Button variant="info" onClick={handleUpdateTask}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewAppModal;
// handleCreateApp
