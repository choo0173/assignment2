const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const usermodel = require("../model/user.model");
const { sign } = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { validateToken } = require("../middleware/AuthMiddleware");
const { response } = require("express");

// =============== Regex ==============
// const checkUsername = new RegExp()
function checkUserName(value) {
  const regexUserName = /^[\w\S\d]{3,20}$/m;
  // return value.test(regexUserName);
  return regexUserName.test(value);
}
function checkPassword(value) {
  // const regexPassword = /^[\w\s\d!@#$%^&*(),.?":{}|<>]{8,10}$/m;
  const regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,11}$/m;
  // return value.test(regexPassword);
  return regexPassword.test(value);
}
function checkAdminPassword(value) {
  // const regexPassword = /^[\w\s\d!@#$%^&*(),.?":{}|<>]{8,10}$/m;
  const regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,11}$/m;
  // return value.test(regexPassword);
  return regexPassword.test(value);
}
function checkEmail(value) {
  const regexEmail = /^[\w\d]+@+[\w\d]+(.com)$/m;
  return regexEmail.test(value);
}
function checkAdminEmail(value) {
  const regexEmail = /^[\w\d]+@+[\w\d]+(.com)$/m;
  return regexEmail.test(value);
}
function checkSpacing(value) {
  const regexSpacing = /^\S{1,}$/m;
  return regexSpacing.test(value);
}
// =============== User ===============
// Create User
// const createUser = async (req, res) => {
//   req.body.userPwd = await bcrypt.hash(req.body.userPwd, 10);
//   usermodel.createUser(req.body, (err, data) => {
//     if (err) {
//       res.send({ result: false, message: err.sqlMessage });
//       // res.send(data);
//     } else {
//       res.send(data);
//     }
//   });
// };

const createUser = async (req, res) => {
  var error_msg = {
    username: false,
    password: false,
    email: false,
    duplicate: false,
    create: false
  };
  if (!checkSpacing(req.body.userName) || !checkUserName(req.body.userName)) {
    error_msg.username = "Please enter a valid username";
  }
  if (!checkPassword(req.body.userPwd)) {
    error_msg.password = "Please enter a valid password";
  }
  if (!checkEmail(req.body.userEmail)) {
    // res.send({ inputstatus: "fail", message: "Please enter a valid email" });
    error_msg.email = "Please enter a valid email";
  }
  if (
    error_msg.username ||
    error_msg.password ||
    error_msg.email
    // error_msg.duplicate
  ) {
    return res.send(error_msg);
  } else {
    req.body.userPwd = await bcrypt.hash(req.body.userPwd, 10);
    usermodel.createUser(req.body, async (err, data) => {
      if (err) {
        // res.send({ duplicate: true });
        error_msg.duplicate = "User Exists";
        return res.send(error_msg);
        // console.log(error_msg);
      } else {
        error_msg.create = "User Created";

        res.send(error_msg);
      }
    });
  }
};

// View/Read Users
const viewUser = (req, res) => {
  usermodel.viewUser(req, (err, data) => {
    if (err) {
      res.send(data);
    } else {
      res.send(data);
    }
  });
};

// View/Read One User
const viewOneUser = async (req, res) => {
  usermodel.viewOneUser(req.body, (err, data) => {
    if (err) {
      res.send(err, { message: err.sqlMessage });
    } else {
      res.send(data);
    }
  });
};

//Login User - Makes use of viewOneUser query in model
const loginUser = async (req, res) => {
  let loginusername = req.body.userName;
  let loginuserpwd = req.body.userPwd;
  // console.log(req.body.userName);
  if (
    !checkUserName(req.body.userName) ||
    !checkPassword(req.body.userPwd) ||
    !loginusername ||
    !loginuserpwd
  ) {
    res.send({
      isUsername: "fail",
      isPassword: "fail",
      bmessage: "Invalid Username or Password"
    });
    // console.log(res.send);
  } else if (
    checkUserName(req.body.userName) &&
    checkPassword(req.body.userPwd)
  ) {
    usermodel.viewOneUser(req.body, (err, data) => {
      // console.log("login", data);
      if (err) {
        // console.log(error);
        res.send({ message: err.sqlMessage, result: null });
        // return;
      } else if (data.resultlength === 0) {
        // console.log(data.resultlength);
        // res.send({ message: "User does not exists" });
        res.send({
          isUsername: "success",
          isPassword: "fail",
          bmessage: "Invalid Username or Password"
        });
      } else {
        parseddata = JSON.parse(JSON.stringify(data));
        // parseddata = JSON.parse(data);

        userstatus = parseddata.result[0].userStatus;
        hashedPwd = parseddata.result[0].userPwd;

        bcrypt.compare(req.body.userPwd, hashedPwd).then(async (match) => {
          if (!match) {
            // res.json({ error: "Invalid Username or Password" });
            res.send({
              isUsername: "success",
              isPassword: "fail",
              bmessage: "Invalid Username or Password"
            });
          } else if (userstatus == "0") {
            res.send({
              isUsername: "success",
              isPassword: "fail",
              bmessage: "Invalid Username or Password"
            });
          } else {
            const accessToken = sign(
              { username: data.userName },
              "importantsecret"
            );
            res.json(accessToken);
          }
        });
      }
    });
  }

  // else console.log("Fail");
};

