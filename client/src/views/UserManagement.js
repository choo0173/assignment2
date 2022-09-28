import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import userService from "../service/user.service";
import ViewTable from "../components/ViewTable";
import { toast } from "react-toastify";

function UserManagement() {
  const [Username, setUsername] = useState("");
  const [Pwd, setPwd] = useState("");
  const [Status, setStatus] = useState("");
  const [Email, setEmail] = useState("");
  const [Groups, setGroups] = useState("");
  const [UserList, setUserList] = useState([]);
  const [updateSave, setUpdateSave] = useState(false); // Set useState each time handleSave event Handler is fired for useEffect Dependency
  const [show, setShow] = useState(false);

  // Display Users
  useEffect(() => {
    fetchUsers();
    setUpdateSave(false);
  }, [updateSave]);

  const fetchUsers = () => {
    userService.viewUser().then((response) => {
      setUserList(
        response.map((user) => {
          return user;
        })
      );
    });
  };

  const handleClose = () => {
    setShow(false);
    fetchUsers();
    setEmail("");
    setUsername("");
    setPwd("");
  };

  const handleShow = () => setShow(true);

  // Create New User
  function handleCreateUser(e) {
    e.preventDefault();

    const userCreate = {
      userName: Username,
      userPwd: Pwd,
      userStatus: Status,
      userEmail: Email,
      groupName: Groups
    };

    userService.createUser(userCreate).then(async (response) => {
      console.log("response", response);
      notify(response);
      if (response.create === "User Created") {
        setUsername("");
        setPwd("");
        setStatus("");
        setEmail("");
        setGroups([]);
      }
    });
  }
  const notify = (error_msg) => {
    if (error_msg.duplicate != false) {
      toast.error(error_msg.duplicate, {});
    }
    if (error_msg.create != false) {
      toast.success(error_msg.create, {});
    }

    if (!error_msg.username && error_msg.password && error_msg.email) {
      toast.error(error_msg.password, {});
      toast.error(error_msg.email, {});
    } else if (error_msg.username && !error_msg.password && error_msg.email) {
      toast.error(error_msg.username, {});
      toast.error(error_msg.email, {});
    } else if (error_msg.username && error_msg.password && !error_msg.email) {
      toast.error(error_msg.username, {});
      toast.error(error_msg.password, {});
    } else if (!error_msg.username && !error_msg.password && error_msg.email) {
      toast.error(error_msg.email, {});
    } else if (error_msg.username && !error_msg.password && !error_msg.email) {
      toast.error(error_msg.username, {});
    } else if (!error_msg.username && error_msg.password && !error_msg.email) {
      toast.error(error_msg.password, {});
    } else {
      toast.error(error_msg.username, {});
      toast.error(error_msg.password, {});
      toast.error(error_msg.email, {});
    }
  };

  return (
    <>
      <AdminHeader />
      <div class="px-5 pt-2  ">
        <div class="row justify-content-between py-3">
          <div className="row align-items-center">
            <div className="px-4">List of Users</div>
          </div>
          <div class="col-1">
            {/* Add Modal */}
            <Button className="btnfont btn-success" onClick={handleShow}>
              Add +
            </Button>
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton={true}>
                <Modal.Title class="formboxheader">Create User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="container p-3  ">
                  <div className="row justify-content-around">
                    <Form.Group className="mb-3 col">
                      <Form.Label>Username *</Form.Label>
                      <Form.Control
                        name="username"
                        className="form-control form-control-sm  forminputfield "
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        value={Username}
                      />
                    </Form.Group>
                  </div>
                  <div className="row justify-content-around">
                    <Form.Group
                      className="mb-3 col"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password *</Form.Label>
                      <div class="input-group ">
                        <Form.Control
                          name="password"
                          className="form-control form-control-sm forminputfield "
                          type="password"
                          placeholder="Password"
                          onChange={(e) => {
                            setPwd(e.target.value);
                          }}
                          value={Pwd}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="row justify-content-left">
                    <Form.Group className="mb-3 col">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        name="email"
                        className="form-control form-control-sm  forminputfield "
                        type="text"
                        placeholder="Email"
                        autoComplete="off"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={Email}
                      />
                    </Form.Group>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Back
                </Button>
                <Button variant="success" onClick={handleCreateUser}>
                  Create
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        {/* Display Users */}
        {UserList.length != 0 && (
          <div class="border border-dark rounded container p-3 scrollable-div ">
            <ViewTable
              tableList={UserList}
              fetchUsers={fetchUsers}
              setUpdateSave={setUpdateSave}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default UserManagement;
