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

module.exports = app;