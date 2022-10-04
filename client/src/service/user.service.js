import axios from "axios";
import { localStorage, useState } from "react";
const API_URL = "http://localhost:3001/";

class UserService {
  createUser(userinfo) {
    return axios.post(API_URL + "createUser", userinfo).then((res) => {
      return res.data;
    });
  }

  viewUser() {
    return axios.get(API_URL + "viewUser").then((res) => {
      return res.data;
    });
  }

  viewOneUser(user) {
    return axios.post(API_URL + "viewOneUser", user).then((res) => {
      return res.data;
    });
  }

  loginUser(data) {
    return axios.post(API_URL + "loginUser", data).then((res) => {
      return res.data;
    });
  }

  updateUserProfile(data) {
    return axios.post(API_URL + "updateUserProfile", data).then((res) => {
      return res.data;
    });
  }

  updateAdminProfile(data) {
    return axios.post(API_URL + "updateAdminProfile", data).then((res) => {
      return res.data;
    });
  }

  createGroup(groupinfo) {
    return axios.post(API_URL + "createGroup", groupinfo).then((res) => {
      return res.data;
    });
  }

  viewGroup() {
    return axios.get(API_URL + "viewGroup").then((res) => {
      return res.data;
    });
  }

  viewUserGroupname() {
    return axios.get(API_URL + "viewUserGroupname").then((res) => {
      return res.data;
    });
  }

  // Assignment 2
  createApp(appinfo) {
    return axios.post(API_URL + "createApp", appinfo).then((res) => {
      return res.data;
    });
  }

  viewApps() {
    return axios.get(API_URL + "viewApps").then((res) => {
      return res.data;
    });
  }

  updateApp(updateAppInfo) {
    return axios.post(API_URL + "updateApp", updateAppInfo).then((res) => {
      return res.data;
    });
  }

  createPlan(planinfo) {
    return axios.post(API_URL + "createPlan", planinfo).then((res) => {
      return res.data;
    });
  }

  viewPlans(planInfo) {
    return axios.post(API_URL + "viewPlans", planInfo).then((res) => {
      return res.data;
    });
  }

  viewPlanColor(planColor) {
    return axios.post(API_URL + "viewPlanColor", planColor).then((res) => {
      return res.data;
    });
  }

  createTask(taskinfo) {
    return axios.post(API_URL + "createTask", taskinfo).then((res) => {
      return res.data;
    });
  }
  createTaskA3(taskinfo) {
    return axios.post(API_URL + "createTaskA3", taskinfo).then((res) => {
      return res.data;
    });
  }

  viewTasks(taskInfo) {
    return axios.post(API_URL + "viewTasks", taskInfo).then((res) => {
      return res.data;
    });
  }

  countTasksbyApp(taskInfo) {
    return axios.post(API_URL + "countTasksbyApp", taskInfo).then((res) => {
      return res.data;
    });
  }

  viewOneApps(appInfo) {
    return axios.post(API_URL + "viewOneApps", appInfo).then((res) => {
      return res.data;
    });
  }

  // updateTaskPlan(updateTaskPlanInfo) {
  //   return axios
  //     .post(API_URL + "updateTaskPlan", updateTaskPlanInfo)
  //     .then((res) => {
  //       return res.data;
  //     });
  // }

  // updateTaskNotes(updateTaskNotesInfo) {
  //   return axios
  //     .post(API_URL + "updateTaskNotes", updateTaskNotesInfo)
  //     .then((res) => {
  //       return res.data;
  //     });
  // }

  updateTask(updateTaskInfo) {
    return axios.post(API_URL + "updateTask", updateTaskInfo).then((res) => {
      return res.data;
    });
  }

  updateTaskState(updateTaskStateInfo) {
    return axios
      .post(API_URL + "updateTaskState", updateTaskStateInfo)
      .then((res) => {
        return res.data;
      });
  }

  updateTaskStateNotes(updateTaskStateNotesInfo) {
    return axios
      .post(API_URL + "updateTaskStateNotes", updateTaskStateNotesInfo)
      .then((res) => {
        return res.data;
      });
  }

  checkGroup(data) {
    return axios.post(API_URL + "checkGroup", data).then((res) => {
      return res.data;
    });
  }

  checkAppPermits(data) {
    return axios.post(API_URL + "checkAppPermits", data).then((res) => {
      return res.data;
    });
  }

  checkGroupFunction(userName, groupName) {
    return axios
      .post(API_URL + "checkGroupFunction", userName, groupName)
      .then((res) => {
        return res.data;
      });
  }
  sendEmail(email) {
    console.log("email", email);
    return axios.post(API_URL + "allUserEmail", email).then((res) => {
      return res.data;
    });
  }
}

export default new UserService();
