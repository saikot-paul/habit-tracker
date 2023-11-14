const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/create_account', (req, res) => {
  const { email, username, password } = req.body;

  console.log(email)
  console.log(username)
  console.log(password)

  //read file that contains the user data 
  fs.readFile('./routes/users.json', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading json file');
      return res.status(500).json({ message: 'Error reading from server', success: false });
    }

    const users = JSON.parse(data);

    //check if user exists 
    const exists = users.some(obj => obj.username === username);

    //if doesn't exist append user to current json data and write 
    if (!exists) {
      const new_user = {
        username: username,
        password: password
      };

      users.push(new_user);

      const updatedJsonString = JSON.stringify(users, null, 2);

      fs.writeFile('./routes/users.json', updatedJsonString, (err) => {
        if (err) {
          return res.status(500).json({success: false, message: 'Internal Server Error' });
        } else {
          return res.status(200).json({ success: true, message: 'Successfully created account' });
        }
      });
    //return 409, stating an account already exists
    } else {
      return res.status(409).json({ sucess: false, message: 'Login credentials already exist' });
    }
  });
});

module.exports = router;
