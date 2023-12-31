//REGULAR IMPORTS
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const PORT = 5173

//ROUTE DECLARATIONS 
const signup = require('./routes/signup')
const fetch_data = require('./routes/fetch_data')
const delete_task = require('./routes/delete_task')
const delete_reminder = require('./routes/delete_reminder')
const delete_meeting = require('./routes/delete_meeting')
const create_reminder = require('./routes/create_reminder')
const create_task = require('./routes/create_task')
const create_meeting = require('./routes/create_meeting')
const update_task = require('./routes/update_task')
const update_meeting = require('./routes/update_meeting')
const update_reminder = require('./routes/update_reminder')


//MIDDLEWARE USAGE 
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

//ROUTE USAGE 
app.post('/signup', signup)
app.post('/create_reminder', create_reminder)
app.post('/create_task', create_task)
app.post('/create_meeting', create_meeting)
app.get('/fetch_data', fetch_data)
app.delete('/delete_task', delete_task)
app.delete('/delete_reminder', delete_reminder)
app.delete('/delete_meeting', delete_meeting)
app.post('/update_task', update_task)
app.post('/update_meeting', update_meeting)
app.post('/update_reminder', update_reminder)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
