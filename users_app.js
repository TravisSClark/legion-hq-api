const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const serverless = require('serverless-http');

const users_app = express();
users_app.use(compression());
users_app.use(bodyParser.json());
users_app.use(bodyParser.urlencoded({ extended: true }));
users_app.use((req, res, next) => {
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

require('./src/users/routes/users.routes.js')(users_app);

users_app.get('/', (req, res) => res.status(200).send('legion-hq-api-user'));

// app.listen(3000, () => {
//   console.log(`Server is running on port 3000.`);
// });

module.exports.handler = serverless(users_app);