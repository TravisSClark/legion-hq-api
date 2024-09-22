const serverless = require('serverless-http');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const app = express.Router();
app.use(cors())
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

require('./routes/users.routes.js')(app);

app.get('/', (req, res) => res.status(200).send('legion-hq-api-user'));

// app.listen(3000, () => {
//   console.log(`Server is running on port 3000.`);
// });

module.exports.handler = serverless(app);