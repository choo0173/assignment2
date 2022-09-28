import { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Profile from "./views/Profile";
import UserHome from "./views/UserHome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import EditBox from "./components/EditBox";
import ViewBox from "./components/ViewBox";
import GroupManagment from "./views/GroupManagement";
import UserManagment from "./views/UserManagement";
import InvalidPage from "./views/InvalidPage";

library.add(faUser, faLock);

function App() {
  // const [token, setToken] = useState(sessionStorage.getItem("accessToken"));

  // if (!token) {
  //   return (
  //     <>
  //       <BrowserRouter>
  //         <Routes>
  //           <Route
  //             path="/"
  //             element={
  //               <Login
  //               //  setToken={setToken}
  //               />
  //             }
  //           />
  //         </Routes>
  //       </BrowserRouter>
  //       {/* <Login setToken={setToken} /> */}
  //     </>
  //   );
  // } else {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
              // setToken={setToken}
              />
            }
          />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editbox" element={<EditBox />} />
          <Route path="/viewbox" element={<ViewBox />} />
          <Route path="/groupmanagement" element={<GroupManagment />} />
          <Route path="/usermanagement" element={<UserManagment />} />
          <Route path="*" element={<InvalidPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// }

export default App;
