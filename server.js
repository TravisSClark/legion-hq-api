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

require('./routes/user.routes.js')(app);
require('./routes/user_list.routes.js')(app);

app.get('/', (req, res) => res.status(200).send('legion-hq-api'));

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});
