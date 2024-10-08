const user_lists = require('../controllers/user_list.controller');

module.exports = (app) => {
  app.get('/lists', user_lists.findListsForUser);
  app.get('/lists/:listId', user_lists.findList);
  app.post('/lists', user_lists.create);
  app.put('/lists/:listId', user_lists.update);
  app.delete('/lists/:listId', user_lists.delete);
};
