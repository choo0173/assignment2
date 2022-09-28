// import React, { useEffect, useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/esm/Button";
// import userService from "../service/user.service";

// function ViewTable(props) {
//   const [displayedUser, setDisplayedUser] = useState("");
//   const [username, setUsername] = useState("");
//   const [pwd, setPwd] = useState("");
//   const [email, setEmail] = useState("");
//   const [group, setGroup] = useState("");
//   const [status, setStatus] = useState("");
//   const [theader, setTheader] = useState([]);

//   useEffect(() => {
//     if (props.tableList.length != 0) {
//       const s = props.tableList[0];
//       setTheader(Object.keys(s));
//     }
//   }, []);

//   useEffect(() => {
//     if (displayedUser) {
//       setEmail(displayedUser.userEmail);
//       setUsername(displayedUser.userName);
//       setPwd(displayedUser.userPwd);
//       setStatus(displayedUser.userStatus);
//       setGroup(displayedUser.groupName);
//     }
//   }, [displayedUser]);

//   //View Modal
//   const [show, setShow] = useState(false);

//   // Handles closing of modal
//   const handleClose = () => {
//     setShow(false);
//   };

//   // Handles opening of modal
//   const handleShow = (e) => {
//     setShow(true);
//     const user = props.tableList.find((user) => user.userName === e.target.id);
//     setDisplayedUser(user);
//   };

//   // Handles saving of changes in modal
//   const handleSave = async (e) => {
//     e.preventDefault();
//     const data = {
//       userName: username,
//       userEmail: email
//     };
//     userService.editEmail(data).then((res) => {
//       console.log(res);
//     });
//     props.fetchUsers();
//   };

//   return (
//     <>
//       <table class="table table-striped">
//         <tbody>
//           {/* Display table for Users */}
//           {props.tableList.map((user, index) => {
//             return (
//               <>
//                 <tr>
//                   <td>{user.userName}</td>
//                   <td>{user.userEmail}</td>
//                   <td>{user.groupName}</td>
//                   <td>{user.userStatus}</td>

//                   <td>
//                     {/* Edit Modal */}
//                     <Button
//                       className="btnfont btn-secondary"
//                       onClick={handleShow}
//                       id={user.userName}
//                     >
//                       Edit
//                     </Button>

//                     <Modal show={show} onHide={handleClose} centered>
//                       <Modal.Header closeButton={true}>
//                         <Modal.Title class="formboxheader">
//                           Edit Details
//                         </Modal.Title>
//                       </Modal.Header>
//                       <Modal.Body>
//                         <div>
//                           <Form className="container p-3  ">
//                             <div className="row justify-content-left">
//                               <Form.Group className="mb-3 col">
//                                 <Form.Label>Email</Form.Label>
//                                 {/* Sends onChange values to user.service */}
//                                 <Form.Control
//                                   className="form-control form-control-sm  forminputfield "
//                                   type="text"
//                                   autoComplete="off"
//                                   value={email}
//                                   onChange={(e) => {
//                                     setEmail(e.target.value);
//                                   }}
//                                 />
//                               </Form.Group>
//                             </div>
//                           </Form>
//                         </div>
//                       </Modal.Body>
//                       <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>
//                           Back
//                         </Button>
//                         <Button variant="success" onClick={handleSave}>
//                           Save
//                         </Button>
//                       </Modal.Footer>
//                     </Modal>
//                   </td>
//                 </tr>
//               </>
//             );
//           })}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default ViewTable;
