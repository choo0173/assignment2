import React, { useEffect, useState } from "react";
import userService from "../service/user.service";
import UserHeader from "../components/UserHeader";
import AdminHeader from "../components/AdminHeader";
import TaskCard from "../components/TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import AddPlanModal from "../components/AddPlanModal";
import AddTaskModal from "../components/AddTaskModal";
import ViewPlan from "../components/ViewPlan";
import { useParams } from "react-router-dom";

function KanbanBoard() {
  const [groupAdmin, setGroupAdmin] = useState("");
  const [showShiftCard, setShiftCard] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [showTaskList, setTaskList] = useState([]);
  const [showPlanList, setPlanList] = useState([]);
  const [submit, setSubmit] = useState(false); // Set useState each time handleSave event Handler is fired for useEffect Dependency
  // const [addTask, setAddTask] = useState(false); // Set useState each time handleSave event Handler is fired for useEffect Dependency
  const [addPlan, setAddPlan] = useState(false); // Set useState each time handleSave event Handler is fired for useEffect Dependency
  // const [updateTaskState, setTaskUpdateState] = useState(false); // Set useState each time handleSave event Handler is fired for useEffect Dependency
  // const [updateTaskUpdateChangesState, setTaskUpdateChangesState] =
  useState(false); // Set useState each time handleSave event Handler is fired for useEffect Dependency
  let username = sessionStorage.getItem("username");

  const { appName } = useParams();
  const checkGroupData = {
    userName: username,
    groupName: "Admin"
  };
  const planInfo = {
    planAppAcronym: appName
  };
  const appInfo = {
    applicationAcronym: appName
  };
  const taskInfo = {
    taskAppAcronym: appName
  };

  useEffect(() => {
    userService.checkGroup(checkGroupData).then((response) => {
      setGroupAdmin(response);
    });
  }, []);

  // // Display Tasks and Plans
  useEffect(() => {
    fetchPlans();
    setAddPlan(false);
  }, [addPlan]);

  // Fetch tasks
  // useEffect(() => {
  //   fetchTasks();
  // }, [addTask]);

  // useEffect(() => {
  //   fetchTasks();
  //   setTaskUpdateState(false);
  // }, [updateTaskState]);

  // useEffect(() => {
  //   fetchTasks();
  //   setTaskUpdateChangesState(false);
  // }, [updateTaskUpdateChangesState]);

  useEffect(() => {
    setSubmit(false);
    fetchTasks();
  }, [submit]);

  // API call for fetching applications
  const fetchTasks = async () => {
    await userService.viewTasks(taskInfo).then((response) => {
      setTaskList(
        response.map((task) => {
          return task;
        })
      );
    });
  };

  // API call for fetching plans
  const fetchPlans = async () => {
    userService.viewPlans(planInfo).then((response) => {
      console.log(response);
      setPlanList(
        response.map((plan) => {
          return plan;
        })
      );
    });
  };

  const handleClosePlanModal = () => {
    setShowAddPlanModal(false);
    fetchPlans();
    // setGroups("");
  };

  const handleCloseTaskModal = () => {
    setShowAddTaskModal(false);
    fetchTasks();
    // setGroups("");
  };
  const handleShiftCard = () => {
    setShiftCard(false);
    fetchTasks();
    // setGroups("");
  };

  return (
    <>
      {/* Navbad */}
      {!groupAdmin ? <UserHeader /> : <AdminHeader />}

      {/* Body */}
      {/* Body-Header */}
      <div className="px-5 pt-2">
        <div className="row justify-content-between py-3">
          <div className="row align-items-center">
            <h5 className="px-4 color3">{appName}</h5>
          </div>
          <div className="col-1">
            <Button
              className="btnfont btn-success "
              onClick={() => setShowAddPlanModal(true)}
            >
              Create Plan +
            </Button>
            <AddPlanModal
              show={showAddPlanModal}
              setAddPlan={setAddPlan}
              // close={() => setShowAddPlanModal(false)}

              close={handleClosePlanModal}
            />
          </div>
        </div>
        {/* Display Plans */}
        <div className="row justify-content-md-center">
          <ViewPlan planList={showPlanList} />
        </div>

        {/* Kanban */}
        {/* Kanban Header */}
        <div className="container">
          <div className="row">
            <div className="col">
              Open{" "}
              <Button
                title="Create Task"
                style={{ float: "right" }}
                variant="light"
                size="sm"
                onClick={() => setShowAddTaskModal(true)}
              >
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </Button>
              <AddTaskModal
                show={showAddTaskModal}
                // setAddTask={setAddTask}
                setSubmit={setSubmit}
                // close={() => setShowAddTaskModal(false)}
                close={handleCloseTaskModal}
                taskList={showTaskList}
                showPlanList={showPlanList}
              />
            </div>
            <div className="col">To Do</div>
            <div className="col">Doing</div>
            <div className="col">Done</div>
            <div className="col">Close</div>
          </div>
          {/* Kanban Divider */}
          <div className="row">
            <div className="col mb-1">
              <hr className="solid"></hr>
            </div>
            <div className="col mb-1">
              <hr className="solid"></hr>
            </div>
            <div className="col mb-1">
              <hr className="solid"></hr>
            </div>
            <div className="col mb-1">
              <hr className="solid"></hr>
            </div>
            <div className="col mb-1">
              <hr className="solid"></hr>
            </div>
          </div>
          {/* Task Cards */}
          <div className="row ">
            {/* Open Column */}
            <div className="col mb-3 px-3 ">
              {showTaskList
                .filter((task) => task.taskState === "open")
                .map((task, index) => (
                  <TaskCard
                    key={task.taskName}
                    task={task}
                    showPlanList={showPlanList}
                    setSubmit={setSubmit}
                    shift={handleShiftCard}

                    // setTaskUpdateState={setTaskUpdateState}
                    // setTaskUpdateChangesState={setTaskUpdateChangesState}
                  />
                ))}
            </div>
            {/* Todo Column */}
            <div className="col mb-3 ">
              {showTaskList
                .filter((task) => task.taskState === "todo")
                .map((task, index) => (
                  <TaskCard
                    key={task.taskName}
                    task={task}
                    setSubmit={setSubmit}
                    // setTaskUpdateState={setTaskUpdateState}
                    showPlanList={showPlanList}
                    shift={handleShiftCard}

                    // setTaskUpdateChangesState={setTaskUpdateChangesState}
                  />
                ))}
            </div>
            {/* Doing Column */}
            <div className="col mb-3 ">
              {showTaskList
                .filter((task) => task.taskState === "doing")
                .map((task, index) => (
                  <TaskCard
                    key={task.taskName}
                    task={task}
                    // setTaskUpdateState={setTaskUpdateState}
                    showPlanList={showPlanList}
                    setSubmit={setSubmit}
                    shift={handleShiftCard}

                    // setTaskUpdateChangesState={setTaskUpdateChangesState}
                  />
                ))}
            </div>
            {/* Done Column */}
            <div className="col mb-3 ">
              {showTaskList
                .filter((task) => task.taskState === "done")
                .map((task, index) => (
                  <TaskCard
                    key={task.taskName}
                    task={task}
                    // setTaskUpdateState={setTaskUpdateState}
                    showPlanList={showPlanList}
                    setSubmit={setSubmit}
                    shift={handleShiftCard}

                    // setTaskUpdateChangesState={setTaskUpdateChangesState}
                  />
                ))}
            </div>
            {/* Closed Column */}
            <div className="col mb-3 ">
              {showTaskList
                .filter((task) => task.taskState === "close")
                .map((task, index) => (
                  <TaskCard
                    key={task.taskName}
                    task={task}
                    // setTaskUpdateState={setTaskUpdateState}
                    showPlanList={showPlanList}
                    setSubmit={setSubmit}
                    shift={handleShiftCard}

                    // setTaskUpdateChangesState={setTaskUpdateChangesState}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KanbanBoard;
