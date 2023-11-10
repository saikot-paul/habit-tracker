const express = require('express')
const fs = require('fs')
const router = express.Router()

//create route for API call 
router.post('/login', (req, res) => { 

    //extract username and password 
    const {username, password} = req.body

    //simple function to verify password, later will be using hashing to check 
    const verifyPassword = (server_pass, user_pass) => { 
        return server_pass === user_pass
    }

    //read the file that contains the users 
    fs.readFile('./routes/users.json', 'utf-8', (err, data) => { 
        //if error reading file send error status 
        if (err) { 
            console.log('Error reading json file')
            return res.status(500).json({message : 'Error reading from server', success: false})
        }

        //read json file and extract user 
        const users = JSON.parse(data)

        const user = users.find(u => u.username === username)

        //logic to verify users 
        if (user && verifyPassword(user.password, password)) { 
            return res.status(200).json({success : true})
        }else { 
            return res.status(401).json({success: false, message : 'Invalid login credentials'})
        }


    })
})

module.exports = router