//Update User Profile
const updateUserProfile = async (req, res) => {
  // console.log(req);

  req.body.userPwd = await bcrypt.hash(req.body.userPwd, 10);
  usermodel.updateUserProfile(req.body, (err, data) => {
    if (err) {
      // res.send(err, { message: "Failed to update profile" });
      res.send(err, {
        inputstatus: "fail",
        message: "Failed to update profile"
      });
    } else {
      // res.send({ message: "Profile updated" });
      res.send({ inputstatus: "success", message: "Profile Updated" });
    }
  });
};

//Update Admin Profile
const updateAdminProfile = async (req, res) => {
  // console.log("What is req.body: ", req.body);
  let adminemail = req.body.userEmail;
  let adminpwd = req.body.userPwd;

  // Both Empty Fields
  if (!adminemail && !adminpwd) {
    res.send({ isUpdateEmail: "fail", isUpdatePwd: "fail" });
    // Empty Email Field but Filled Password Field
  } else if (!adminemail && adminpwd) {
    // Condition (True): Pwd Regex Pass
    if (checkAdminPassword(adminpwd)) {
      req.body.userPwd = await bcrypt.hash(req.body.userPwd, 10);
      usermodel.updatePassword(req.body, (err, data) => {
        if (err) {
          console.log(err);
          // res.send(err, { message: "Failed to update profile" });
          res.send(err, {
            inputstatus: "fail",
            message: "Failed to update profile"
          });
        } else {
          res.send({ isUpdateEmail: "fail", isUpdatePwd: "success" });
        }
      });
      // Condition (False): Pwd Regex Fail
    } else {
      res.send({ regexStatus: "pwdfail", isUpdatePwd: "fail" });
    }
    // Empty Password Field but Filled Email Field
  } else if (adminemail && !adminpwd) {
    {
      // Condition (True): Email Regex Pass
      if (checkAdminEmail(adminemail)) {
        usermodel.updateEmail(req.body, (err, data) => {
          if (err) {
            console.log(err);
            // res.send(err, { message: "Failed to update profile" });
            res.send(err, {
              inputstatus: "fail",
              message: "Failed to update profile"
            });
          } else {
            res.send({ isUpdateEmail: "success", isUpdatePwd: "fail" });
          }
        });
      } // Condition (False): Email Regex Fail
      else {
        res.send({ regexStatus: "emailfail", isUpdateEmail: "fail" });
      }
    }
  } else {
    // Condition (True): Both Regex Pass
    if (checkAdminEmail(adminemail) && checkAdminPassword(adminpwd)) {
      req.body.userPwd = await bcrypt.hash(req.body.userPwd, 10);
      usermodel.updateEmailandPwd(req.body, (err, data) => {
        if (err) {
          console.log(err);
          // res.send(err, { message: "Failed to update profile" });
          res.send(err, {
            inputstatus: "fail",
            message: "Failed to update profile"
          });
        } else {
          res.send({ isUpdateEmail: "success", isUpdatePwd: "success" });
        }
      });
    } else {
      // Condition (True): Both Regex Fail
      if (!checkAdminEmail(adminemail) && !checkAdminPassword(adminpwd)) {
        res.send({
          regexStatus: "fail",
          isUpdatePwd: "fail",
          isUpdateEmail: "fail"
        });
        // Condition (True): Email Regex Fail
      } else if (!checkAdminEmail(adminemail) && checkAdminPassword(adminpwd)) {
        req.body.userPwd = await bcrypt.hash(req.body.userPwd, 10);
        usermodel.updatePassword(req.body, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.send({
              regexStatus: "fail",
              isUpdatePwd: "success",
              isUpdateEmail: "fail"
            });
          }
        });

        // Condition (True): Password Regex Fail
      } else {
        if (checkAdminEmail(adminemail) && !checkAdminPassword(adminpwd)) {
          if (checkAdminEmail(adminemail)) {
            usermodel.updateEmail(req.body, (err, data) => {
              if (err) {
                // console.log(err);
                // res.send(err, { message: "Failed to update profile" });
                res.send(err, {
                  inputstatus: "fail",
                  message: "Failed to update profile"
                });
              } else {
                res.send({ isUpdateEmail: "success", isUpdatePwd: "fail" });
              }
            });
          } // Condition (False): Email Regex Fail
          else {
            res.send({
              regexStatus: "fail",
              isUpdatePwd: "success",
              isUpdateEmail: "fail"
            });
          }
        }
      }
    }
  }

  /* res.send({ regexStatus: regexStatus, isUpdatePwd: isUpdatePwd, isUpdateEmail: isUpdateEmail, inputstatus: ,  message: message,}) */
  // else {
  //   if (!checkPassword(req.body.userPwd) || !checkEmail(req.body.userEmail)) {
  //     if (!checkPassword(req.body.userPwd)) {
  //       res.send({
  //         regexStatus: "fail",
  //         message: "Please enter a valid password"
  //       });
  //     }
  //     if (!checkEmail(req.body.userEmail)) {
  //       res.send({
  //         regexStatus: "fail",
  //         message: "Please enter a valid email"
  //       });
  //     }
  //   } else if (
  //     checkPassword(req.body.userPwd) &&
  //     checkEmail(req.body.userEmail)
  //   ) {
  //     req.body.userPwd = await bcrypt.hash(req.body.userPwd, 10);
  //     usermodel.updateEmailandPwd(req.body, (err, data) => {
  //       if (err) {
  //         console.log(err);
  //         res.send(err, {
  //           inputstatus: "fail",
  //           message: "Failed to update profile"
  //         });
  //       } else {
  //         res.send({ isUpdateEmail: "success", isUpdatePwd: "success" });
  //       }
  //     });
  //   }
  // }

  // !adminemail && adminpwd

  // adminemail && !adminpwd
  // checkAdminEmail(adminemail)
  // True: Query; Depend on if checkAdminEmail(adminemail) return true
  // False: res.send

  // adminemail && adminpwd
  // checkAdminPassword(adminpwd) && checkAdminEmail(adminemail)

  // Pwd && Email -updateEmailandPwd

  // !Pwd && Email - updateEmail
  // Pwd && !Email - updatePassword
  // !Pwd && ! Email - res.send
  // usermodel.updateAdminProfile(req.body, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     // res.send(err, { message: "Failed to update profile" });
  //     res.send(err, {
  //       inputstatus: "fail",
  //       message: "Failed to update profile"
  //     });
  //   } else {
  //     // console.log(res);
  //     // res.send({ message: "Profile updated" });
  //     res.send({ inputstatus: "success", message: "Profile Updated" });
  //   }
  // });
};

