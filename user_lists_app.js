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
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-api-key, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Headers',
  );
  next();
});

require('./src/user_lists/routes/user_list.routes.js')(user_lists_app);
// require('./src/users/routes/users.routes.js')(user_lists_app);

user_lists_app.get('/', (req, res) => res.status(200).send('legion-hq-api-user-lists'));

// user_lists_app.listen(3001, () => {
//   console.log(`Server is running on port 3001.`);
// });

module.exports.handler = serverless(user_lists_app);