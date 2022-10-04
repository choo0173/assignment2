// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import userService from "../service/user.service";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/esm/Button";
// import Row from "react-bootstrap/esm/Row";
// import Col from "react-bootstrap/esm/Col";
// import moment from "moment";

// function AddTaskModal(props) {
//   console.log("yyoooozz props");
//   console.log(props);
//   const [showtaskName, settaskName] = useState("");
//   const [showtaskDesc, settaskDesc] = useState("");
//   const [showtaskNotes, settaskNotes] = useState("");
//   const [showtaskId, settaskId] = useState("");
//   const [showtaskPlanMVPName, settaskPlanMVPName] = useState("");
//   const [showtaskPlanColor, settaskPlanColor] = useState("");
//   const [showTaskCount, setTaskCount] = useState("");
//   const [showAppDetails, setAppDetails] = useState("");
//   const [showAppRNUM, setAppRNUM] = useState("");
//   const [showTaskRnum, setTaskRNUM] = useState(showAppRNUM + showTaskCount);
//   const [addTask, setAddTask] = useState(false);

//   const { appName } = useParams();
//   let username = sessionStorage.getItem("username");
//   const formatDate = moment().format("YYYY-MM-DD HH:mm:ss");

//   const appInfo = {
//     applicationAcronym: appName
//   };
//   const taskInfo = {
//     taskAppAcronym: appName
//   };
//   const planColor = {
//     planAppAcronym: appName,
//     planMVPName: showtaskPlanMVPName
//   };

//   // Display Plans
//   useEffect(() => {
//     fetchTaskCount();
//     fetchOneApps();
//     setAddTask(false);
//   }, [addTask]);

//   const fetchTaskCount = () => {
//     userService.countTasksbyApp(taskInfo).then((response) => {
//       console.log("====----====");
//       console.log(response.result);
//       console.log("====++++====");
//       setTaskCount(response.result);
//     });
//   };

//   // API call for fetching Apps
//   const fetchOneApps = () => {
//     userService.viewOneApps(appInfo).then((response) => {
//       // console.log("thisss is one app data");
//       // console.log(response[0].applicationRnum);
//       // console.log("00000000000000000000");
//       setAppDetails(response);
//       setAppRNUM(response[0].applicationRnum);
//     });
//   };

//   function handleCreateTask(e) {
//     e.preventDefault();

//     const auditlog = formatDate + " " + username + " created app";
//     console.log("showTaskCount");
//     console.log(showTaskCount);
//     const taskRnumCount = showAppRNUM + showTaskCount;
//     const taskRnum = appName + "_" + taskRnumCount;

//     const taskInfo = {
//       taskName: showtaskName,
//       taskDesc: showtaskDesc,
//       // taskNotes: showtaskNotes,
//       taskId: taskRnum,
//       taskPlanMVPName: showtaskPlanMVPName,
//       taskAppAcronym: appName,
//       taskState: "open",
//       taskCreator: username,
//       taskOwner: username,
//       taskCreate: formatDate,
//       taskPlanColor: showtaskPlanColor,
//       taskAuditNotes: auditlog
//     };

//     userService.createTask(taskInfo).then((response) => {
//       // notify(response.isGroup, response.bmessage);
//       // console.log(response.result);
//       if (response.result == true) {
//         // setGroups("");
//         settaskName("");
//         settaskDesc("");
//         settaskNotes("");
//         props.setAddTask(true);
//         setAddTask(true);
//         console.log("done");
//       } else {
//         console.log("Stop");
//       }
//     });
//   }

//   function handlePlanColor(e) {
//     settaskPlanMVPName(e.target.value);

//     userService.viewPlanColor(planColor).then((response) => {
//       // notify(response.isGroup, response.bmessage);
//       // console.log(response);
//       if (!response) {
//         settaskPlanColor(response);
//       } else {
//         console.log("Stop");
//       }
//     });
//   }

//   return (
//     <>
//       <Modal size="xl" show={props.show} cancel={props.close} centered>
//         <Modal.Header closeButton={true} onClick={props.close}>
//           <Modal.Title class="formboxheader">Create Task</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Row className="mb-2">
//               <Form.Group as={Col} xs={9}>
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                   placeholder="Task Title"
//                   onChange={(e) => {
//                     settaskName(e.target.value);
//                   }}
//                   value={showtaskName}
//                 />
//               </Form.Group>
//               <Form.Group as={Col}>
//                 <Form.Group>
//                   <div>
//                     <Form.Label>Plan</Form.Label>
//                   </div>

//                   <Form.Select
//                     className="pt-3 px-5"
//                     // onChange={handlePlanColor}
//                     onChange={(e) => {
//                       settaskPlanMVPName(e.target.value);
//                       // handlePlanColor;
//                     }}
//                   >
//                     <option value=" ">Choose a plan</option>
//                     {props.showPlanList.map((plan) => {
//                       return (
//                         <option key={plan.planMVPName} value={plan.planMVPName}>
//                           {plan.planMVPName}
//                         </option>
//                       );
//                     })}
//                   </Form.Select>
//                 </Form.Group>
//                 {/* <Form.Group className="mt-2">
//                   <Form.Label className="mx-1">Rnumber</Form.Label>
//                   <Form.Select className="px-1 mx-2" defaultValue="Choose...">
//                     <option>Choose...</option>
//                     <option>...</option>
//                   </Form.Select>
//                 </Form.Group> */}
//               </Form.Group>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 onChange={(e) => {
//                   settaskDesc(e.target.value);
//                 }}
//                 value={showtaskDesc}
//               />
//             </Form.Group>

//             {/* <Form.Group className="mb-3">
//               <Form.Label>Notes</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 onChange={(e) => {
//                   settaskNotes(e.target.value);
//                 }}
//                 value={showtaskNotes}
//               />
//             </Form.Group> */}
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={props.close}>
//             Back
//           </Button>
//           <Button variant="success" onClick={handleCreateTask}>
//             Create
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default AddTaskModal;
