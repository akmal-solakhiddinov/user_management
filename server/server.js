const express = require('express')
const app = express()
const port = 4100
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

app.use(bodyParser.json())
app.use(cors())
dotenv.config()

const userRoute = require('./routes/userRoutes')
app.use('/api', userRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});