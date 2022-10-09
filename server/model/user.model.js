// const bcrypt = require("bcrypt");
const sql = require("../config/db.config");
const nodemailer = require("nodemailer");
var moment = require("moment");

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
    // `INSERT INTO application VALUES ('${req.applicationAcronym}',
    // '${req.applicationDesc}','${req.applicationRnum}','${req.applicationStart}',
    // '${req.applicationEnd}','${req.applicationPCreate}','${req.applicationPOpen}',
    // '${req.applicationPTodo}','${req.applicationPDoing}','${req.applicationPDone}')  `,
    // `INSERT INTO application (applicationAcronym,applicationRnum )VALUES ('${req.applicationAcronym}','${req.applicationrRnum}')  `,

    `INSERT INTO application 
    VALUES (?,?,?,?,?,?,?,?,?,?) `,
    [
      req.applicationAcronym,
      req.applicationDesc,
      req.applicationRnum,
      req.applicationStart,
      req.applicationEnd,
      req.applicationPCreate,
      req.applicationPOpen,
      req.applicationPTodo,
      req.applicationPDoing,
      req.applicationPDone
    ],
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
    `UPDATE application SET applicationDesc= ? , 
    applicationStart= ?, applicationEnd= ?, 
    applicationPCreate=?,applicationPOpen=?, applicationPTodo=?,applicationPDoing=?,applicationPDone=?
    WHERE applicationAcronym=?`,
    [
      req.applicationDesc,
      req.applicationStart,
      req.applicationEnd,
      req.applicationPCreate,
      req.applicationPOpen,
      req.applicationPTodo,
      req.applicationPDoing,
      req.applicationPDone,
      req.applicationAcronym
    ],

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
    // `SELECT planColor FROM plan WHERE planAppAcronym= '${req.planAppAcronym}' AND planMVPName= '${req.planMVPName}'`,
    `SELECT planColor FROM plan WHERE planAppAcronym= '${req.taskAppAcronym}' AND planMVPName= '${req.taskPlanMVPName}'`,
    (err, result) => {
      console.log(result);
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
    // `INSERT INTO task (taskName,taskDesc,taskId,taskPlanMVPName,taskAppAcronym,taskState,taskCreator,taskOwner,taskCreate, taskAuditNotes)
    // VALUES ('${req.taskName}','${req.taskDesc}','${req.taskId}',
    // (SELECT planMVPName FROM plan WHERE planMVPName= '${req.taskPlanMVPName}'),
    // (SELECT applicationAcronym FROM application WHERE applicationAcronym= '${req.taskAppAcronym}'),
    // '${req.taskState}','${req.taskCreator}','${req.taskOwner}','${req.taskCreate}','${req.taskAuditNotes}') `,
    //Works
    // `INSERT INTO task (taskName,taskDesc,taskId,taskPlanMVPName,taskAppAcronym,taskState,taskCreator,taskOwner,taskCreate, taskAuditNotes)
    // VALUES (?,?,?,
    // (SELECT planMVPName FROM plan WHERE planMVPName= ?),
    // (SELECT applicationAcronym FROM application WHERE applicationAcronym= ?),
    // ?,?,?,?,?) `,

    // `INSERT INTO task (taskName,taskDesc,taskId,taskPlanMVPName,taskAppAcronym,taskState,taskCreator,taskOwner,taskCreate, taskAuditNotes)
    // VALUES (?,?,?,
    // (SELECT DISTINCT planMVPName, planAppAcronym FROM plan WHERE planMVPName= ? AND planAppAcronym= ? ),
    // ?,?,?,?,?) `,

    `INSERT INTO task (taskName,taskDesc,taskId,taskPlanMVPName,taskAppAcronym,taskState,taskCreator,taskOwner,taskCreate,taskPlanColor, taskAuditNotes)
    VALUES (?,?,?,?,?,?,
    ?,?,?,?,?) `,

    [
      req.taskName,
      req.taskDesc,
      req.taskId,
      req.taskPlanMVPName,
      req.taskAppAcronym,
      req.taskState,
      req.taskCreator,
      req.taskOwner,
      req.taskCreate,
      req.taskPlanColor,
      req.taskAuditNotes
    ],

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
    `UPDATE task SET taskPlanMVPName=?,taskOwner=?, taskAuditNotes=?,taskDesc=?,taskPlanColor=?
     WHERE taskId=? `,
    [
      req.taskPlanMVPName,
      req.taskOwner,
      req.taskAuditNotes,
      req.taskDesc,
      req.taskPlanColor,
      req.taskId
    ],
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
    // `UPDATE task SET taskNotes= '${req.taskNotes}',taskOwner= '${req.taskOwner}', taskAuditNotes=  '${req.taskAuditNotes}',taskDesc= '${req.taskDesc}'
    //  WHERE taskId='${req.taskId}' `,
    `UPDATE task SET taskNotes=?,taskOwner=?, taskAuditNotes=?,taskDesc=?
     WHERE taskId=? `,
    [
      req.taskNotes,
      req.taskOwner,
      req.taskAuditNotes,
      req.taskDesc,
      req.taskId
    ],
    (err, result) => {
      if (err) {
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
    // `UPDATE task SET taskPlanMVPName= '${req.taskPlanMVPName}' , taskNotes= '${req.taskNotes}', taskAuditNotes=  '${req.taskAuditNotes}',taskOwner=  '${req.taskOwner}', taskDesc= '${req.taskDesc}'
    //  WHERE taskId='${req.taskId}'`,yyc
    // `UPDATE task SET taskPlanMVPName= '${req.taskPlanMVPName}' , taskNotes= '${req.taskNotes}', taskAuditNotes=  '${req.taskAuditNotes}',taskOwner=  '${req.taskOwner}', taskDesc= '${req.taskDesc}'
    //  WHERE taskId='${req.taskId}'`,
    `UPDATE task SET taskPlanMVPName=? ,taskNotes=?, taskAuditNotes=?,taskOwner=?,taskDesc=?,taskPlanColor=?
     WHERE taskId=? `,
    [
      req.taskPlanMVPName,
      req.taskNotes,
      req.taskAuditNotes,
      req.taskOwner,
      req.taskDesc,
      req.taskPlanColor,
      req.taskId
    ],
    (err, result) => {
      if (err) {
        response(err, null);
      } else {
        response(null, result);
      }
    }
  );
};

// Update State
// const updateTaskState = (req, response) => {
//   sql.query(
//     `UPDATE task SET taskState=  '${req.taskState}'
//      WHERE taskId='${req.taskId}' AND taskAppAcronym='${req.taskAppAcronym}'`,
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

//Update Audit notes only - promote demote
const updateTaskStateNotes = (req, response) => {
  sql.query(
    // `UPDATE task SET  taskAuditNotes=  '${req.taskAuditNotes}', taskOwner=  '${req.taskOwner}'
    //  WHERE taskId='${req.taskId}'`,

    `UPDATE task SET  taskAuditNotes=?,taskOwner=?,taskState=?
     WHERE taskId=? `,
    [req.taskAuditNotes, req.taskOwner, req.taskState, req.taskId],
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

// Checkgroup
const checkGroupFunction = (req, response) => {
  sql.query(
    `SELECT * FROM user WHERE userName = '${req.userName}' AND groupName LIKE '%${req.groupName}%'`,
    (err, res) => {
      // console.log(res);
      if (err) {
        response(err, { result: null });
      } else {
        if (res.length != 0) {
          response(null, { message: "Success", result: true });
        } else {
          response(null, { message: "Fail", result: false });
        }
      }
    }
  );
};

// Checkgroup
const checkAppPermits = (req, response) => {
  sql.query(
    `SELECT applicationPOpen, applicationPCreate, applicationPTodo, applicationPDoing, applicationPDone FROM application WHERE applicationAcronym = '${req.applicationAcronym}'
    `,
    (err, res) => {
      if (err) {
        response(err, { result: false });
      } else {
        if (res.length != 0) {
          response(null, { message: "Success", result: res[0] });
        } else {
          response(null, { message: "Fail", result: null });
        }
      }
    }
  );
};

// Email
const getAllUserEmail = (req, response) => {
  const formatDate = moment().format("YYYY-MM-DD HH:mm:ss");
  sql.query(
    `SELECT userEmail from user where groupName like '%ProjectLead%'`,
    (err, result, data) => {
      if (err) {
        response.send({ result: false });
      } else {
        if (result.length) {
          response.send({ message: "Found", result: result });
          async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport({
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "1181de62d56717",
                pass: "b24e37db5d7796"
              }
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: `${req.body.userEmail}`, // sender address
              // to: `${result[0].userEmail}`, // list of receivers
              to: `${result[0].userEmail}`, // list of receivers
              // subject: `Task ${req.body.taskAppAcronym} Completed ✔`, // Subject line
              // subject: `${req.body.taskName}  in ${req.body.taskAppAcronym} has been completed `, // Subject line
              subject: `${req.body.taskId} has been completed `, // Subject line
              text: `${req.body.userName} has completed ${req.body.taskId}  at ${formatDate}`, // plain text body
              // text: `${req.body.userName} has completed ${
              //   req.body.taskName
              // }  at '${new Date().toUTCString()}'`, // plain text body
              html: `${req.body.userName} has completed ${req.body.taskId}  at ${formatDate}` // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }

          main().catch(console.error);
        } else {
          response.send({ message: "Not Found", result: false });
        }
      }
    }
  );
};

// Create Task A3
const createTaskA3 = (req, response) => {
  sql.query(
    `SELECT applicationRnum from application where applicationAcronym=?`,
    [req.applicationAcronym],
    function (err, rnum, fields) {
      sql.query(
        `SELECT COUNT(*) AS count FROM task WHERE taskAppAcronym=?`,
        [req.taskAppAcronym],
        function (err, count, fields) {
          var id =
            req.taskAppAcronym +
            "_" +
            // (rnum[0].applicationRnum + count[0].count);
            rnum[0].applicationRnum;
          sql.query(
            "INSERT INTO task (taskId, taskName, taskDesc, taskNotes,  taskPlanMVPName, taskAppAcronym,taskState,taskCreator, taskOwner, taskCreate,taskAuditNotes) values(?,?,?,?,?,?,?,?,?,?,?)",
            [
              id,
              req.taskName,
              req.taskDesc,
              req.taskNotes,
              req.taskPlanMVPName,
              req.taskAppAcronym,
              req.taskState,
              req.taskCreator,
              req.taskOwner,
              req.taskCreate,
              req.taskAuditNotes
            ],
            (err, result) => {
              if (err) {
                console.log("what is error", err);
                // response.send({ message: err.sqlMessage, result: false });
                response(err, err.sqlMessage);
              } else {
                // response.send({ message: "Task Created", result: true });
                response(null, {
                  message: "Task Created",
                  result: true
                });
              }
            }
          );
        }
      );
    }
  );
};
const updateAppRNUMA3 = (req, response) => {
  sql.query(
    `UPDATE  application SET applicationRnum=applicationRnum +1  where applicationAcronym=?`,
    // [req.applicationRnumUpdate, req.applicationAcronym],
    [req.applicationAcronym],

    (err, result) => {
      if (err) {
        console.log("what is error", err);
        // response.send({ message: err.sqlMessage, result: false });
        response(err, err.sqlMessage);
      } else {
        // response.send({ message: "Task Created", result: true });
        response(null, {
          message: "RNUM updated",
          result: true
        });
      }
    }
  );
};

// const viewOneApps = (req, response) => {
//   sql.query(
//     `SELECT * FROM application WHERE applicationAcronym='${req.applicationAcronym}'`,
//     (err, result) => {
//       if (err) {
//         response(err, null);
//       } else {
//         if (result.length == 0) {
//           response(null, { message: "No records found.", result: null });
//         } else {
//           response(null, result);
//         }
//       }
//     }
//   );
// };

const sendEmail = (req, response) => {
  const formatDate = moment().format("YYYY-MM-DD HH:mm:ss");
  sql.query(
    `SELECT userEmail from user where groupName like '%ProjectLead%'`,
    (err, result, data) => {
      if (err) {
        // response.send({ result: false });
        console.log(err);
      } else {
        if (result.length) {
          async function main() {
            var transporter = nodemailer.createTransport({
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "1181de62d56717",
                pass: "b24e37db5d7796"
              }
            });
            // send mail with defined transport object
            let info = transporter.sendMail({
              from: `${req.userEmail}`, // sender address
              to: `${result[0].userEmail}`, // list of receivers} has been completed `, // Subject line
              subject: `${req.taskId} has been completed `, // Subject line
              text: `${req.userName} has completed ${req.taskId}  at ${formatDate}`, // plain text body
              html: `${req.userName} has completed ${req.taskId}  at ${formatDate}` // html body
            });
            return;
          }
          main().catch(console.error);
        } else {
          response.send({ message: "Not Found", result: false });
        }
      }
    }
  );
};

// ============== Assignment 3 ====================
const CreateTask = (req, response) => {
  const formatDate = moment().format("YYYY-MM-DD HH:mm:ss");
  sql.query(
    `SELECT applicationRnum from application where applicationAcronym=?`,
    [req.taskAppAcronym],
    (err, result) => {
      if (err) {
        response(err, err.sqlMessage);
      } else {
        if (!result.length) {
          response(err, { statuse: false, message: "Task App not Found" });
          console.log("Doneee");
        } else {
          var id = req.taskAppAcronym + "_" + result[0].applicationRnum;

          sql.query(
            "INSERT INTO task (taskId, taskName, taskDesc, taskNotes, taskPlanMVPName, taskAppAcronym,taskState,taskCreator, taskOwner, taskCreate) values(?,?,?,?,?,?,?,?,?,?)",
            [
              id,
              req.taskName,
              req.taskDesc,
              "",
              req.taskPlanMVPName,
              req.taskAppAcronym,
              "open",
              req.userName,
              req.userName,
              formatDate

              // req.taskCreate //use date.now
            ],
            (err, result) => {
              if (err) {
                console.log("what is error", err);
                response(err, err.sqlMessage);

                console.log(result);
              } else {
                response(null, {
                  result: true,
                  taskId: id
                });
              }
            }
          );
        }
      }
    }
    // }
  );
};

// Get tasks by state
const GetTaskByState = (req, response) => {
  sql.query(
    `SELECT * FROM task WHERE taskAppAcronym= '${req.taskAppAcronym}' AND taskState= '${req.taskState}'  `,
    (err, result) => {
      if (err) {
        response(err, null);
      } else {
        if (result.length == 0) {
          response(null, {
            message: "No records found.",
            result: null,
            searchstatus: false
          });
        } else {
          response(null, result);
        }
      }
    }
  );
};

//Promote task state
const PromoteTask2Done = (req, response) => {
  sql.query(
    `SELECT * FROM task WHERE taskId= '${req.taskId}'`,
    [req.taskId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        if (result.length == 0) {
          response(null, {
            message: "No records found.",
            result: null,
            searchstatus: false
          });
        } else {
          console.log(result[0].taskState);
          if (result[0].taskState === "doing") {
            sql.query(
              `UPDATE task SET taskState = 'done' WHERE taskId= ? `,
              [req.taskId],
              (err, result) => {
                if (err) {
                  response(err, null);
                } else {
                  response(null, result);
                }
              }
            );
          } else {
            response(null, {
              message: "Invalid task state",
              result: null,
              taskstatus: false
            });
          }
        }
      }
    }
  );
};

const checkAppPermit = (req, response) => {
  sql.query(
    `SELECT applicationPCreate, applicationPDoing, applicationPDone FROM application WHERE applicationAcronym = '${req.taskAppAcronym}'
    `,
    (err, res) => {
      if (err) {
        response(err, { result: false });
      } else {
        if (res.length != 0) {
          response(null, { message: "Success", result: res[0] });
        } else {
          // response(null, { message: "Fail", result: null });
          // if (!result.length) {
          response(err, { statuse: false, message: "Task App not Found" });
          //   console.log("Doneee");
          // }
        }
      }
    }
  );
};

const viewPlanbyplan = (req, response) => {
  sql.query(
    `SELECT planMVPName FROM plan WHERE planMVPName= '${req.taskPlanMVPName}' AND planAppAcronym='${req.taskAppAcronym}' `,
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

const viewAppbyId = (req, response) => {
  sql.query(
    `SELECT taskAppAcronym FROM task WHERE taskId= '${req.taskId}'`,
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
  // updateTaskState,
  updateTaskStateNotes,
  // appendAuditNotes,
  checkGroup,
  checkGroupFunction,
  checkAppPermits,
  getAllUserEmail,
  sendEmail,
  createTaskA3,
  updateAppRNUMA3,
  CreateTask,
  GetTaskByState,
  PromoteTask2Done,
  checkAppPermit,
  viewAppbyId,
  viewPlanbyplan
};
