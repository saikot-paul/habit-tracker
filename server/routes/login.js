const express = require('express')
const fs = require('fs')
const router = express.Router()


router.post('/login', (req, res) => { 
    const {username, password} = req.body
    const loggedIn = false 

    const verifyPassword = (server_pass, user_pass) => { 
        return server_pass === user_pass
    }

    fs.readFile('./routes/users.json', 'utf-8', (err, data) => { 
        if (err) { 
            console.log('Error reading json file')
            return res.status(500).json({message : 'Error reading from server', success: false})
        }

        const users = JSON.parse(data)

        const user = users.find(u => u.username === username)

        if (user && verifyPassword(user.password, password)) { 
            return res.status(200).json({success : true})
        }else { 
            return res.status(401).json({success: false, message : 'Invalid login credentials'})
        }


    })
})

module.exports = router