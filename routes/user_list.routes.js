import user_lists from '../controllers/user_list.controller';
exports = (app, autoIncrement) => {
  app.get('/lists', user_lists.findSome);
  app.get('/lists/:listId', user_lists.findOne);
  app.post('/lists', user_lists.create);
  app.put('/lists/:listId', user_lists.update);
  app.delete('/lists/:listId', user_lists.delete);
};
