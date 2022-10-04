import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Navigate, useNavigate, Link } from "react-router-dom";
import ViewAppModal from "./ViewAppModal";
import KanbanBoard from "../views/KanbanBoard";

function GridCard(props) {
  // let navigate = useNavigate();
  const [showViewAppModal, setShowViewAppModal] = useState(false);
  const [updateSave, setUpdateSave] = useState(false);
  const styleheaderObj = {
    fontSize: "18px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  };
  const styletextObj = {
    display: "block",
    width: "120px",
    height: "18px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "14px",
    fontWeight: "380"
  };
  return (
    <Card key={props.mykey}>
      <Card.Body>
        <Card.Title style={styleheaderObj}>
          {props.app.applicationAcronym}
          <Button
            title="Expand"
            delay={{ show: 10, hide: 400 }}
            size="sm"
            variant="light"
            style={{ float: "right" }}
            onClick={() => setShowViewAppModal(true)}
          >
            <FontAwesomeIcon icon="fa-solid fa-maximize" color="grey" />
          </Button>
          <ViewAppModal
            key={props.key}
            show={showViewAppModal}
            close={() => setShowViewAppModal(false)}
            id={props.app.applicationAcronym}
            appDetails={props.app}
            setUpdateSave={props.setUpdateSave}
            isAdminPermit={props.isAdminPermit}
            isProjectLeadPermit={props.isProjectLeadPermit}
          />
        </Card.Title>

        <Card.Text style={styletextObj}>{props.app.applicationDesc}</Card.Text>
        <Link to={`/kanbanboard/${props.app.applicationAcronym}`}>
          <Button
            variant="primary"
            style={{ float: "right" }}
            // onClick={
            //   (() =>
            //     setTimeout(
            //       // () => `/kanbanboard/${props.app.applicationAcronym}`
            //       // () => this.Link
            //     ),
            //   300)
            // }
          >
            View More <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default GridCard;

// style={styletextObj}
// {props.appList.map((app) => {}
