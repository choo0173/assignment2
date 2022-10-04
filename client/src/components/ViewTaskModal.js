import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import userService from "../service/user.service";
import moment from "moment";
import { toast } from "react-toastify";

function ViewTaskModal(props) {
  const [showtaskName, settaskName] = useState("");
  const [showtaskDesc, settaskDesc] = useState("");
  const [showtaskNotes, settaskNotes] = useState("");
  const [showtaskPlanMVPName, settaskPlanMVPName] = useState(
    props.taskDetails.taskPlanMVPName
  );
  const [showtaskAppAcronym, settaskAppAcronym] = useState("");
  const [showtaskState, settaskState] = useState(props.taskDetails.taskState);
  const [showtaskOwner, settaskOwner] = useState("");
  let username = sessionStorage.getItem("username");
  const formatDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const [showPlanList, setPlanList] = useState([]);
  const [updateSave, setUpdateSave] = useState(false);
  const { appName } = useParams();
  const planInfo = {
    planAppAcronym: appName
  };

  const styletextObj = {
    fontSize: "12px",
    fontWeight: "400"
  };

  // Display Tasks
  useEffect(() => {
    settaskName(props.id);
    settaskDesc(props.taskDetails.taskDesc);
    settaskPlanMVPName(props.taskDetails.taskPlanMVPName);
    settaskAppAcronym(appName);
    settaskOwner(props.taskDetails.taskOwner);
  }, [updateSave]);

  async function handleUpdateTask(e) {
    e.preventDefault();

    const auditlog =
      formatDate + " " + username + " added a note: \n" + showtaskNotes;
    const passauditlog = !props.taskDetails.taskAuditNotes
      ? auditlog
      : auditlog + "\n" + props.taskDetails.taskAuditNotes;

    // const planColor = {
    //   planAppAcronym: appName,
    //   planMVPName: showtaskPlanMVPName
    // };

    // let plancolor = await userService.viewPlanColor(planColor);

    const updateTaskInfo = {
      taskId: props.taskDetails.taskId,
      taskName: showtaskName,
      taskDesc: showtaskDesc,
      taskNotes: showtaskNotes,
      taskPlanMVPName: showtaskPlanMVPName,
      taskAppAcronym: showtaskAppAcronym,
      taskAuditNotes: passauditlog,
      // taskPlanColor: "plancolor",
      taskOwner: username
    };
    // const planColor = {
    //   planAppAcronym: appName,
    //   planMVPName: showtaskPlanMVPName
    // };

    // let plancolor = await userService.viewPlanColor(planColor);
    // Update Task Notes (Audit trail)
    userService.updateTask(updateTaskInfo).then((response) => {
      notify(
        response.isUpdatePlan,
        response.isUpdateNotes,
        response.inputstatus,
        response.message
      );
      if (
        response.isUpdatePlan == "success" ||
        response.isUpdateNotes == "success"
      ) {
        console.log("task updated");
        settaskNotes("");
        setUpdateSave(true);

        // props.close();
        console.log("Hia");
      } else {
        console.log("Stop");
      }
    });
    // var textarea = document.getElementById("AuditTrailTextArea");
    // var scrollTextAreaHeight = textarea.scrollHeight + 5000;
    // textarea.scrollTop = scrollTextAreaHeight;
    // console.log(textarea);
    props.setSubmit(true);
  }

  const handleCloseModal = (e) => {
    e.preventDefault();
    settaskNotes("");
    props.close();
  };

  const notify = (isUpdatePlan, isUpdateNotes, inputstatus, message) => {
    if (isUpdatePlan === "fail" && isUpdateNotes === "fail") {
      toast.info("Task Not Updated", {});
    } else if (isUpdatePlan === "fail" && isUpdateNotes === "success") {
      toast.success("Task updated", {});
    } else if (isUpdatePlan === "success" && isUpdateNotes === "fail") {
      toast.info("Please add a note when changing plan", {});
    } else {
      toast.success("Task updated", {});
    }
  };
  return (
    <>
      <Modal size="xl" show={props.show} cancel={props.close} centered>
        <Modal.Header closeButton={true} onClick={props.close}>
          <Modal.Title class="formboxheader"> {props.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-2">
              <Form.Group as={Col} xs={9}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Task Title"
                  value={showtaskName}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Group>
                  <div>
                    <Form.Label>Plan</Form.Label>
                  </div>
                  {props.showIsPOpenRights == true ||
                  props.showIsPDoneRights == true ? (
                    <Form.Select
                      className="pt-3 px-5"
                      value={showtaskPlanMVPName}
                      onChange={(e) => {
                        settaskPlanMVPName(e.target.value);
                      }}
                    >
                      <option>Choose a plan</option>
                      {props.showPlanList.map((plan, index) => {
                        return (
                          <option
                            key={index}
                            value={plan.planMVPName}
                            // style={{ background: plan.planColor }}
                          >
                            {plan.planMVPName}
                          </option>
                        );
                      })}
                    </Form.Select>
                  ) : (
                    <Form.Control
                      className="pt-3 px-5"
                      value={props.taskDetails.taskPlanMVPName}
                      disabled
                    ></Form.Control>
                  )}
                </Form.Group>
              </Form.Group>
            </Row>
            {props.showIsPOpenRights == true ||
            props.showIsPTodoRights == true ||
            props.showIsPDoingRights == true ||
            props.showIsPDoneRights == true ||
            props.showIsPDoneRights == true ? (
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={showtaskDesc}
                  onChange={(e) => {
                    settaskDesc(e.target.value);
                  }}
                />
              </Form.Group>
            ) : props.showIsPOpenRights == false ||
              props.showIsPTodoRights == false ||
              props.showIsPDoingRights == false ||
              props.showIsPDoneRights == false ||
              props.showIsPDoneRights == false ||
              showtaskState === "close" ? (
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={showtaskDesc}
                  disabled
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} value={showtaskDesc} />
              </Form.Group>
            )}

            <Row className="mb-2">
              {showtaskState === "close" ? (
                <></>
              ) : props.showIsPOpenRights == true ||
                props.showIsPTodoRights == true ||
                props.showIsPDoingRights == true ||
                props.showIsPDoneRights == true ||
                props.showIsPDoneRights == true ? (
                <Form.Group as={Col}>
                  <Form.Label>Notes</Form.Label>

                  <Form.Control
                    // defaultValue={""}
                    as="textarea"
                    rows={6}
                    onChange={(e) => {
                      settaskNotes(e.target.value);
                    }}
                    value={showtaskNotes}
                  />
                </Form.Group>
              ) : (
                <Form.Group as={Col}>
                  <Form.Label>Notes</Form.Label>

                  <Form.Control as="textarea" rows={6} disabled />
                </Form.Group>
              )}

              <Form.Group as={Col}>
                <Form.Label>Audit Trail</Form.Label>
                <Form.Control
                  id="AuditTrailTextArea"
                  as="textarea"
                  rows={8}
                  style={styletextObj}
                  value={props.taskDetails.taskAuditNotes}
                  disabled
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Back
          </Button>
          {props.showIsPOpenRights == false ||
          props.showIsPTodoRights == false ||
          props.showIsPDoingRights == false ||
          props.showIsPDoneRights == false ||
          props.showIsPDoneRights == false ||
          showtaskState === "close" ? (
            <></>
          ) : (
            <Button variant="info" onClick={handleUpdateTask}>
              Update
            </Button>
          )}
          {/* <Button variant="info" onClick={handleUpdateTask}>
            Update
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewTaskModal;
