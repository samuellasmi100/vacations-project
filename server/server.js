const express = require('express');
const userController = require('./controllers/userController');
const vacationsController = require('./controllers/vacationsController');
const errorHandler = require('./errors/error-handler');
const followdController = require('./controllers/followedController');
const loginFilter = require('./middelware/login-filter');


const cors = require('cors');
const app = express();

app.use(cors())

app.use(loginFilter());

app.use(express.json());


app.use('/users',userController);
app.use('/vacations',vacationsController);
app.use('/followed',followdController);


app.use(errorHandler);

app.listen(5001,() => console.log('The server is runing'));