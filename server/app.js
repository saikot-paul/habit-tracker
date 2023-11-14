//REGULAR IMPORTS
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const PORT = 3000

//ROUTE DECLARATIONS 
const loginRoute = require('./routes/login')
const createAccountRoute = require('./routes/create_account')
const createAccountRouteFB = require('./routes/create_account_fb')


//MIDDLEWARE USAGE 
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

//ROUTE USAGE 
app.post('/login', loginRoute)
app.post('/create_account', createAccountRoute)
app.post('/signup', createAccountRouteFB)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