// =============== Group ===============
// Create Group

const createGroup = async (req, res) => {
  // console.log(req.body);
  if (checkSpacing(req.body.groupName) === true) {
    console.log(checkSpacing(req.body.groupName));
    usermodel.createGroup(req.body, (err, data) => {
      if (err) {
        if (err.errno == 1062) {
          res.send({ isGroup: "fail", bmessage: "Group Exists" });
        } else {
          res.send({ message: "Error" });
        }
      } else {
        res.send({ isGroup: "success", bmessage: "Group Created", data });
      }
    });
  } else {
    res.send({ isGroup: "fail", bmessage: "Invalid Group Name" });
  }
};

// View/Read Groups
const viewGroup = (req, res) => {
  usermodel.viewGroup(req, (err, data) => {
    if (err) {
      res.send(data);
    } else if (data.resultlength == 0) {
      res.send({ message: "No records found." });
    } else {
      res.send(data.result);
    }
  });
};

// View groups of all users
const viewUserGroupname = (req, res) => {
  usermodel.viewUserGroupname(req, (err, data) => {
    if (err) {
      res.send(data);
    } else if (data.resultlength == 0) {
      res.send({ message: "No records found." });
    } else {
      res.send(data.result);
    }
  });
};

// =============== Assignment 2 =============
// Create App
const createApp = async (req, res) => {
  var error_msg = {
    duplicate: false,
    create: false,
    mandatory: false
  };
  if (
    !req.body.applicationAcronym ||
    !req.body.applicationRnum ||
    !req.body.applicationStart ||
    !req.body.applicationEnd ||
    !req.body.applicationPOpen ||
    !req.body.applicationPCreate ||
    !req.body.applicationPTodo ||
    !req.body.applicationPDoing ||
    !req.body.applicationPDone
  ) {
    error_msg.mandatory = "Fill in all mandatory fields";
    return res.send(error_msg);
  } else {
    usermodel.createApp(req.body, async (err, data) => {
      if (err) {
        // res.send({ duplicate: true });
        error_msg.duplicate = "Application Exists";
        return res.send(error_msg);
        // console.log(error_msg);

        console.log("error boo");
      } else {
        error_msg.create = "Application Created";
        console.log("app created yay");

        // res.send(data);
        // console.log(data);
        res.send(error_msg);
      }
      // return res.send(error_msg);
    });
  }

  // }
};

// View/Read Applications
const viewApps = (req, res) => {
  usermodel.viewApps(req, (err, data) => {
    if (err) {
      res.send(data);
    } else {
      res.send(data);
    }
  });
};

// View One App
const viewOneApps = async (req, res) => {
  usermodel.viewOneApps(req.body, (err, data) => {
    if (err) {
      res.send(err, { message: err.sqlMessage });
    } else {
      console.log("one appppp data");
      // console.log(data);
      res.send(data);
    }
  });
};

