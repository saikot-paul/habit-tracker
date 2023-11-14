//REGULAR IMPORTS
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const PORT = 3000

//ROUTE DECLARATIONS 
const loginRoute = require('./routes/login')
const createAccountRoute = require('./routes/create_account')


//MIDDLEWARE USAGE 
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

//ROUTE USAGE 
app.post('/login', loginRoute)
<<<<<<< HEAD
app.post('/create_account', createAccountRoute)
=======
app.post('./create_account', createAccountRoute)
>>>>>>> b6f463449897c2d9a14825d30711a816f3b2e7ba

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
