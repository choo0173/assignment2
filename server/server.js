const exp = require("express");
const crs = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
// const { check, validationResult } = require("express-validator");
const app = exp();
app.use(crs());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const controller = require("./controller/user.controller");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// User
app.post("/createUser", controller.createUser);
app.get("/viewUser", controller.viewUser);
app.post("/viewOneUser", controller.viewOneUser);
app.post("/loginUser", controller.loginUser);
app.post("/updateUserProfile", controller.updateUserProfile);
app.post("/updateAdminProfile", controller.updateAdminProfile);

// Admin
app.get("/viewUserGroupname", controller.viewUserGroupname);
app.post("/createGroup", controller.createGroup);
app.get("/viewGroup", controller.viewGroup);
app.post("/checkGroup", controller.checkGroup);

// Assignment 2
app.post("/createApp", controller.createApp);
app.get("/viewApps", controller.viewApps);
app.post("/viewOneApps", controller.viewOneApps);
app.post("/updateApp", controller.updateApp);
app.post("/createPlan", controller.createPlan);
app.post("/viewPlans", controller.viewPlans);
app.post("/viewPlanColor", controller.viewPlanColor);
app.post("/createTask", controller.createTask);
app.post("/viewTasks", controller.viewTasks);
app.post("/updateTask", controller.updateTask);
app.post("/updateTaskState", controller.updateTaskState);
app.post("/updateTaskStateNotes", controller.updateTaskStateNotes);
app.post("/countTasksbyApp", controller.countTasksbyApp);
