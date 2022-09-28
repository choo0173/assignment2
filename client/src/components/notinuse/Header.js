import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function authUser() {
    navigate("/UserHome");
  }
  return (
    <>
      <header className="header-bar bg-light mb-3 px-4 pt-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <Link to="/" className="text-primary">
              TMS
            </Link>
          </h4>
          {/* <form className="mb-0 pt-2 pt-md-0">
            <div className="row align-items-center">
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input
                  name="username"
                  className="form-control form-control-sm input-dark"
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                />
              </div>
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input
                  name="password"
                  className="form-control form-control-sm input-dark"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="col-md-auto">
                <button className="btn btn-success btn-sm" onClick={authUser}>
                  Sign In
                </button>
              </div>
            </div>
          </form> */}
        </div>
      </header>
    </>
  );
}

export default Header;
