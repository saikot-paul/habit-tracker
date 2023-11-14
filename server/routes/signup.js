const express = require('express');
const router = express.Router()
const admin = require('./config/fireBase_admin')

router.post('/signup', async (req, res) => { 
    
    await admin.auth().createUser({
        email : req.body.email, 
        username : req.body.username, 
        password : req.body.password
    })
    .then( 
        user => { 
            return res.status(200).json({user : user})
    }).catch(
        error => { 
            return res.status(409).json({message: error.message})
    }) 
   
})

module.exports = router