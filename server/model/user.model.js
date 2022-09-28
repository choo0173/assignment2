// const bcrypt = require("bcrypt");
const sql = require("../config/db.config");

// =============== User ===============
// Create User
const createUser = (req, response) => {
  sql.query(
    `INSERT INTO user (userName, userPwd, userEmail) VALUES ('${req.userName}','${req.userPwd}','${req.userEmail}')  `,
    (err, res) => {
      if (err) {
        console.log(err);
        response(err, err.sqlMessage);
      } else {
        response(null, {
          message: "Account Created",
          result: true
        });
      }
    }
  );
};

// View/Read Users
const viewUser = (req, response) => {
  sql.query(`SELECT * FROM user`, (err, result) => {
    if (err) {
      response(err, null);
    } else {
      if (result.length == 0) {
        response(null, { message: "No records found.", result: null });
      } else {
        response(null, result);
      }
    }
  });
};

// View/Read Specific User
const viewOneUser = (req, response) => {
  sql.query(
    `SELECT * FROM user WHERE userName = '${req.userName}';`,
    (err, result) => {
      if (err) {
        response(err, null);
      } else if (result.length === 0) {
        let resultlength = result.length;
        response(null, { message: "User Not Found", resultlength });
      } else {
        let resultlength = result.length;
        response(null, { result, resultlength });
      }
    }
  );
};

