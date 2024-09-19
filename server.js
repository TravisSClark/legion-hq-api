
import * as routes from './routes/user.routes.js';
require('./routes/user_list.routes.js')(app);

const express = require('express');
const fs = require('fs');
const compression = require('compression');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/', (req, res) => res.status(200).send('legion-hq-api'));

const server = https.createServer({ key, cert }, app);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}.`);
});
