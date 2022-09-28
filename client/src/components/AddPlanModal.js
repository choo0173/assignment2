import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { CirclePicker } from "react-color";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import userService from "../service/user.service";

function AddPlanModal(props) {
  const [showPlans, setPlans] = useState("");
  const [showplanStart, setplanStart] = useState("");
  const [showplanEnd, setplanEnd] = useState("");
  const [showplanColor, setplanColor] = useState("");
  const { appName } = useParams();
  function handleCreatePlan(e) {
    e.preventDefault();

    const planInfo = {
      planMVPName: showPlans,
      planStart: showplanStart,
      planEnd: showplanEnd,
      planAppAcronym: appName,
      planColor: showplanColor
    };

    userService.createPlan(planInfo).then((response) => {
      // notify(response.isGroup, response.bmessage);
      console.log(response);
      if (response.result == true) {
        setPlans("");
        setplanStart("");
        setplanEnd("");
        setplanColor("");
        console.log("PLANnnn createddd");
        props.setAddPlan(true);
      } else {
        console.log("Stop");
      }
    });
  }
  return (
    <>
      <Modal size="lg" show={props.show} cancel={props.close} centered>
        <Modal.Header closeButton={true} onClick={props.close}>
          <Modal.Title className="formboxheader">Create Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  Plan Name
                  <Form.Text className="text-muted m-0">
                    Max characters: 15
                  </Form.Text>
                </Form.Label>
                <Form.Control
                  maxLength={15}
                  onChange={(e) => {
                    setPlans(e.target.value);
                  }}
                  value={showPlans}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label className="mb-4">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    setplanStart(e.target.value);
                  }}
                  value={showplanStart}
                />
              </Form.Group>{" "}
              <Form.Group as={Col}>
                <Form.Label className="mb-4">End Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    setplanEnd(e.target.value);
                  }}
                  value={showplanEnd}
                />
              </Form.Group>
            </Row>
            <Row className="mb-2 justify-content-md-center">
              <Form.Group>
                <Form.Label>Color</Form.Label>
                <CirclePicker
                  onChangeComplete={(showplanColor) =>
                    setplanColor(showplanColor.hex)
                  }
                  value={showplanColor}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3"></Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
           */}
          <Button variant="secondary" onClick={props.close}>
            Back
          </Button>
          {/* <Button variant="success" onClick={handleShow}> */}
          <Button variant="success" onClick={handleCreatePlan}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPlanModal;
