import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import userService from "../service/user.service";
import { Multiselect } from "multiselect-react-dropdown";

function ViewTable(props) {
  const [displayedUser, setDisplayedUser] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [theader, setTheader] = useState([]);
  // grouplist is the list of groups created in group management
  const [grouplist, setGroupList] = useState([]);
  // groupnames stored for each indiv
  const [userGroups, setUserGroups] = useState([]);
  // new groups
  const [selectedGroups, setSelectedGroup] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    console.log(props.tableList);
    if (props.tableList.length != 0) {
      const s = props.tableList[0];
      setTheader(Object.keys(s));
    }
  }, []);

  useEffect(() => {
    setEmail(displayedUser.userEmail);
    setUsername(displayedUser.userName);
    setPwd(displayedUser.userPwd);
    setStatus(displayedUser.userStatus);
    setUserGroups(displayedUser.groupName);
  }, [displayedUser]);

  useEffect(() => {
    userService.viewGroup().then((response) => {
      setGroupList(response);
    });
  }, []);

  //View Modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (e) => {
    setShow(true);
    const user = props.tableList.find((user) => user.userName === e.target.id);
    const userGroupNames = user.groupName;
    if (!userGroupNames) {
      setSelectedGroup([]);
    }
    if (userGroupNames) {
      const arrayGroups = userGroupNames.split(",").map((group) => ({
        groupName: group.trim()
      }));
      setSelectedGroup(arrayGroups);
    }
    setDisplayedUser(user);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    let group = "";
    const type = typeof userGroups;
    if (type != "string" && userGroups != null) {
      if (userGroups.length > 0) {
        userGroups.map((data) => {
          group == ""
            ? (group += data.groupName)
            : (group = group + "," + data.groupName);
        });
      }
    } else {
      if (userGroups != null) group += userGroups;
    }

    const data = {
      userName: username,
      userEmail: email,
      userStatus: +status,
      userPwd: pwd,
      groupName: group
    };
    userService.updateUserProfile(data).then((res) => {
      props.setUpdateSave(true);
      setShow(false);
      setSelectedGroup([]);
    });
    // props.setUpdateSave((updateSave) => !updateSave);

    // props.fetchUsers();
  };

  function ChangeName(value) {
    switch (value) {
      case "userName":
        return "Username";
        break;
      case "userPwd":
        return "Password";
        break;
      case "userEmail":
        return "Email";
        break;
      case "groupName":
        return "Group";
        break;
      case "userStatus":
        return "Status";
        break;
    }
  }

  return (
    <>
      {theader.length != 0 ? (
        <table class="table table-striped">
          <thead>
            <tr>
              {/* Display header for Users */}
              {theader.map((value, index) => {
                return (
                  <>{value != "userPwd" && <th>{ChangeName(value)}</th>}</>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* Display table for Users */}
            {theader.includes("userName")
              ? props.tableList.map((user, index) => {
                  return (
                    <>
                      <tr>
                        <td>{user.userName}</td>
                        <td>{user.userEmail}</td>
                        <td>{user.groupName}</td>
                        <td>{user.userStatus}</td>

                        <td>
                          <Button
                            className="btnfont btn-secondary"
                            onClick={handleShow}
                            id={user.userName}
                          >
                            Edit
                          </Button>

                          <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton={true}>
                              <Modal.Title class="formboxheader">
                                Edit Details
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div>
                                {/* <input onChange=(()=>{setUsername(e.target.value)}</div>)>{username}</input> */}
                                {/* <div>{status}</div> */}
                                {/* <div>{"nil"}</div> */}
                                {/* <div>{group}</div> */}
                                {/* <div>{email}</div> */}

                                <Form className="container p-3  ">
                                  <div className="row justify-content-around">
                                    <Form.Group className="mb-3 col">
                                      <Form.Label>Username</Form.Label>
                                      <Form.Control
                                        className="form-control form-control-sm  forminputfield "
                                        type="text"
                                        disabled
                                        value={username}
                                      />
                                    </Form.Group>
                                    <Form.Group className="mb-3 col">
                                      <Form.Label className="row mb-2 ml-1">
                                        Status
                                      </Form.Label>
                                      <Form.Select
                                        name="status"
                                        className="form-select form-select-lg mb-2"
                                        onChange={(e) => {
                                          setStatus(e.target.value);
                                        }}
                                        value={status}
                                      >
                                        <option disabled defaultChecked>
                                          Select Status
                                        </option>
                                        <option value="1">Enabled</option>
                                        <option value="0">Disabled</option>
                                      </Form.Select>
                                    </Form.Group>
                                  </div>
                                  <div className="row justify-content-around">
                                    <Form.Group className="mb-3 col">
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control
                                        className="form-control form-control-sm  forminputfield "
                                        type="password"
                                        autoComplete="off"
                                        onChange={(e) => {
                                          setPwd(e.target.value);
                                        }}
                                      />
                                    </Form.Group>
                                    <Form.Group className="mb-3 col">
                                      <Form.Label>Email</Form.Label>
                                      <Form.Control
                                        className="form-control form-control-sm  forminputfield "
                                        type="text"
                                        autoComplete="off"
                                        placeholder={email}
                                        onChange={(e) => {
                                          setEmail(e.target.value);
                                        }}
                                      />
                                    </Form.Group>
                                  </div>
                                  <div className="row justify-content-left">
                                    <Form.Group className="mb-3 col">
                                      <Form.Label className="row mb-2 ml-1">
                                        Group(s)
                                      </Form.Label>
                                      <Multiselect
                                        className="bg-white border-black/5"
                                        // placeholder="Assign User Groups ... "
                                        options={grouplist}
                                        avoidHighlightFirstOption={true}
                                        emptyRecordMsg="No Options Available"
                                        displayValue={"groupName"}
                                        // placeholder={userGroups}
                                        // value={userGroups}
                                        // selectedValues={separateObject(obj)}
                                        // selectedValues={userGroups
                                        //   .split(",")
                                        //   .map((group) => ({
                                        //     groupName: group.trim()
                                        //   }))}
                                        selectedValues={selectedGroups}
                                        onRemove={
                                          (selection) => {
                                            setUserGroups(selection);
                                          }

                                          // This Function will run only when an option is de-selected
                                          // (selectionList, selectedItem) => {
                                          //   if (selectionList.length > 0) {
                                          //     setUserGroups(selectionList);
                                          //   }
                                          // else {
                                          //   if (selectionList.length <= 0) {
                                          //     setUserGroups("Empty");
                                          //   }
                                          // }
                                          // }
                                        }
                                        onSelect={
                                          // This Function will run only when an option is selected
                                          (selection) => {
                                            setUserGroups(selection);
                                          }
                                        }
                                        showCheckbox
                                      />
                                    </Form.Group>
                                  </div>
                                </Form>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Back
                              </Button>
                              <Button variant="info" onClick={handleSave}>
                                Save
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </td>
                      </tr>
                    </>
                  );
                })
              : props.tableList.map((user, index) => {
                  return (
                    <>
                      <tr>
                        <td>{user.groupName}</td>
                      </tr>
                    </>
                  );
                })}
          </tbody>
        </table>
      ) : (
        <div>
          <span>No Records Found</span>
        </div>
      )}
    </>
  );
}

export default ViewTable;

//Click edit button => HandleEdit (filter user based on edit button's id and setDisplayedUser)
