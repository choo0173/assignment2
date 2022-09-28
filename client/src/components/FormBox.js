import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userService from "../service/user.service";
import axios from "axios";
import { toast } from "react-toastify";

function FormBox(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [errormsg, setErrormsg] = useState(false);
  const [message, setMsg] = useState("");

  const authUser = async (event) => {
    event.preventDefault();
    console.log("Hello submit");

    const data = {
      userName: username,
      userPwd: pwd
    };
    axios.post("http://localhost:3001/loginUser", data).then((response) => {
      console.log(response.data);
      notify(
        response.data.isUsername,
        response.data.isPassword,
        response.data.bmessage
      );
      if (response.data.error) {
        alert(response.data.error);
      } else if (response.data.bmessage) {
        setErrormsg(true);
        setMsg(response.data.bmessage);
      } else {
        sessionStorage.setItem("acccessToken", response.data);
        props.setToken(response.data);
        sessionStorage.setItem("username", username);
        navigate("/userHome");
      }
    });
  };
  const notify = (isUsername, isPassword, bmessage) => {
    if (
      (isUsername === "success" && isPassword === "fail") ||
      (isUsername === "fail" && isPassword === "fail")
    ) {
      toast.error(bmessage, {});
    }
  };

  return (
    <>
      <div className="p-5  ">
        <div className="border border-dark rounded  ">
          <Form className="container p-3  ">
            <div className="col  ">
              <h2 className="row  justify-content-center formboxheader mb-3">
                Login
              </h2>
              <Form.Group className="iconinputfield mb-3">
                <Form.Label className="formlabel">Username</Form.Label>
                <div className="input-group ">
                  <span className="input-group-addon ">
                    <FontAwesomeIcon
                      className="formicon"
                      icon="fas fa-user-circle"
                    />
                  </span>
                  <Form.Control
                    name="username"
                    className="form-control form-control-sm  forminputfield mx-3"
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
              </Form.Group>

              <Form.Group
                className="iconinputfield mb-5"
                controlId="formBasicPassword"
              >
                <Form.Label class="formlabel">Password</Form.Label>
                <div className="iconinput">
                  <span className="input-group-addon">
                    <FontAwesomeIcon className="formicon" icon="fas fa-lock" />
                  </span>
                  <Form.Control
                    name="pwd"
                    className="form-control form-control-sm forminputfield mx-3"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                  />
                </div>
              </Form.Group>
              <div class="row justify-content-center ">
                <Button onClick={authUser}>Sign In</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default FormBox;
