const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors')

require('dotenv').config();
app.use(cors())


app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Will override the Form Method with ?_method=DELETE/PUT/PATCH in end of action
// app.use(methodOverride('_method'));

require('./startup/router')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;

app.listen(5000, () => {
  console.log(`Port started in http://localhost:5000`);




});