//   applicationStart= '${req.applicationStart}', applicationEnd= '${req.applicationEnd}' ,applicationPCreate= '${req.applicationPCreate}', applicationPOpen= '${req.applicationPOpen}', applicationPTodo= '${req.applicationPTodo}',
// applicationPDoing= '${req.applicationPDoing}',applicationPDone= '${req.applicationPDone}'
//Update Application
const updateApp = async (req, res) => {
  // console.log(req.body);
  var error_msg = {
    update: false
  };
  await usermodel.updateApp(req.body, (err, data) => {
    if (err) {
      error_msg.update = "Application not updated";
      console.log(err);
      return res.send(error_msg);
    } else {
      error_msg.update = "Application Updated";
      res.send(error_msg);
    }
  });
};

// Create Plan
const createPlan = async (req, res) => {
  var error_msg = {
    mandatory: false,
    duplicate: false,
    create: false
  };
  if (!req.body.planMVPName || !req.body.planStart || !req.body.planEnd) {
    error_msg.mandatory = "Fill in all mandatory fields";
    return res.send(error_msg);
  } else {
    usermodel.createPlan(req.body, async (err, data) => {
      if (err) {
        // res.send({ duplicate: true });
        error_msg.duplicate = "Plan Exists";
        return res.send(error_msg);

        console.log("error boo");
      } else {
        error_msg.create = "Plan Created";
        console.log("plan created yay");
        res.send(error_msg);
        // res.send(data);
      }
    });
  }
};

// View/Read Plans
const viewPlans = (req, res) => {
  usermodel.viewPlans(req.body, (err, data) => {
    // console.log(req.body);
    if (err) {
      res.send(data);
    } else {
      res.send(data);
    }
  });
};

// View/Read Plan Color
const viewPlanColor = (req, res) => {
  usermodel.viewPlanColor(req.body, (err, data) => {
    // console.log(data.planColor);
    if (err) {
      res.send(data);
    } else {
      res.send(data[0].planColor);
    }
  });
};

// Create Task - A2
const createTask = async (req, res) => {
  console.log(req.body);
  var error_msg = {
    mandatory: false,
    duplicate: false,
    create: false
  };
  if (!req.body.taskName) {
    error_msg.mandatory = "Fill in all mandatory fields";
    return res.send(error_msg);
  } else {
    usermodel.createTask(req.body, async (err, data) => {
      // console.log("askdoap");
      // console.log(req.body);
      if (err) {
        // res.send({ duplicate: true });
        error_msg.duplicate = "Task Exists";
        console.log(err);
        return res.send(error_msg);
        // console.log(error_msg);

        console.log("error boo");
      } else {
        error_msg.create = "Task Created";
        console.log("task created yay");
        // res.send(data);
        res.send(error_msg);
      }
    });
    // }
  }
};

// Create Task 3
const createTaskA3 = async (req, res) => {
  console.log(req.body);
  var error_msg = {
    mandatory: false,
    duplicate: false,
    create: false
  };
  if (!req.body.taskName) {
    error_msg.mandatory = "Fill in all mandatory fields";
    return res.send(error_msg);
  } else {
    usermodel.createTaskA3(req.body, async (err, data) => {
      // console.log("askdoap");
      // console.log(req.body);
      if (err) {
        // res.send({ duplicate: true });
        error_msg.duplicate = "Task Exists";
        console.log(err);
        return res.send(error_msg);
        // console.log(error_msg);

        console.log("error boo");
      } else {
        error_msg.create = "Task Created";
        console.log("task created yay");
        // res.send(data);
        res.send(error_msg);

        const updateInfo = {
          applicationRnumUpdate: req.body.applicationRnum,
          applicationAcronym: req.body.applicationAcronym
        };
        usermodel.updateAppRNUMA3(updateInfo, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("YESSSS");
          }
        });
      }
    });
    // }
  }
};

// View/Read Tasks
const viewTasks = (req, res) => {
  usermodel.viewTasks(req.body, (err, data) => {
    if (err) {
      res.send(data);
    } else {
      res.send(data);
    }
  });
};

// Count tasks by app
const countTasksbyApp = async (req, res) => {
  usermodel.countTasksbyApp(req.body, (err, data) => {
    if (err) {
      res.send(err, { message: err.sqlMessage });
    } else {
      res.send(data);
    }
  });
};

//Update Task - Plan
const updateTaskPlan = async (req, res) => {
  // console.log(req);
  usermodel.updateTaskPlan(req.body, (err, data) => {
    if (err) {
      res.send(err, {
        inputstatus: "fail",
        message: "Failed to update task"
      });
    } else {
      // res.send({ message: "Profile updated" });
      res.send({ inputstatus: "success", message: "Task Updated" });
    }
  });
};

//Update Task - Audittrail(notes)
const updateTaskNotes = async (req, res) => {
  usermodel.updateTaskNotes(req.body, (err, data) => {
    // console.log(req.body);
    if (err) {
      res.send(err, {
        inputstatus: "fail",
        message: "Failed to update notes"
      });
    } else {
      // res.send({ message: "Profile updated" });
      res.send({ inputstatus: "success", message: "Notes Updated" });
    }
  });
};

