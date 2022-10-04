import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import userService from "../service/user.service";
import moment from "moment";
import { toast } from "react-toastify";

function ViewAppModal(props) {
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
    props.appDetails.applicationPOpen
  );

  const [showapplicationPCreate, setapplicationPCreate] = useState(
    props.appDetails.applicationPCreate
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
      notify(response);
      if (response.update == "Application Updated") {
        console.log("app updated");
        props.setUpdateSave(true);
      } else {
        console.log("Stop");
      }
    });

    props.setUpdateSave(false);
    props.close();
  };

  const notify = (error_msg) => {
    if (error_msg.update == "Application not updated") {
      toast.error(error_msg.update, {});
    }
    if (error_msg.update == "Application Updated") {
      toast.success(error_msg.update, {});
    }
  };
  return (
    <Modal
      size="xl"
      show={props.show}
      cancel={props.close}
      centered
      key={props.key}
    >
      {props.isAdminPermit === true || props.isProjectLeadPermit === true ? (
        <Modal.Header closeButton={true} onClick={props.close}>
          <Modal.Title class="formboxheader">
            Edit {showapplicationAcronym}
          </Modal.Title>
        </Modal.Header>
      ) : (
        <Modal.Header closeButton={true} onClick={props.close}>
          <Modal.Title class="formboxheader">
            View {showapplicationAcronym}
          </Modal.Title>
        </Modal.Header>
      )}
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
                disabled={
                  props.isAdminPermit === true
                    ? false
                    : props.isProjectLeadPermit === true
                    ? false
                    : true
                }
                // disabled={props.isAdminPermit ===true || props.isProjectLeadPermit=== true }
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
                disabled={
                  props.isAdminPermit === true
                    ? false
                    : props.isProjectLeadPermit === true
                    ? false
                    : true
                }
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
              disabled={
                props.isAdminPermit === true
                  ? false
                  : props.isProjectLeadPermit === true
                  ? false
                  : true
              }
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
                defaultValue={props.appDetails.applicationPCreate}
                disabled={
                  props.isAdminPermit === true
                    ? false
                    : props.isProjectLeadPermit === true
                    ? false
                    : true
                }
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
                defaultValue={props.appDetails.applicationPOpen}
                disabled={
                  props.isAdminPermit === true
                    ? false
                    : props.isProjectLeadPermit === true
                    ? false
                    : true
                }
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
                defaultValue={props.appDetails.applicationPTodo}
                disabled={
                  props.isAdminPermit === true
                    ? false
                    : props.isProjectLeadPermit === true
                    ? false
                    : true
                }
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
                defaultValue={props.appDetails.applicationPDoing}
                disabled={
                  props.isAdminPermit === true
                    ? false
                    : props.isProjectLeadPermit === true
                    ? false
                    : true
                }
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
                onChange={(e) => {
                  setapplicationPDone(e.target.value);
                }}
                defaultValue={props.appDetails.applicationPDone}
                disabled={
                  props.isAdminPermit === true
                    ? false
                    : props.isProjectLeadPermit === true
                    ? false
                    : true
                }
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
        <Button variant="secondary" onClick={props.close}>
          Back
        </Button>
        {/* <Button variant="success" onClick={handleShow}> */}

        {props.isAdminPermit === true || props.isProjectLeadPermit === true ? (
          <Button variant="info" onClick={handleUpdateTask}>
            Save Changes
          </Button>
        ) : (
          <></>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ViewAppModal;
// handleCreateApp
