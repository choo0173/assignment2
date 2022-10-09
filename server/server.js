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
const user_model = require("./model/user.model");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//middleware to access logged in user
app.use((req, res, next) => {
  // res.locals.currentUser = req.user;
  req.user = "Logged in user";
  res.setHeader("Content-Type", "application/json");
  // res.setHeader("Accept", "application/json");

  //Decoding URL
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    //Decode fails if url not encoded properly
    return res.status(400).send({ code: 400 });
  }
  next();
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
app.post("/createTaskA3", controller.createTaskA3);
app.post("/viewTasks", controller.viewTasks);
app.post("/updateTask", controller.updateTask);
// app.post("/updateTaskState", controller.updateTaskState);
app.post("/updateTaskStateNotes", controller.updateTaskStateNotes);
app.post("/countTasksbyApp", controller.countTasksbyApp);
app.post("/checkAppPermits", controller.checkAppPermits);
app.post("/checkGroupFunction", controller.checkGroupFunction);
app.post("/allUserEmail", user_model.getAllUserEmail);

// Assignment 3
app.post(
  "/api/CreateTask",
  [controller.checkLogin, controller.checkCreatePermit],
  controller.CreateTask
);
app.post(
  "/api/GetTaskByState",
  [controller.checkLogin],
  controller.GetTaskByState
);
app.post(
  "/api/PromoteTask2Done",
  [controller.checkLogin, controller.checkPromotePermit],
  controller.PromoteTask2Done
);

app.post("/api/*", controller.error);
