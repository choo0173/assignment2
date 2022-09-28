import userService from "../service/user.service";
import AdminHeader from "../components/AdminHeader";
import ViewBox from "../components/ViewBox";
import { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader";

function Profile() {
  const [groupAdmin, setGroupAdmin] = useState("");

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

  return (
    <>
      {!groupAdmin ? <UserHeader /> : <AdminHeader />}
      <ViewBox />
    </>
  );
}
export default Profile;
