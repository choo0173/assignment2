import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewTaskModal from "./ViewTaskModal";
import userService from "../service/user.service";
import moment from "moment";

function TaskCard(props) {
  const [showViewTaskModal, setShowViewTaskModal] = useState(false);
  const [showTaskState, setTaskState] = useState(props.task.taskState);
  const [showtaskAuditNotes, settaskAuditNotes] = useState(
    props.task.taskAuditNotes
  );
  const [showPlanList, setPlanList] = useState([]);
  let username = sessionStorage.getItem("username");
  const formatDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const { appName } = useParams();
  const planInfo = {
    planAppAcronym: appName
  };
  const taskInfo = {
    taskAppAcronym: appName
  };

  const updateTaskStateInfo = {
    taskState: showTaskState,
    taskName: props.task.taskName,
    taskAppAcronym: props.task.taskAppAcronym
  };

  // Styling
  const styleObj = {
    borderColor: props.task.taskPlanColor,
    borderWidth: "2px"
    // width: "195px"
  };
  const styleheaderObj = {
    marginLeft: "15px",
    width: "130px",
    fontSize: "16px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  };
  const styletextObj = {
    display: "block",
    width: "120px",
    height: "16px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "12px",
    fontWeight: "400"
  };
  const styleminitextObj = {
    display: "flex",
    height: "12px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "10px",
    fontWeight: "380",
    margin: "0px"
  };

  useEffect(() => {
    userService.updateTaskState(updateTaskStateInfo).then((response) => {
      // props.setTaskUpdateState(true);
    });
    props.setSubmit(true);
    // props.handleShiftCard.setShiftCard(true);
    // fetchTasks();
  }, [showTaskState]);

  useEffect(() => {
    fetchPlans();
  }, []);

  // API call for fetching plans
  const fetchPlans = async () => {
    userService.viewPlans(planInfo).then((response) => {
      // console.log(response);
      setPlanList(
        response.map((plan) => {
          return plan;
        })
      );
    });
  };

  // API call for fetching applications
  // const fetchTasks = async () => {
  //   await userService.viewTasks(taskInfo).then((response) => {
  //     setTaskList(
  //       response.map((task) => {
  //         return task;
  //       })
  //     );
  //   });
  // };
  // Handle Promote
  const handlePromote = (e) => {
    e.preventDefault();

    let arrayStates = ["open", "todo", "doing", "done", "close"];
    for (let i = 0; i < arrayStates.length - 1; i++) {
      if (props.task.taskState === arrayStates[i]) {
        setTaskState(arrayStates[i + 1]);
        let promoteState = arrayStates[i + 1];
        // console.log("+++++++++++++++");
        // console.log(showtaskAuditNotes);
        // console.log("=========");
        const auditlog =
          formatDate +
          " " +
          username +
          " promoted task from " +
          showTaskState +
          " to " +
          promoteState;
        const passauditlog = !showtaskAuditNotes
          ? auditlog
          : showtaskAuditNotes + "\n" + auditlog;
        console.log("PASSS AUDIT LOG");
        console.log(passauditlog);
        try {
          // const auditlog =
          //   formatDate +
          //   " " +
          //   username +
          //   " promoted task from " +
          //   showTaskState +
          //   " to " +
          //   promoteState;
          // const passauditlog = !showtaskAuditNotes
          //   ? auditlog
          //   : showtaskAuditNotes + "\n" + auditlog;
          const updateTaskStateNotesInfo = {
            taskName: props.task.taskName,
            taskNotes: props.task.taskName,
            taskAuditNotes: passauditlog,
            taskOwner: username
          };
          // Update Audit trail
          userService
            .updateTaskStateNotes(updateTaskStateNotesInfo)
            .then((response) => {
              // notify(response.isGroup, response.bmessage);
              if (response.isUpdateStateNotes == "success") {
                // settaskNotes("");
                console.log("auditnotes updated");
                // props.setSubmit(true);
              } else {
                console.log("Stop");
              }
            });
        } catch (err) {
          console.log(err);
        }
        // props.setSubmit(true);
      }
    }
  };

  // Handle Demote
  const handleDemote = (e) => {
    e.preventDefault();
    let arrayStates = ["open", "todo", "doing", "done", "close"];
    for (let i = 1; i < arrayStates.length; i++) {
      if (props.task.taskState === arrayStates[i]) {
        setTaskState(arrayStates[i - 1]);
        let demoteState = arrayStates[i - 1];

        try {
          const auditlog =
            formatDate +
            " " +
            username +
            " demoted task from " +
            showTaskState +
            " to " +
            demoteState;
          const passauditlog = !showtaskAuditNotes
            ? auditlog
            : showtaskAuditNotes + "\n" + auditlog;
          const updateTaskStateNotesInfo = {
            taskName: props.task.taskName,
            taskNotes: props.task.taskName,
            taskAuditNotes: passauditlog,
            taskOwner: username
          };
          // Update Audit trail
          userService
            .updateTaskStateNotes(updateTaskStateNotesInfo)
            .then((response) => {
              // notify(response.isGroup, response.bmessage);
              // console.log(response);
              if (response.isUpdateStateNotes == "success") {
                // settaskNotes("");
                console.log("auditnotes updated");
                // props.setSubmit(true);
              } else {
                console.log("Stop");
              }
            });
        } catch (err) {
          console.log(err);
        }
        // props.setSubmit(true);
      }
    }
  };
  return (
    <>
      <Col xs={1} md={12} className="g-4 ">
        <Row className="pt-2">
          <Card style={styleObj} className=" w-100 ">
            <Card.Body>
              <Row>
                <Card.Title style={styleheaderObj}>
                  {props.task.taskName}
                  <ViewTaskModal
                    show={showViewTaskModal}
                    close={() => setShowViewTaskModal(false)}
                    id={props.task.taskName}
                    taskDetails={props.task}
                    // setTaskUpdateState={props.setTaskUpdateState}
                    // setTaskUpdateChangesState={props.setTaskUpdateChangesState}
                    // taskList={showtaskPlanList}
                    // showPlanList={showtaskPlanList}
                    setSubmit={props.setSubmit}
                    showPlanList={showPlanList}
                  />
                </Card.Title>
                {props.task.taskState == "close" ? (
                  <Button
                    title="Expand"
                    size="sm"
                    variant="light"
                    style={{ float: "right" }}
                    onClick={() => setShowViewTaskModal(true)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-maximize" color="grey" />
                  </Button>
                ) : (
                  <Button
                    title="Edit"
                    size="sm"
                    variant="light"
                    style={{ float: "right" }}
                    onClick={() => setShowViewTaskModal(true)}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-pen-to-square"
                      color="grey"
                    />
                  </Button>
                )}
              </Row>

              <Card.Text style={styletextObj}>{props.task.taskDesc}</Card.Text>
              <Card.Text style={styleminitextObj}>
                {"Creator: \t" + props.task.taskCreator}
              </Card.Text>
              <Card.Text style={styleminitextObj}>
                {"Owner: \t" + props.task.taskOwner}
              </Card.Text>
              {props.task.taskState == "open" ||
              props.task.taskState == "todo" ? (
                <div></div>
              ) : props.task.taskState == "close" ? (
                <div></div>
              ) : (
                <Button
                  title="Demote"
                  size="sm"
                  variant="light"
                  style={{ float: "left" }}
                  onClick={handleDemote}
                >
                  <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                </Button>
              )}
              {props.task.taskState == "close" ? (
                <div></div>
              ) : (
                <Button
                  title="Promote"
                  size="sm"
                  variant="light"
                  style={{ float: "right" }}
                  onClick={handlePromote}
                >
                  <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </Button>
              )}
            </Card.Body>
          </Card>
        </Row>
      </Col>
    </>
  );
}

export default TaskCard;
