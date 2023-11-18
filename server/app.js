//REGULAR IMPORTS
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const PORT = 3000

//ROUTE DECLARATIONS 
const signup = require('./routes/signup')
const fetch_data = require('./routes/fetch_data')
const delete_task = require('./routes/delete_task')
const delete_reminder = require('./routes/delete_reminder')
const delete_meeting = require('./routes/delete_meeting')


//MIDDLEWARE USAGE 
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

//ROUTE USAGE 
app.post('/signup', signup)
app.get('/fetch_data', fetch_data)
app.delete('/delete_task', delete_task)
app.delete('/delete_reminder', delete_reminder)
app.delete('/delete_meeting', delete_meeting)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
