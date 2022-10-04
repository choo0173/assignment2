// import { useState } from "react";
// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/esm/Button";
// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";
// import { Navigate, useNavigate, Link } from "react-router-dom";
// import ViewAppModal from "./ViewAppModal";
// import KanbanBoard from "../views/KanbanBoard";

// function GridCard(props) {
//   console.log(props);
//   // let navigate = useNavigate();
//   const [showViewAppModal, setShowViewAppModal] = useState(false);

//   return (
//     <Row xs={1} md={3} className="g-4 ">
//       {props.appList.map((app) => {
//         const styleheaderObj = {
//           fontSize: "18px",
//           overflow: "hidden",
//           whiteSpace: "nowrap",
//           textOverflow: "ellipsis"
//         };
//         const styletextObj = {
//           display: "block",
//           width: "120px",
//           height: "18px",
//           overflow: "hidden",
//           whiteSpace: "nowrap",
//           textOverflow: "ellipsis",
//           fontSize: "14px",
//           fontWeight: "380"
//         };
//         return (
//           <Col className="pt-3">
//             <Card key={app.applicationAcronym}>
//               <Card.Body>
//                 <Card.Title style={styleheaderObj}>
//                   {app.applicationAcronym}
//                   <Button
//                     title="Expand"
//                     delay={{ show: 10, hide: 400 }}
//                     size="sm"
//                     variant="light"
//                     style={{ float: "right" }}
//                     onClick={() => setShowViewAppModal(true)}
//                   >
//                     <FontAwesomeIcon icon="fa-solid fa-maximize" color="grey" />
//                   </Button>
//                   <ViewAppModal
//                     show={showViewAppModal}
//                     close={() => setShowViewAppModal(false)}
//                   />
//                 </Card.Title>

//                 <Card.Text style={styletextObj}>
//                   {app.applicationDesc}
//                 </Card.Text>
//                 <Link to={`/kanbanboard/${app.applicationAcronym}`}>
//                   <Button variant="primary" style={{ float: "right" }}>
//                     View More{" "}
//                     <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
//                   </Button>
//                 </Link>
//               </Card.Body>
//             </Card>
//           </Col>
//         );
//       })}
//     </Row>
//   );
// }

// export default GridCard;
