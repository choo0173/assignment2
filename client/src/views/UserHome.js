import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import TaskCard from "../components/TaskCard";
import GridCard from "../components/GridCard";
import UserHeader from "../components/UserHeader";
import userService from "../service/user.service";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddAppModal from "../components/AddAppModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function UserHome() {
  const [groupAdmin, setGroupAdmin] = useState("");
  const [showAddAppModal, setShowAddAppModal] = useState(false);
  const [showAppList, setAppList] = useState([]);

  const [updateSave, setUpdateSave] = useState(false);
  const [showIsAdmin, setIsPAdmin] = useState("");
  const [showIsPPl, setIsPPl] = useState("");

  let username = sessionStorage.getItem("username");

  const checkGroupData = {
    userName: username,
    groupName: "Admin"
  };

  useEffect(() => {
    userService.checkGroup(checkGroupData).then((response) => {
      console.log(response);
      setGroupAdmin(response);
    });
  }, []);

  // Display Applications
  useEffect(() => {
    fetchApps();
  }, [updateSave]);

  // API call for fetching applications
  const fetchApps = () => {
    userService.viewApps().then((response) => {
      setAppList(
        response.map((app) => {
          return app;
        })
      );
    });
  };

  useEffect(() => {
    userService
      .checkGroupFunction({
        userName: username,
        groupName: "Admin"
      })
      .then((response) => {
        setIsPAdmin(response.result);
      });
    userService
      .checkGroupFunction({
        userName: username,
        groupName: "ProjectLead"
      })
      .then((response) => {
        setIsPPl(response.result);
      });
  }, []);

  const handleClose = () => {
    setShowAddAppModal(false);
    fetchApps();
  };
  return (
    <>
      {!groupAdmin ? <UserHeader /> : <AdminHeader />}

      <div className="px-5 pt-2">
        <div className="row justify-content-between py-3">
          <div className="row align-items-center">
            <h5 className="px-4 color3">Welcome, {username}</h5>
          </div>
          <div className="col-1">
            {showIsAdmin === true || showIsPPl === true ? (
              <>
                <Button
                  className="btnfont btn-success "
                  onClick={() => setShowAddAppModal(true)}
                  // disabled={true}
                >
                  Create App +
                </Button>
                <AddAppModal show={showAddAppModal} close={handleClose} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="px-5 ">
        <Row md={3}>
          {/* <GridCard fetchApps={fetchApps} /> */}
          {/* <TaskCard /> - working*/}
          {/* {showAppList.length != 0 && <GridCard appList={showAppList} />} */}

          {showAppList.map((app, key) => (
            <Col xs={1} className="pt-3">
              <GridCard
                app={app}
                key={app.applicationAcronym}
                isAdminPermit={showIsAdmin}
                isProjectLeadPermit={showIsPPl}
                mykey={key}
                setUpdateSave={setUpdateSave}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default UserHome;
