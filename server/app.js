//REGULAR IMPORTS
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const PORT = 3000

//ROUTE DECLARATIONS 
const signup = require('./routes/signup')
const fetch_data = require('./routes/fetch_data')
const delete_task = require('./routes/delete_task')


//MIDDLEWARE USAGE 
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

//ROUTE USAGE 
app.post('/signup', signup)
app.get('/fetch_data', fetch_data)
app.delete('/delete_task', delete_task)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
