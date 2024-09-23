const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const serverless = require('serverless-http');

const user_lists_app = express();
user_lists_app.use(compression());
user_lists_app.use(bodyParser.json());
user_lists_app.use(bodyParser.urlencoded({ extended: true }));
user_lists_app.use((req, res, next) => {
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

require('./src/user_lists/routes/user_list.routes.js')(user_lists_app);

user_lists_app.get('/', (req, res) => res.status(200).send('legion-hq-api-user-lists'));

// app.listen(3000, () => {
//   console.log(`Server is running on port 3000.`);
// });

module.exports.handler = serverless(user_lists_app);