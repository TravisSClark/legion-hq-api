const user = require("../data_access/user")

exports.create = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: 'Must include an email to create a user.'
    });
  }
  // gotta incrememnt the userId
  user.createNewUser(req.body.email).then(data => {
    res.send(data);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

// exports.findAll = (req, res) => {
//   User.find().then(results => {
//     res.send(results);
//   }).catch(error => {
//     res.status(500).send({
//       message: error.message || 'Internal server error'
//     });
//   });
// };

exports.findByUserId = (req, res) => {
  user.findUserByUserId(req.params.userId).then(results => {
    if (!results) {
      return res.status(404).send({
        message: `The userId: ${req.params.userId} was not found`
      });
    } else res.send(results);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

exports.findByEmail = (req, res) => {
  user.findUserByEmail(req.query.email).then(results => {
    if (!results) {
      return res.status(404).send({
        message: `The email: ${req.query.email} was not found`
      });
    } else res.send(results);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

// TODO: exports.update

// TODO: exports.delete
