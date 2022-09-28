import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditBox from "./EditBox";
import userService from "../service/user.service";
import { toast } from "react-toastify";

function ViewBox() {
  const [showEdit, setShowEdit] = useState(true);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [newpwd, setNewPwd] = useState("");
  const [email, setEmail] = useState("");
  const [newemail, setNewEmail] = useState("");
  const [groups, setGroups] = useState("");
  const [newgroups, setNewGroups] = useState("");

  const displayUsername = {
    userName: sessionStorage.getItem("username")
  };
  // console.log(displayUsername);
  userService.viewOneUser(displayUsername).then((response) => {
    setUsername(response.result[0].userName);
    setEmail(response.result[0].userEmail);
    setPwd(response.result[0].userPwd);
    setGroups(response.result[0].groupName);
  });

  const swapMode = () => {
    setShowEdit(!showEdit);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const data = {
      userName: username,
      userEmail: newemail,
      userPwd: newpwd,
      groupName: newgroups
    };

    userService.updateAdminProfile(data).then((res) => {
      console.log(res);
      notify(res.isUpdateEmail, res.isUpdatePwd, res.regexStatus, res.message);
      setShowEdit(true);
      setNewPwd("");
      setNewEmail("");
    });
    // props.fetchUsers();
    setShowEdit(!showEdit);
  };

  const notify = (isUpdateEmail, isUpdatePwd, regexStatus, message) => {
    console.log("What is regexStatus: ", regexStatus);
    if (isUpdateEmail === "fail" && isUpdatePwd === "fail" && !regexStatus) {
      toast.info("Empty Form Fields Submitted! Profile Not Updated!", {});
    }

    if (
      (isUpdateEmail === "success" && isUpdatePwd === "fail") ||
      (isUpdateEmail === "success" && isUpdatePwd === "fail" && !regexStatus)
    ) {
      toast.success("Email Updated", {});
    }

    if (
      (isUpdateEmail === "fail" && isUpdatePwd === "success") ||
      (isUpdateEmail === "fail" && isUpdatePwd === "success" && !regexStatus)
    ) {
      toast.success("Password Updated", {});
    }
    if (isUpdateEmail === "success" && isUpdatePwd === "success") {
      toast.success("Profile Updated", {});
    }
    if (regexStatus === "pwdfail" && isUpdatePwd === "fail") {
      toast.error("Provide a valid password", {});
    }
    if (regexStatus === "emailfail" && isUpdateEmail === "fail") {
      toast.error("Provide a valid email", {});
    }

    if (
      regexStatus === "fail" &&
      isUpdateEmail === "fail" &&
      isUpdatePwd === "fail"
    ) {
      toast.error("Provide a valid email address & password", {});
    }
  };

  return (
    <>
      {showEdit ? (
        // View Profile
        <div className="px-5 pt-2  ">
          <div className="row justify-content-between py-3">
            <div className="col-2">Profile Details</div>
            <div className="col-1">
              <Button className=" btnfont" onClick={swapMode}>
                Edit
              </Button>
            </div>
          </div>
          <div className="border border-dark rounded  ">
            <Form className="container p-3  ">
              <div className="row justify-content-around">
                <Form.Group className="mb-3 col">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    className="form-control form-control-sm  forminputfield "
                    type="text"
                    autoComplete="off"
                    value={username}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3 col">
                  <Form.Label>Groups</Form.Label>
                  <Form.Control
                    name="groups"
                    className="form-control form-control-sm  forminputfield "
                    type="text"
                    autoComplete="off"
                    value={groups}
                    disabled
                  />
                </Form.Group>
              </div>
              <div className="row justify-content-around">
                <Form.Group className="mb-3 col">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    className="form-control form-control-sm  forminputfield "
                    type="text"
                    placeholder="Email"
                    autoComplete="off"
                    disabled
                    value={email}
                  />
                </Form.Group>{" "}
                <Form.Group
                  className="mb-3 col"
                  controlId="formBasicPassword"
                ></Form.Group>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        // Update Profile
        <div className="px-5 pt-2  ">
          <div className="row justify-content-between py-3">
            <div className="col-2">Edit Details</div>
            <div className="col-1">
              <Button className=" btn-success" onClick={saveChanges}>
                Update
              </Button>
            </div>
          </div>
          <div className="border border-dark rounded  ">
            <Form className="container p-3  ">
              <div className="row justify-content-around">
                <Form.Group className="mb-3 col">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    className="form-control form-control-sm  forminputfield "
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                    value={username}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3 col">
                  <Form.Label>Groups</Form.Label>
                  <Form.Control
                    name="groups"
                    className="form-control form-control-sm  forminputfield "
                    type="text"
                    placeholder={groups}
                    autoComplete="off"
                    value={groups}
                    disabled
                  />
                </Form.Group>
              </div>
              <div className="row justify-content-around">
                <Form.Group className="mb-3 col">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    className="form-control form-control-sm  forminputfield "
                    type="text"
                    placeholder={email}
                    autoComplete="off"
                    value={newemail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div class="input-group ">
                    <Form.Control
                      name="password"
                      className="form-control form-control-sm forminputfield "
                      type="password"
                      value={newpwd}
                      onChange={(e) => {
                        setNewPwd(e.target.value);
                      }}
                    />
                  </div>
                </Form.Group>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewBox;