//Update Task
const updateTask = async (req, res) => {
  console.log(req.body);
  console.log(req.body.taskPlanColor);
  let tasknotes = req.body.taskNotes;
  let taskplanmvpname = req.body.taskPlanMVPName;

  if (!taskplanmvpname && !tasknotes) {
    res.send({ isUpdatePlan: "fail", isUpdateNotes: "fail" });
  } else if (!taskplanmvpname && tasknotes) {
    usermodel.updateTaskNotes(req.body, (err, data) => {
      if (err) {
        res.send(err, {
          inputstatus: "fail",
          message: "Failed to update notes"
        });
      } else {
        res.send({ isUpdatePlan: "fail", isUpdateNotes: "success" });
      }
    });
  }
  // else if (taskplanmvpname && !tasknotes) {
  //   res.send({ isUpdatePlan: "success", isUpdateNotes: "fail" });
  // }
  else {
    // If taskPlanColor is undefined
    if (taskplanmvpname === "none") {
      usermodel.updateTaskPlanNotes(req.body, (err, data) => {
        if (err) {
          res.send(err, {
            inputstatus: "fail",
            message: "Failed to update task"
          });
        } else {
          usermodel.updateTaskPlan(req.body, (err, data) => {
            if (err) {
              res.send(err, {
                inputstatus: "fail",
                message: "Failed to update plan"
              });
            } else {
              res.send({ isUpdatePlan: "success", isUpdateNotes: "success" });
            }
          });
        }
      });
    } else {
      usermodel.viewPlanColor(req.body, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let taskPlanColorr = data[0].planColor;

          const updateinfo = {
            taskPlanColor: taskPlanColorr,
            taskPlanMVPName: req.body.taskPlanMVPName,
            taskOwner: req.body.taskOwner,
            taskAuditNotes: req.body.taskAuditNotes,
            taskDesc: req.body.taskDesc,
            taskId: req.body.taskId,
            taskNotes: req.body.taskNotes
          };
          usermodel.updateTaskPlanNotes(updateinfo, (err, data) => {
            if (err) {
              res.send(err, {
                inputstatus: "fail",
                message: "Failed to update task"
              });
            } else {
              usermodel.updateTaskPlan(updateinfo, (err, data) => {
                if (err) {
                  res.send(err, {
                    inputstatus: "fail",
                    message: "Failed to update plan"
                  });
                } else {
                  res.send({
                    isUpdatePlan: "success",
                    isUpdateNotes: "success"
                  });
                }
              });
            }
          });
        }
      });
    }

    // usermodel.updateTaskPlanNotes(req.body, (err, data) => {
    //   let body = req.body;
    //   if (err) {
    //     res.send(err, {
    //       inputstatus: "fail",
    //       message: "Failed to update task"
    //     });
    //   } else {
    //     usermodel.updateTaskPlan(req.body, (err, data) => {
    //       if (err) {
    //         res.send(err, {
    //           inputstatus: "fail",
    //           message: "Failed to update plan"
    //         });
    //       } else {
    //         res.send({ isUpdatePlan: "success", isUpdateNotes: "success" });
    //       }
    //     });
    //   }
    // });
  }
};

// Update State
// const updateTaskState = async (req, res) => {
//   console.log(req.body);
//   usermodel.updateTaskState(req.body, (err, data) => {
//     if (err) {
//       res.send(err, {
//         isUpdateState: "fail",
//         message: "Failed to update state"
//       });
//     } else {
//       res.send({ isUpdateState: "success", message: "State Updated" });
//     }
//   });
// };

// Update Audit log - promote /demote
const updateTaskStateNotes = async (req, res) => {
  console.log(req.body);
  usermodel.updateTaskStateNotes(req.body, (err, data) => {
    if (err) {
      // res.send(err, {
      //   isUpdateStateNotes: "fail",
      //   message: "Failed to update promote/demote"
      // });
      // res.send(err, null);
      // res.status(err).send(null);
      console.log("errr");
    } else {
      res.send({
        isUpdateStateNotes: "success",
        message: "Task Status in audit log updated"
      });
    }
  });
};

// Check Group
const checkGroup = async (req, res) => {
  // console.log("What is req.body", req.body);
  usermodel.checkGroup(req.body, (err, data) => {
    let dbgroup = data.result.groupName;
    let inputgroup = dbgroup.includes(req.body.groupName);

    if (err) {
      res.send(err, { message: err.sqlMessage });
    } else {
      res.send(inputgroup);
    }
  });
};

// Check group
const checkGroupFunction = ({ userName, groupName }, res) => {
  usermodel.checkGroupFunction(res.req.body, (err, data) => {
    let userName = res.req.body.userName;
    let groupName = res.req.body.groupName;
    // console.log(res.req.body);
    if (err) {
      res.send(err, { message: err.sqlMessage });
    } else {
      res.send(data);
    }
  });
};

