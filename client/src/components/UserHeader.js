import React from "react";
import { Link, useNavigate } from "react-router-dom";

function UserHeader() {
  const navigate = useNavigate();

  function signOut() {
    sessionStorage.clear();
    navigate("/");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 pt-3">
        <div className="container-fluid">
          <h4 className="navbar-brand ">
            <Link to="/userHome" className="text-primary">
              TMS
            </Link>
          </h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <form className="d-flex">
            <button className="btn ">
              <Link to="/profile" className=" nav-link">
                <i className="fas fa-user-circle fa-2x"></i>
              </Link>
              {/* <FontAwesomeIcon className="formicon" icon="fas fa-user-circle" /> */}
            </button>
            <button className="btn btn-outline-primary" onClick={signOut}>
              Sign Out
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}

export default UserHeader;
