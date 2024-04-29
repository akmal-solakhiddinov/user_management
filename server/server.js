const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const userRoute = require('./routes/userRoutes');
app.use('/api', userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