// Check app permits
const checkAppPermits = (req, res) => {
  usermodel.checkAppPermits(req.body, (err, data) => {
    if (err) {
      res.send(err, { message: err.sqlMessage });
    } else {
      res.send(data);
    }
  });
};

// ================== Assignment 3 ====================
const CreateTask = async (req, res) => {
  if (!req.body.taskName) {
    // res.status(411).json({ code: 411, message: "Task Name Empty" });
    res.status(411).json({ code: 411 });
  } else if (!req.body.taskAppAcronym) {
    // res.status(411).json({ code: 411, message: "Task App Acronym Empty" });
    res.status(411).json({ code: 411 });
  } else {
    if (req.body.taskPlanMVPName) {
      usermodel.viewPlanbyplan(req.body, (err, dataa) => {
        if (err) {
          console.log(err);
        } else {
          if (dataa.result === null) {
            // res.status(404).json({ code: 404, message: "Task Plan Not Found" });
            res.status(404).json({ code: 404 });
          } else {
            usermodel.CreateTask(req.body, async (err, data) => {
              if (err) {
                if (err.errno === 1062) {
                  res
                    .status(400)
                    // .json({ code: 400, message: "Duplicate Task" });
                    .json({ code: 400 });
                }
              } else {
                console.log(data);
                if (data.statuse === false) {
                  res
                    .status(404)
                    // .json({ code: 404, message: "Task App Not Found" });
                    .json({ code: 404 });
                } else {
                  res.status(201).json({
                    code: 201,
                    // message: "Task Created Successfully",
                    taskId: data.taskId
                  });

                  const updateInfo = {
                    applicationRnumUpdate: req.body.applicationRnum,
                    applicationAcronym: req.body.taskAppAcronym
                  };
                  usermodel.updateAppRNUMA3(updateInfo, (err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("YESSSS");
                    }
                  });
                }
              }
            });
          }
        }
      });
    } else {
      usermodel.CreateTask(req.body, async (err, data) => {
        if (err) {
          if (err.errno === 1062) {
            // res.status(400).json({ code: 400, message: "Duplicate Task" });
            res.status(400).json({ code: 400 });
          }
        } else {
          console.log(data);
          if (data.statuse === false) {
            // res.status(404).json({ code: 404, message: "Task App Not Found" });
            res.status(404).json({ code: 404 });
          } else {
            res.status(201).json({
              code: 201,
              // message: "Task Created Successfully",
              taskId: data.taskId
            });

            const updateInfo = {
              applicationRnumUpdate: req.body.applicationRnum,
              applicationAcronym: req.body.taskAppAcronym
            };
            usermodel.updateAppRNUMA3(updateInfo, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log("YESSSS");
              }
            });
          }
        }
      });
    }

    // usermodel.CreateTask(req.body, async (err, data) => {
    //   if (err) {
    //     if (err.errno === 1062) {
    //       res.status(400).json({ code: 400, message: "Duplicate Task" });
    //     }
    //   } else {
    //     console.log(data);
    //     if (data.statuse === false) {
    //       res.status(404).json({ code: 404, message: "Task App Not Found" });
    //     } else {
    //       res.status(201).json({
    //         code: 201,
    //         message: "Task Created Successfully",
    //         taskId: data.taskId
    //       });

    //       const updateInfo = {
    //         applicationRnumUpdate: req.body.applicationRnum,
    //         applicationAcronym: req.body.taskAppAcronym
    //       };
    //       usermodel.updateAppRNUMA3(updateInfo, (err, data) => {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           console.log("YESSSS");
    //         }
    //       });
    //     }
    //   }
    // });
  }
};

// View Tasks by state
const GetTaskByState = (req, res) => {
  if (!req.body.taskState) {
    // res.status(411).json({ code: 411, message: "Task State Empty" });
    res.status(411).json({ code: 411 });
  } else if (!req.body.taskAppAcronym) {
    // res.status(411).json({ code: 411, message: "Task App Acronym Empty" });
    res.status(411).json({ code: 411 });
  } else {
    if (
      req.body.taskState === "open" ||
      req.body.taskState === "todo" ||
      req.body.taskState === "doing" ||
      req.body.taskState === "done" ||
      req.body.taskState === "close"
    ) {
      usermodel.GetTaskByState(req.body, (err, data) => {
        if (err) {
          res.send(data);
        } else {
          if (data.searchstatus === false) {
            res
              .status(404)
              // .json({ code: 404, message: "Task App Acronym not found" });
              .json({ code: 404 });
          } else {
            res.status(200).json({ code: 200, message: data });
          }
        }
      });
    } else {
      // res.status(405).json({ code: 405, message: "Invalid Task State" });
      res.status(405).json({ code: 405 });
    }
  }
};

