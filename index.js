const express = require('express');
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  let htmlContent = "<h1>Welcome to ExpressJs Tutorial</h1>"
  res.send(htmlContent);
});

/*
- Return all details from user.json file to client as JSON format
*/
const userData = require('./user.json')
router.get('/profile', (req,res) => {
  res.json(userData);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  const {username, password} = req.query
  if (req.query.username == undefined || req.query.password == undefined) {
    res.send("Username AND Password parameters required.")
  } else {
      if (username != userData.username) {
      res.send("{status: false, \nmessage: \"User Name is invalid\"}")
      }
      else if (password != userData.password) {
        res.send("{status: false, \nmessage: \"Password is invalid\"}")
      }
      else {
        res.send("<h1>Welcome !</h1>")
      }
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  if (req.params.username == undefined) {
    res.send("Username required.")
  } else {
      let username = req.params.username
      if (userData.username == username) {
        res.send(`<b>${username} successfully logged out.</b>`);
      } else {res.send("Not logged out !")}
    }
  
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));