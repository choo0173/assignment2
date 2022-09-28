import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams
} from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Profile from "./views/Profile";
import UserHome from "./views/UserHome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faUser,
  faChevronLeft,
  faChevronRight,
  faMaximize,
  faWindowMaximize,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";

import EditBox from "./components/EditBox";
import ViewBox from "./components/ViewBox";
import GroupManagment from "./views/GroupManagement";
import UserManagment from "./views/UserManagement";
import InvalidPage from "./views/InvalidPage";
import LoginRoute from "./service/login.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KanbanBoard from "./views/KanbanBoard";

library.add(
  faUser,
  faLock,
  faChevronLeft,
  faChevronRight,
  faMaximize,
  faPenToSquare
);

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("accessToken"));

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<LoginRoute />}>
            <Route path="/userHome" element={<UserHome />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editbox" element={<EditBox />} />
            <Route path="/viewbox" element={<ViewBox />} />
            <Route path="/groupmanagement" element={<GroupManagment />} />
            <Route path="/usermanagement" element={<UserManagment />} />
            {/* <Route path="/kanbanboard" element={<KanbanBoard />} /> */}
            <Route path="/kanbanboard/:appName" element={<KanbanBoard />} />
          </Route>

          {/* <Route path="/" element={<Login setToken={setToken} />} /> */}
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="*" element={<InvalidPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