// Update User Profile
const updateUserProfile = (req, response) => {
  sql.query(
    `UPDATE user SET userPwd= '${req.userPwd}', userStatus= '${req.userStatus}', userEmail= '${req.userEmail}', groupName= '${req.groupName}' WHERE userName='${req.userName}'`,
    (err, result) => {
      if (err) {
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};

// Update Admin Profile
const updateEmail = (req, response) => {
  sql.query(
    `UPDATE user SET  userEmail= '${req.userEmail}' WHERE userName='${req.userName}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};
const updatePassword = (req, response) => {
  sql.query(
    `UPDATE user SET userPwd= '${req.userPwd}' WHERE userName='${req.userName}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};
const updateEmailandPwd = (req, response) => {
  sql.query(
    `UPDATE user SET userEmail= '${req.userEmail}', userPwd= '${req.userPwd}' WHERE userName='${req.userName}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};

// Edit Status
const editStatus = (req, response) => {
  sql.query(
    `UPDATE user SET userStatus= '${req.userStatus}' WHERE userName='${req.userName}'`,
    (err, result) => {
      if (err) {
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};

// ====== NOT IN USE============
//User login
// const loginUser = (req, response) => {
//   console.log(req);
//   sql.query(
//     `SELECT * FROM user WHERE userName='${req.userName}' AND userPwd='${req.userPwd}'`,
//     (err, result) => {
//       if (err) {
//         response(err, null);
//       } else {
//         response(null, { message: "correct", result: result[0] });
//       }
//     }
//   );
// };

// ====== NOT IN USE============

// =============== GROUP ===============
// Create Group
const createGroup = (req, response) => {
  // if (req.groupName)
  sql.query(
    `INSERT INTO checkgroup (groupName) VALUES ("${req.groupName}")`,
    (err, res) => {
      if (err) {
        response(err, null);
      } else {
        response(null, {
          message: "Group Created",
          result: true
        });
      }
    }
  );
};

// View/Read Groups
const viewGroup = (req, response) => {
  sql.query(`SELECT * FROM checkGroup`, (err, result) => {
    if (err) {
      response(err, { message: errno });
    } else {
      let resultlength = result.length;
      response(null, { result, resultlength });
    }
  });
};

// View Groupnames of users
const viewUserGroupname = (req, response) => {
  sql.query(`SELECT groupName FROM user`, (err, result) => {
    if (err) {
      response(err, { message: errno });
    } else {
      let resultlength = result.length;
      response(null, { result, resultlength });
    }
  });
};

// ===== Assignment 2 =====
// Create Application
const createApp = (req, response) => {
  sql.query(
    `INSERT INTO application VALUES ('${req.applicationAcronym}','${req.applicationDesc}','${req.applicationRnum}','${req.applicationStart}','${req.applicationEnd}','${req.applicationPOpen}','${req.applicationPCreate}','${req.applicationPTodo}','${req.applicationPDoing}','${req.applicationPDone}')  `,
    // `INSERT INTO application (applicationAcronym,applicationRnum )VALUES ('${req.applicationAcronym}','${req.applicationrRnum}')  `,
    (err, res) => {
      if (err) {
        console.log(err);
        response(err, err.sqlMessage);
      } else {
        response(null, {
          message: "Application Created",
          result: true
        });
      }
    }
  );
};

// View All Applications
const viewApps = (req, response) => {
  sql.query(`SELECT * FROM application`, (err, result) => {
    if (err) {
      response(err, null);
    } else {
      if (result.length == 0) {
        response(null, { message: "No records found.", result: null });
      } else {
        response(null, result);
      }
    }
  });
};
// View onne Applications
const viewOneApps = (req, response) => {
  sql.query(
    `SELECT * FROM application WHERE applicationAcronym='${req.applicationAcronym}'`,
    (err, result) => {
      if (err) {
        response(err, null);
      } else {
        if (result.length == 0) {
          response(null, { message: "No records found.", result: null });
        } else {
          response(null, result);
        }
      }
    }
  );
};

// Update Application
const updateApp = (req, response) => {
  console.log(req);
  sql.query(
    `UPDATE application SET applicationDesc= '${req.applicationDesc}' , 
    applicationStart= '${req.applicationStart}', applicationEnd= '${req.applicationEnd}', applicationPOpen='${req.applicationPOpen}',
    applicationPCreate='${req.applicationPCreate}', applicationPTodo='${req.applicationPTodo}',applicationPDoing='${req.applicationPDoing}',applicationPDone='${req.applicationPDone}'
    WHERE applicationAcronym='${req.applicationAcronym}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
        response(err, null);
      } else {
        console.log(result);
        response(null, true);
      }
    }
  );
};

// const updateAppStartDate = (req, response) => {
//   sql.query(
//     `UPDATE application SET applicationStart= '${req.applicationStart}' WHERE applicationAcronym='${req.applicationAcronym}'`,
//     (err, result) => {
//       if (err) {
//         // console.log(err);
//         response(err, null);
//       } else {
//         response(null, result);
//       }
//     }
//   );
// };

// const updateAppEndDate = (req, response) => {
//   sql.query(
//     `UPDATE application SET applicationEnd= '${req.applicationEnd}' WHERE applicationAcronym='${req.applicationAcronym}'`,
//     (err, result) => {
//       if (err) {
//         // console.log(err);
//         response(err, null);
//       } else {
//         response(null, result);
//       }
//     }
//   );
// };

// const updateAppDesc = (req, response) => {
//   sql.query(
//     `UPDATE application SET applicationDesc= '${req.applicationDesc}' WHERE applicationAcronym='${req.applicationAcronym}'`,
//     (err, result) => {
//       if (err) {
//         // console.log(err);
//         response(err, null);
//       } else {
//         response(null, result);
//       }
//     }
//   );
// };

// Create Plan
const createPlan = (req, response) => {
  sql.query(
    `INSERT INTO plan (planMVPName,planStart,planEnd,planAppAcronym,planColor) 
    VALUES ('${req.planMVPName}','${req.planStart}','${req.planEnd}', 
    (SELECT applicationAcronym FROM application WHERE applicationAcronym='${req.planAppAcronym}'),'${req.planColor}')  `,
    (err, res) => {
      if (err) {
        console.log(err);
        response(err, err.sqlMessage);
      } else {
        response(null, {
          message: "Plan Created",
          result: true
        });
      }
    }
  );
};

// View All Plans
const viewPlans = (req, response) => {
  sql.query(
    `SELECT * FROM plan WHERE planAppAcronym= '${req.planAppAcronym}'`,
    (err, result) => {
      if (err) {
        response(err, null);
      } else {
        if (result.length == 0) {
          response(null, { message: "No records found.", result: null });
        } else {
          response(null, result);
        }
      }
    }
  );
};

// View Plan Colour
const viewPlanColor = (req, response) => {
  sql.query(
    `SELECT planColor FROM plan WHERE planAppAcronym= '${req.planAppAcronym}' AND planMVPName= '${req.planMVPName}'`,
    (err, result) => {
      if (err) {
        response(err, null);
      } else {
        if (result.length == 0) {
          response(null, { message: "No records found.", result: null });
        } else {
          response(null, result);
        }
      }
    }
  );
};

// Create Task
const createTask = (req, response) => {
  sql.query(
    `INSERT INTO task (taskName,taskDesc,taskId,taskPlanMVPName,taskAppAcronym,taskState,taskCreator,taskOwner,taskCreate, taskAuditNotes)
    VALUES ('${req.taskName}','${req.taskDesc}','${req.taskId}',
    (SELECT planMVPName FROM plan WHERE planMVPName= '${req.taskPlanMVPName}'),
    (SELECT applicationAcronym FROM application WHERE applicationAcronym= '${req.taskAppAcronym}'),
    '${req.taskState}','${req.taskCreator}','${req.taskOwner}','${req.taskCreate}','${req.taskAuditNotes}') `,
    (err, res) => {
      if (err) {
        console.log(err);
        response(err, err.sqlMessage);
      } else {
        response(null, {
          message: "Task Created",
          result: true
        });
      }
    }
  );
};

// View All Tasks- by state
const viewTasks = (req, response) => {
  sql.query(
    `SELECT * FROM task WHERE taskAppAcronym= '${req.taskAppAcronym}'  `,
    (err, result) => {
      if (err) {
        response(err, null);
      } else {
        if (result.length == 0) {
          response(null, { message: "No records found.", result: null });
        } else {
          response(null, result);
        }
      }
    }
  );
};
// Count number of unique tasks
const countTasksbyApp = (req, response) => {
  sql.query(
    `SELECT * FROM task WHERE taskAppAcronym= '${req.taskAppAcronym}'  `,
    (err, result) => {
      if (err) {
        response(err, null);
      } else {
        if (result.length == 0) {
          response(null, { message: "No records found.", result: null });
        } else {
          response(null, { result: result.length });
        }
      }
    }
  );
};

// Update Task - Plan
const updateTaskPlan = (req, response) => {
  sql.query(
    `UPDATE task SET  taskPlanMVPName= '${req.taskPlanMVPName}', taskOwner=  '${req.taskOwner}', taskAuditNotes=  '${req.taskAuditNotes}'
     WHERE taskName='${req.taskName}' `,
    (err, result) => {
      if (err) {
        // console.log(err);
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};

// Update Task - Audit Trail (Notes)
const updateTaskNotes = (req, response) => {
  sql.query(
    `UPDATE task SET taskNotes= '${req.taskNotes}',taskOwner= '${req.taskOwner}', taskAuditNotes=  '${req.taskAuditNotes}'
     WHERE taskName='${req.taskName}' `,
    (err, result) => {
      if (err) {
        // console.log(err);
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};

// Update Task
const updateTaskPlanNotes = (req, response) => {
  sql.query(
    `UPDATE task SET taskPlanMVPName= '${req.taskPlanMVPName}' , taskNotes= '${req.taskNotes}', taskAuditNotes=  '${req.taskAuditNotes}',taskOwner=  '${req.taskOwner}'
     WHERE taskName='${req.taskName}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};

// Update State
const updateTaskState = (req, response) => {
  sql.query(
    `UPDATE task SET taskState=  '${req.taskState}'
     WHERE taskName='${req.taskName}' AND taskAppAcronym='${req.taskAppAcronym}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};

//Update Audit notes only - promote demote
const updateTaskStateNotes = (req, response) => {
  sql.query(
    `UPDATE task SET  taskAuditNotes=  '${req.taskAuditNotes}', taskOwner=  '${req.taskOwner}'
     WHERE taskName='${req.taskName}'`,
    (err, result) => {
      if (err) {
        // console.log(err);
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};

// // Insert into Audit trail
// const appendAuditNotes = (req, response) => {
//   sql.query(
//     `UPDATE task (taskAuditNotes) VALUES   ('${req.taskAuditNotes}' )
//      WHERE taskName='${req.taskName}' AND taskAppAcronym='${req.taskAppAcronym}'`,
//     (err, result) => {
//       if (err) {
//         // console.log(err);
//         response(err, null);
//       } else {
//         response(null, result);
//       }
//     }
//   );
// };

// Checkgroup
const checkGroup = (req, response) => {
  sql.query(
    `SELECT groupName FROM user WHERE userName = '${req.userName}'`,
    (err, res) => {
      if (err) {
        response(err, { result: false });
      } else {
        if (res.length != 0) {
          // response(null, {
          //   message: "Found",
          //   result: true
          // });
          response(null, { message: "Success", result: res[0] });
        } else {
          // response(null, {
          //   message: "Not Found",
          //   result: false
          // });
          response(null, { message: "Fail", result: null });
        }
      }
    }
  );
};

module.exports = {
  createUser,
  viewUser,
  viewOneUser,
  updateUserProfile,
  updateEmail,
  updatePassword,
  updateEmailandPwd,
  // editStatus,
  // loginUser,
  createGroup,
  viewGroup,
  viewUserGroupname,
  createApp,
  viewApps,
  viewOneApps,
  updateApp,
  // updateAppStartDate,
  // updateAppEndDate,
  // updateAppDesc,
  createPlan,
  viewPlans,
  viewPlanColor,
  createTask,
  viewTasks,
  countTasksbyApp,
  updateTaskPlan,
  updateTaskNotes,
  updateTaskPlanNotes,
  updateTaskState,
  updateTaskStateNotes,
  // appendAuditNotes,
  checkGroup
};
