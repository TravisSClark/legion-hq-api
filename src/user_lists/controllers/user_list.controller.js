const userList = require('../data_access/user_lists');

exports.create = (req, res) => {
  // TODO: do better/more validation for this...
  if (!req.body.userId) {
    return res.status(400).send({
      message: 'Must include a userId to create a list.'
    });
  }
  userList.putList(req.body).then(data => {
    res.send(data);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

exports.findListsForUser = (req, res) => {
  if (!req.query.userId) {
    return res.status(400).send({
      message: 'Must include a userId to find lists.'
    });
  }
  userList.findListsForUser(req.query.userId).then(results => {
    res.send(results);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

exports.findList = (req, res) => {
  if (!req.params.listId) {
    return res.status(400).send({
      message: 'Must include a listId to find lists.'
    });
  }
  userList.findList(req.params.listId).then(results => {
    if (!results) {
      return res.status(404).send({
        message: `The listId: ${req.params.listId} not found.`
      });
    } else res.send(results);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

exports.update = (req, res) => {
  // TODO: do better/more validation for this...
  if (!req.params.listId) {
    return res.status(400).send({
      message: 'Must include a listId to update a list.'
    });
  }
  if (req.params.listId !== req.body.listId) {
    return res.status(400).send({
      message: 'ListId must match.'
    });
  }
  userList.putList(req.body).then(results => {
    if (!results) {
      return res.status(404).send({
        message: `The listId: ${req.params.listId} was not found.`
      });
    }
    res.send(results);
  }).catch(error => {
    return res.status(500).send({
      message: error.message || 'Internal server error (updating listId: ${req.params.listId}).'
    });
  });
};

exports.delete = (req, res) => {
  if (req.params.listId === '' || req.query.userId === '') {
    return res.status(400).send({
      message: 'The listId and userId cannot be an empty string.'
    });
  }
  userList.deleteList(req.params.listId, req.query.userId).then(results => {
    if (!results) {
      return res.status(404).send({
        message: `The listId: ${req.params.listId} was not found.`
      });
    }
    res.send({ isListDeleted: true });
  }).catch(error => {
    return res.status(404).send({
      message: error.message || `The listId: ${req.params.listId} was not found.`
    });
  });
};
