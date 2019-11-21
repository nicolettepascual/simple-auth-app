const express = require('express')
const app = express();

const bodyParser = require('body-parser');

process.env.JWT_KEY = "thisIsMyJwtKeyUsedToEncodeTheTokens";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({message:'GET in'});
});

const routes = require('./routes');
app.use(routes);

const mongoose = require('mongoose');
//compose connection details
let dbConn = "mongodb+srv://admin:admin@cluster0-awnkb.mongodb.net/test?retryWrites=true&w=majority";
//connect to the database
mongoose.connect(dbConn, {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
  console.log('Connected to the database');
}).catch( err => {
  console.log('Error connecting to the database: ' + err);
  process.exit();
})

module.exports = app;