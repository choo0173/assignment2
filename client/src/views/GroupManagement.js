import React, { useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ViewTable from "../components/ViewTable";
import userService from "../service/user.service";
import { toast } from "react-toastify";

function GroupManagment() {
  const [GroupList, setGroupList] = useState([]);
  const [Groups, setGroups] = useState("");

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    fetchGroups();
    setGroups("");
  };
  const handleShow = () => setShow(true);

  // Display Groups
  useEffect(() => {
    fetchGroups();
  }, []);

  // Function to display groups
  const fetchGroups = () => {
    userService.viewGroup().then((response) => {
      setGroupList(
        response.map((group) => {
          return group;
        })
      );
    });
  };

  function handleCreateGroup(e) {
    e.preventDefault();

    const groupCreate = {
      groupName: Groups
    };

    userService.createGroup(groupCreate).then((response) => {
      notify(response.isGroup, response.bmessage);
      console.log(response);
      if (response.data.result == true) {
        setGroups("");
      } else {
        console.log("Stop");
      }
    });
  }

  const notify = (isGroup, bmessage) => {
    if (isGroup === "fail") {
      toast.info(bmessage, {});
    }
    if (isGroup === "success") {
      toast.success(bmessage, {});
    }
  };

  return (
    <>
      <AdminHeader />

      <div class="px-5 pt-2  ">
        <div class="row justify-content-between py-3">
          <div className="row align-items-center">
            <div className="px-4">List of Groups</div>
            {/* Search Function */}
            {/* <div class="col-7 input-group rounded ">
              <input
                type="search"
                class="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
              </span>
            </div> */}
          </div>
          <div class="col-1">
            <Button className="btnfont btn-success" onClick={handleShow}>
              Add +
            </Button>
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton={true}>
                <Modal.Title class="formboxheader">Create Group</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="container p-3  ">
                  <div className="row justify-content-around">
                    <Form.Group className="mb-3 col">
                      <Form.Label>Group Name</Form.Label>
                      <Form.Control
                        name="group"
                        className="form-control form-control-sm  forminputfield "
                        type="text"
                        placeholder="Group"
                        autoComplete="off"
                        onChange={(e) => {
                          setGroups(e.target.value);
                        }}
                        value={Groups}
                      />
                    </Form.Group>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Back
                </Button>
                <Button variant="success" onClick={handleCreateGroup}>
                  Create
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        {GroupList.length != 0 && (
          <div class="border border-dark rounded  container p-3 scrollable-div">
            <ViewTable tableList={GroupList} />
          </div>
        )}
      </div>
    </>
  );
}

export default GroupManagment;
