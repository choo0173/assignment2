// import { useState } from "react";
// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/esm/Button";
// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ViewTaskModal from "./ViewTaskModal";

// function TaskCard(props) {
//   console.log("&&&&&&&&&&&&&&&&&&&&");
//   console.log(props.taskList);
//   console.log(props.task);
//   // console.log(props.taskList);
//   const [showViewTaskModal, setShowViewTaskModal] = useState(false);
//   return (
//     <Col xs={1} md={12} className="g-4 ">
//       {props.task.map((task) => {
//         const styleObj = {
//           borderColor: task.taskPlanColor,
//           borderWidth: "2px"
//           // width: "195px"
//         };
//         const styleheaderObj = {
//           marginLeft: "15px",
//           width: "130px",
//           fontSize: "16px",
//           overflow: "hidden",
//           whiteSpace: "nowrap",
//           textOverflow: "ellipsis"
//         };
//         const styletextObj = {
//           display: "block",
//           width: "120px",
//           height: "16px",
//           overflow: "hidden",
//           whiteSpace: "nowrap",
//           textOverflow: "ellipsis",
//           fontSize: "12px",
//           fontWeight: "380"
//         };

//         return (
//           <Row className="pt-2">
//             <Card style={styleObj} className=" w-100 ">
//               <Card.Body>
//                 <Row>
//                   <Card.Title style={styleheaderObj}>
//                     {task.taskName}
//                     <ViewTaskModal
//                       show={showViewTaskModal}
//                       close={() => setShowViewTaskModal(false)}
//                     />
//                   </Card.Title>
//                   <Button
//                     title="Edit"
//                     // delay={{ show: 10, hide: 400 }}
//                     size="sm"
//                     variant="light"
//                     style={{ float: "right" }}
//                     onClick={() => setShowViewTaskModal(true)}
//                   >
//                     <FontAwesomeIcon
//                       icon="fa-solid fa-pen-to-square"
//                       color="grey"
//                     />
//                   </Button>
//                 </Row>

//                 <Card.Text style={styletextObj}>{task.taskDesc}</Card.Text>
//                 <Button
//                   title="Demote"
//                   size="sm"
//                   variant="light"
//                   style={{ float: "left" }}
//                 >
//                   <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
//                 </Button>
//                 <Button
//                   title="Promote"
//                   size="sm"
//                   variant="light"
//                   style={{ float: "right" }}
//                 >
//                   <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Row>
//         );
//       })}
//     </Col>
//   );
// }

// export default TaskCard;
