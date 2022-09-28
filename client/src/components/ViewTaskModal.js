import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import userService from "../service/user.service";
import moment from "moment";

function ViewTaskModal(props) {
  // console.log("props ownerrrr");
  // console.log(props);
  // console.log(props.showPlanList);
  // console.log(showtaskPlanList);

  // console.log("=======");
  const [showtaskName, settaskName] = useState("");
  const [showtaskDesc, settaskDesc] = useState("");
  const [showtaskNotes, settaskNotes] = useState("");
  const [showtaskPlanMVPName, settaskPlanMVPName] = useState("");
  const [showtaskAppAcronym, settaskAppAcronym] = useState("");
  const [showtaskState, settaskState] = useState(props.taskDetails.taskState);
  const [showtaskOwner, settaskOwner] = useState("");
  const [showtaskAuditNotes, settaskAuditNotes] = useState("");
  let username = sessionStorage.getItem("username");
  const formatDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const [showtaskPlanList, settaskPlanList] = useState([props.showPlanList]);
  const [updateSave, setUpdateSave] = useState(false);
  const { appName } = useParams();

  const styletextObj = {
    fontSize: "12px",
    fontWeight: "400"
  };

  // Display Tasks
  useEffect(() => {
    settaskName(props.id);
    settaskDesc(props.taskDetails.taskDesc);
    // settaskNotes(props.taskDetails.taskNotes);
    // settaskNotes("");
    settaskPlanMVPName(props.taskDetails.taskPlanMVPName);
    settaskAppAcronym(appName);
    settaskAuditNotes(props.taskDetails.taskAuditNotes);
    settaskOwner(props.taskDetails.taskOwner);
    // settaskPlanList(props.showPlanList);
    // setUpdateSave(false);
  }, [updateSave]);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    console.log("+++++++++++++++");
    console.log(showtaskAuditNotes);
    console.log("=========");

    const auditlog =
      formatDate + " " + username + " added a note: \n" + showtaskNotes;
    const passauditlog = !showtaskAuditNotes
      ? auditlog
      : showtaskAuditNotes + "\n" + auditlog;
    // const getAuditlog = () => {
    //   if (showtaskAppAcronym === props.task.taskAppAcronym && !showtaskNotes) {
    //     console.log("No Changes");
    //   } else if (
    //     showtaskAppAcronym !== props.task.taskAppAcronym &&
    //     !showtaskNotes
    //   ) {
    //     const auditlog =
    //       formatDate +
    //       " " +
    //       username +
    //       " changed plan to: \n" +
    //       showtaskAppAcronym;
    //     const passauditlog = !showtaskAuditNotes
    //       ? auditlog
    //       : showtaskAuditNotes + "\n" + auditlog;
    //     return passauditlog;
    //   } else if (
    //     showtaskNotes &&
    //     showtaskAppAcronym === props.task.taskAppAcronym
    //   ) {
    //     const auditlog =
    //       formatDate + " " + username + " added a note: \n" + showtaskNotes;
    //     const passauditlog = !showtaskAuditNotes
    //       ? auditlog
    //       : showtaskAuditNotes + "\n" + auditlog;
    //     return passauditlog;
    //   } else {
    //     const auditlog =
    //       formatDate +
    //       " " +
    //       username +
    //       " added a note: \n" +
    //       showtaskNotes +
    //       "\n" +
    //       formatDate +
    //       " " +
    //       username +
    //       " changed plan to: \n" +
    //       showtaskAppAcronym;

    //     const passauditlog = !showtaskAuditNotes
    //       ? auditlog
    //       : showtaskAuditNotes + "\n" + auditlog;
    //     return passauditlog;
    //   }
    // };

    const updateTaskInfo = {
      taskName: showtaskName,
      taskNotes: showtaskNotes,
      taskPlanMVPName: showtaskPlanMVPName,
      taskAppAcronym: showtaskAppAcronym,
      taskAuditNotes: passauditlog,
      taskOwner: username
    };

    // Update Task Notes (Audit trail)
    userService.updateTask(updateTaskInfo).then((response) => {
      // notify(response.isGroup, response.bmessage);
      // console.log("response");
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
    // props.setTaskUpdateChangesState(true);
    props.setSubmit(true);
    // setUpdateSave(false);

    // props.setTaskUpdateChangesState(false);
    // props.close();
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    settaskNotes("");
    props.close();
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

                  <Form.Select
                    className="pt-3 px-5"
                    // defaultValue={showtaskPlanMVPName}
                    onChange={(e) => {
                      settaskPlanMVPName(e.target.value);
                    }}
                  >
                    <option value="">Choose a plan</option>
                    {/* {props.showPlanList.map((plan, index) => {
                      return (
                        <option key={index} value={plan.planMVPName}>
                          {plan.planMVPName}
                        </option>
                      );
                    })} */}
                  </Form.Select>
                </Form.Group>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={showtaskDesc}
                disabled
              />
            </Form.Group>
            <Row className="mb-2">
              {showtaskState === "close" ? (
                <></>
              ) : (
                <Form.Group as={Col}>
                  <Form.Label>Notes</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={6}
                    onChange={(e) => {
                      settaskNotes(e.target.value);
                    }}
                  />
                </Form.Group>
              )}

              <Form.Group as={Col}>
                <Form.Label>Audit Trail</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  style={styletextObj}
                  // value={showtaskAuditNotes}
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
          <Button variant="info" onClick={handleUpdateTask}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewTaskModal;