// Promote task 2 done
const PromoteTask2Done = async (req, res) => {
  if (!req.body.taskId) {
    // res.status(411).json({ code: 411, message: "Task Id Empty" });
    res.status(411).json({ code: 411 });
  } else {
    usermodel.PromoteTask2Done(req.body, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.searchstatus === false) {
          // res.status(404).json({ code: 404, message: "Task Id not found" });
          res.status(404).json({ code: 404 });
        } else if (data.taskstatus === false) {
          res
            .status(406)
            // .json({ code: 406, message: "Current state is not at doing" });
            .json({ code: 406 });
        } else {
          usermodel.viewOneUser(req.body, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(data.result[0]);
              // console.log("HIIII");
              let info = {
                userName: req.body.userName,
                taskId: req.body.taskId,
                userEmail: data.result[0].userEmail
              };
              usermodel.sendEmail(info, (err, data) => {
                if (err) {
                  console.log(err);
                }
              });
              res.status(200).json({
                code: 200
                // message: "Task successfully promoted to done"
              });
            }
          });
        }
      }
    });
  }
};

// Check Login
const checkLogin = async (req, res, next) => {
  let loginusername = req.body.userName;
  let loginuserpwd = req.body.userPwd;
  if (!loginusername || !loginuserpwd) {
    // res.status(411).json({ code: 411, message: "Empty Fields" });
    res.status(411).json({ code: 411 });
  } else if (
    !checkUserName(req.body.userName) ||
    !checkPassword(req.body.userPwd)
  ) {
    res
      .status(401)
      // .json({ code: 401, message: "Invalid username or password" });
      .json({ code: 401 });
  } else if (
    checkUserName(req.body.userName) &&
    checkPassword(req.body.userPwd)
  ) {
    usermodel.viewOneUser(req.body, (err, data) => {
      if (err) {
        res.send({ message: err.sqlMessage, result: null });
      } else if (data.resultlength === 0) {
        res.status(403).json({ code: 403 });
      } else {
        parseddata = JSON.parse(JSON.stringify(data));

        userstatus = parseddata.result[0].userStatus;
        hashedPwd = parseddata.result[0].userPwd;

        bcrypt.compare(req.body.userPwd, hashedPwd).then(async (match) => {
          if (!match) {
            res.status(512).json({
              code: 512,
              message: "Not Permitted"
            });
          } else if (userstatus == "0") {
            // res.status(403).json({ code: 403, message: "User Is disabled" });
            res.status(403).json({ code: 403 });
          } else {
            next();
          }
        });
      }
    });
  }
};

// Check permits
const checkCreatePermit = (req, res, next) => {
  // console.log(req.body.taskAppAcronym);
  if (!req.body.taskAppAcronym) {
    // res.status(411).json({ code: 411, message: "Task App Acronym Empty" });
    res.status(411).json({ code: 411 });
  } else {
    usermodel.checkAppPermit(req.body, (err, data) => {
      if (err) {
        res.send(err, { message: err.sqlMessage });
      } else {
        if (data.statuse === false) {
          // res.status(404).json({ code: 404, message: "Task App Not Found" });
          res.status(404).json({ code: 404 });
        } else {
          let groupName = data.result.applicationPCreate;
          let userName = req.body.userName;
          let info = {
            userName: userName,
            groupName: groupName
          };
          usermodel.checkGroupFunction(info, (err, data) => {
            if (err) {
              res.send(err, { message: err.sqlMessage });
            } else {
              console.log(data.result);
              if (data.result === true) {
                next();
              } else {
                // res.status(512).json({ code: 512, message: "not permitted" });
                res.status(512).json({ code: 512 });
              }
            }
          });
        }
      }
    });
  }
};

const checkPromotePermit = (req, res, next) => {
  if (!req.body.taskId) {
    // res.status(411).json({ code: 411, message: "Task Id Empty" });
    res.status(411).json({ code: 411 });
  } else {
    usermodel.viewAppbyId(req.body, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.result === null) {
          // res.status(404).json({ code: 404, message: "Task Id not found" });
          res.status(404).json({ code: 404 });
        } else {
          console.log(data[0].taskAppAcronym);
          let appexist = {
            taskAppAcronym: data[0].taskAppAcronym,
            userName: req.body.userName
          };
          usermodel.checkAppPermit(appexist, (err, data) => {
            if (err) {
              res.send(err, { message: err.sqlMessage });
            } else {
              let groupName = data.result.applicationPDoing;
              let userName = appexist.userName;
              let info = {
                userName: userName,
                groupName: groupName
              };
              usermodel.checkGroupFunction(info, (err, data) => {
                if (err) {
                  res.send(err, { message: err.sqlMessage });
                } else {
                  console.log(data.result);
                  if (data.result === true) {
                    next();
                  } else {
                    res
                      .status(512)
                      // .json({ code: 512, message: "not permitted" });
                      .json({ code: 512 });
                  }
                }
              });
              // }
            }
          });
        }
      }
    });
    // usermodel.checkAppPermit(req.body, (err, data) => {
    //   if (err) {
    //     res.send(err, { message: err.sqlMessage });
    //   } else {
    //     if (data.statuse === false) {
    //       res.status(404).json({ code: 404, message: "Task App Not Found" });
    //     } else {
    //       let groupName = data.result.applicationPDoing;
    //       let userName = req.body.userName;
    //       let info = {
    //         userName: userName,
    //         groupName: groupName
    //       };
    //       usermodel.checkGroupFunction(info, (err, data) => {
    //         if (err) {
    //           res.send(err, { message: err.sqlMessage });
    //         } else {
    //           console.log(data.result);
    //           if (data.result === true) {
    //             next();
    //           } else {
    //             res.status(512).json({ code: 512, message: "not permitted" });
    //           }
    //         }
    //       });
    //     }
    //   }
    // });
  }
};

