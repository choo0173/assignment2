import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function EditBox() {
  const navigate = useNavigate();

  function updateProfile() {
    navigate("/viewbox");
  }
  return (
    <>
      <div className="px-5 pt-2  ">
        <div className="row justify-content-between py-3">
          <div className="col-2">Profile Details</div>
          <div className="col-1">
            <Button className="btn-success btnfont" onClick={updateProfile}>
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
                />
              </Form.Group>
              <Form.Group className="mb-3 col">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  name="status"
                  className="form-control form-control-sm  forminputfield "
                  type="text"
                  placeholder="Status"
                  autoComplete="off"
                />
              </Form.Group>
            </div>
            <div className="row justify-content-around">
              <Form.Group className="mb-3 col" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div class="input-group ">
                  <Form.Control
                    name="password"
                    className="form-control form-control-sm forminputfield "
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3 col">
                <Form.Label>Groups</Form.Label>
                <Form.Control
                  name="groups"
                  className="form-control form-control-sm  forminputfield "
                  type="text"
                  placeholder="Groups"
                  autoComplete="off"
                />
              </Form.Group>
            </div>
            <div className="row justify-content-left">
              <Form.Group className="mb-3 col">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  className="form-control form-control-sm  forminputfield "
                  type="text"
                  placeholder="Email"
                  autoComplete="off"
                />
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditBox;
