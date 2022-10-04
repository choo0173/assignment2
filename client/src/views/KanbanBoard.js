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
  const [addPlan, setAddPlan] = useState(false); // Set useState each time handleSave event Handler is fired for useEffect Dependency
  // Check App Permits
  // const [showapplicationPOpen, setapplicationPOpen] = useState("");
  // const [applicationPCreate, setapplicationPCreate] = useState("");
  // const [applicationPTodo, setapplicationPTodo] = useState("");
  // const [applicationPDoing, setapplicationPDoing] = useState("");
  // const [applicationPDone, setapplicationPDone] = useState("");
  const [showIsPOpen, setIsPOpen] = useState("");
  const [showIsPCreate, setIsPCreate] = useState("");
  const [showIsPTodo, setIsPTodo] = useState("");
  const [showIsPDoing, setIsPDoing] = useState("");
  const [showIsPDone, setIsPDone] = useState("");

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
    const getUserRights = async () => {
      userService.checkGroup(checkGroupData).then((response) => {
        setGroupAdmin(response);
      });
      const permits = await fetchAppPermits();
      userService
        .checkGroupFunction({
          userName: username,
          groupName: permits.applicationPOpen
        })
        .then((response) => {
          // console.log(applicationPOpen);
          console.log("permit open", response.result);
          setIsPOpen(response.result);
        });

      userService
        // .checkGroupFunction(username, applicationPCreate)
        .checkGroupFunction({
          userName: username,
          groupName: permits.applicationPCreate
        })
        .then((response) => {
          console.log("permit create", response.result);
          setIsPCreate(response.result);
        });

      userService
        // .checkGroupFunction(username, applicationPTodo)
        .checkGroupFunction({
          userName: username,
          groupName: permits.applicationPTodo
        })
        .then((response) => {
          console.log("permit todo", response.result);
          setIsPTodo(response.result);
        });
      userService
        // .checkGroupFunction(username, applicationPDoing)
        .checkGroupFunction({
          userName: username,
          groupName: permits.applicationPDoing
        })
        .then((response) => {
          console.log("permit doing", response.result);
          setIsPDoing(response.result);
        });
      userService
        // .checkGroupFunction(username, applicationPDone)
        .checkGroupFunction({
          userName: username,
          groupName: permits.applicationPDone
        })
        .then((response) => {
          console.log("permit done", response.result);
          setIsPDone(response.result);
        });
    };
    getUserRights();
  }, []);

  // // Display Tasks and Plans
  useEffect(() => {
    fetchPlans();
    setAddPlan(false);
  }, [addPlan]);

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
      // console.log(response);
      setPlanList(
        response.map((plan) => {
          return plan;
        })
      );
    });
  };

  // API call for fetching app permits
  const fetchAppPermits = async () => {
    const data = await userService.checkAppPermits(appInfo);

    return data.result;
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

  // const createButton = () => {
  //   return (
  //     <>
  //       <Button
  //         className="btnfont btn-success "
  //         onClick={() => setShowAddPlanModal(true)}
  //       >
  //         Create Plan +
  //       </Button>
  //       <AddPlanModal
  //         show={showAddPlanModal}
  //         setAddPlan={setAddPlan}
  //         // close={() => setShowAddPlanModal(false)}
  //         close={handleClosePlanModal}
  //       />
  //     </>
  //   );
  // };

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
            {showIsPOpen === true ? (
              <>
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
              </>
            ) : (
              <></>
            )}
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
              {showIsPCreate === true ? (
                <>
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
                </>
              ) : (
                <></>
              )}
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
                    key={task.taskId}
                    task={task}
                    showPlanList={showPlanList}
                    setSubmit={setSubmit}
                    shift={handleShiftCard}
                    showIsPOpenRights={showIsPOpen}
                  />
                ))}
            </div>
            {/* Todo Column */}
            <div className="col mb-3 ">
              {showTaskList
                .filter((task) => task.taskState === "todo")
                .map((task, index) => (
                  <TaskCard
                    key={task.taskId}
                    task={task}
                    setSubmit={setSubmit}
                    showPlanList={showPlanList}
                    shift={handleShiftCard}
                    showIsPTodoRights={showIsPTodo}
                  />
                ))}
            </div>
            {/* Doing Column */}
            <div className="col mb-3 ">
              {showTaskList
                .filter((task) => task.taskState === "doing")
                .map((task, index) => (
                  <TaskCard
                    key={task.taskId}
                    task={task}
                    showPlanList={showPlanList}
                    setSubmit={setSubmit}
                    shift={handleShiftCard}
                    showIsPDoingRights={showIsPDoing}
                  />
                ))}
            </div>
            {/* Done Column */}
            <div className="col mb-3 ">
              {showTaskList
                .filter((task) => task.taskState === "done")
                .map((task, index) => (
                  <TaskCard
                    key={task.taskId}
                    task={task}
                    showPlanList={showPlanList}
                    setSubmit={setSubmit}
                    shift={handleShiftCard}
                    showIsPDoneRights={showIsPDone}
                  />
                ))}
            </div>
            {/* Closed Column */}
            <div className="col mb-3 ">
              {showTaskList
                .filter((task) => task.taskState === "close")
                .map((task, index) => (
                  <TaskCard
                    key={task.taskId}
                    task={task}
                    showPlanList={showPlanList}
                    setSubmit={setSubmit}
                    shift={handleShiftCard}
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