//Error handling
const error = async (req, res) => {
  res.status(400).json({ code: 400 });
};

module.exports = {
  createUser,
  viewUser,
  viewOneUser,
  loginUser,
  updateUserProfile,
  updateAdminProfile,
  createGroup,
  viewGroup,
  viewUserGroupname,
  createApp,
  viewApps,
  viewOneApps,
  updateApp,
  createPlan,
  viewPlans,
  viewPlanColor,
  createTask,
  viewTasks,
  countTasksbyApp,
  updateTaskPlan,
  updateTaskNotes,
  updateTask,
  // updateTaskState,
  updateTaskStateNotes,
  checkGroup,
  checkAppPermits,
  checkGroupFunction,
  createTaskA3,
  CreateTask,
  GetTaskByState,
  PromoteTask2Done,
  checkLogin,
  checkCreatePermit,
  checkPromotePermit,
  error
};

// Custom API for A3
// export const logging = async (req, res) => {
//   let trueFalse = false;
//   try {
//     const user = await Users.findAll({
//       where: { username: req.body.username }
//     });
//     if (user.length > 0) {
//       const match = await bcrypt.compare(req.body.password, user[0].password);
//       if (!match) throw e;
//       const username = user[0].username;
//       const userStatus = user[0].status;
//       if (!userStatus) throw res.status(403).json({ code: 403 });
//       trueFalse = true;
//       return trueFalse;
//     } else {
//       return trueFalse;
//     }
//   } catch (error) {
//     trueFalse = false;
//     return trueFalse;
//   }
// };

// export const checkGroup = async (userId, groupName) => {
//   // take in the username to get the usergroup from backend to check against the groupname provided.
//   let trueFalse = false;
//   const user = await Users.findOne({
//     attributes: ["userGroup"],
//     where: { username: userId }
//   });
//   if (groupName == user.userGroup) {
//     trueFalse = true;
//     return trueFalse;
//   } else {
//     trueFalse = false;
//     return trueFalse;
//   }
// };

// export const createTask = async (req, res) => {
//   let app = [];
//   let id = "";
//   let id2 = "";
//   let plan = [];

//   try {
//     if (!req.body.username) throw res.status(411).json({ code: 411 });
//     if (!req.body.password) throw res.status(411).json({ code: 411 });
//     if (!req.body.task_name) throw res.status(411).json({ code: 411 });
//     if (!req.body.task_app_acronym) throw res.status(411).json({ code: 411 });

//     const checking = await logging(req, res);

//     if (checking) {
//       app = await App.findAll({
//         attributes: ["app_Rnumber", "app_permitCreate"],
//         where: { app_acronym: req.body.task_app_acronym }
//       });
//       // check group function
//       const checking1 = await checkGroup(
//         req.body.username,
//         app[0].app_permitCreate
//       );

//       if (checking1) {
//         plan = await Plan.findAll({
//           attributes: ["plan_MVPName"],
//           where: { plan_appAcronym: req.body.task_app_acronym }
//         });
//         if (
//           app.length > 0 &&
//           (plan.findIndex(
//             (element) =>
//               element.plan_MVPName === req.body.task_plan.toLowerCase()
//           ) > -1 ||
//             req.body.task_plan === "")
//         ) {
//           await App.update(
//             {
//               app_Rnumber: app[0].app_Rnumber + 1
//             },
//             { where: { app_acronym: req.body.task_app_acronym } }
//           );

//           id2 = id.concat(
//             req.body.task_app_acronym.toLowerCase() + "_" + app[0].app_Rnumber
//           );
//           // console.log(id2)

//           try {
//             await Task.create({
//               task_name: req.body.task_name,
//               task_description: req.body.task_description,
//               task_notes: req.body.username.concat(" state: open @ " + Date()), //try whether if this works anot.
//               task_id: id2,
//               task_plan: req.body.task_plan,
//               task_appAcronym: req.body.task_app_acronym,
//               task_owner: req.body.username,
//               task_creator: app[0].app_permitCreate, // cannot hard code this
//               task_state: "open",
//               task_createDate: new Date().toISOString().split("T")[0]
//             });
//             res.status(201).json({ code: 201, task_Id: id2 });
//           } catch (error) {
//             console.log(error);
//           }
//         } else {
//           res.status(404).json({ code: 404 });
//         }
//       } else {
//         throw res.status(512).json({ code: 512 });
//       }
//     } else {
//       res.status(401).json({ code: 401 });
//     }
//   } catch (error) {
//     console.log("hello");
//   }
// };
