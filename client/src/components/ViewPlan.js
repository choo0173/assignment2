import React, { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function ViewPlan(props) {
  return (
    <>
      <div className="row justify-content-md-center my-3 px-5">
        <Col className="mx-2">
          <h5>Plans:</h5>
        </Col>
        {props.planList.map((plan) => {
          const styleObj = {
            display: "inline-block",
            width: "150px",
            textAlign: "center",
            fontSize: "0.8em",
            padding: "0.3em",
            borderRadius: "0.2rem",

            backgroundColor: plan.planColor,
            // backgroundColor: "#E0E0DF",
            color: "black"
          };

          return (
            <div className="row justify-content-md-center ">
              <Col className="mx-1">
                <h5>
                  <span style={styleObj}>{plan.planMVPName}</span>
                </h5>
              </Col>
            </div>
          );
        })}{" "}
      </div>
    </>
  );
}

export default ViewPlan;
