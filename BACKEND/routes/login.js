const express = require('express');
const user = require('../models/user');
const app = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



app.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/register" || req.path == "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false
          });
        }
      })
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: 'Apis'
  });
});

/* login api */
app.post("/login", async (req, res) => {
  // try {
  //   if (req.body && req.body.username && req.body.password) {
  //     user.find({ username: req.body.username }, (err, data) => {
  //       if (data.length > 0) {

  //         if (bcrypt.compare(req.body.password, data.password).then((req, data) => {
  //           res.status(200).json({
  //             errorMessage: 'Successfully logged in',
  //             status: true,
  //             data: data._id
  //           })
  //         })) {
            
  //         } else {

  //           res.status(400).json({
  //             errorMessage: 'Username or password is incorrect!',
  //             status: false
  //           });
  //         }

  //       } else {
  //         res.status(400).json({
  //           errorMessage: 'Username or password is incorrect!',
  //           status: false
  //         });
  //       }
  //     })
  //   } else {
  //     res.status(400).json({
  //       errorMessage: 'Add proper parameter first!',
  //       status: false
  //     });
  //   }
  // } catch (e) {
  //   res.status(400).json({
  //     errorMessage: 'Something went wrong!',
  //     status: false
  //   });
  // }

  const {username, password} = req.body;
  try {
    if(password && username){
      const vUser = await user.findOne({username});
      if(!vUser){
        res.status(400).json({
          status: false,
          title: "Incorrect username or password"
        });
      }

      console.log(vUser);
      console.log(password);
      const pssComp = await bcrypt.compare(password, vUser.password);

      if(pssComp){
        res.status(200).json({
          status: true,
          title: 'logged in Successfully.',
          data: vUser._id
        });
      }

    }
  } catch (error) {
    res.status(400).json({
      status: false,
      title: error.message
    });
  }

});

/* register api */
app.post("/register", async (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);


      user.find({ username: req.body.username }, (err, data) => {

        if (data.length == 0) {

          let User = new user({
            username: req.body.username,
            password: hashPass
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false
              });
            } else {
              res.status(200).json({
                status: true,
                title: 'Registered Successfully.',
                data: data._id
              });
            }
          });

        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false
          });
        }

      });

    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: e.message,
      status: false
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
    if (err) {
      res.status(400).json({
        status: false,
        errorMessage: err,
      });
    } else {
      res.json({
        message: 'Login Successfully.',
        token: token,
        status: true
      });
    }
  });
}

module.exports = app;
