const routes = require("express").Router();
const {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
} = require("../controllers/Controller");

routes.route("/categories").post(create_Categories).get(get_Categories);

routes.route("/transaction").post(create_Transaction).get(get_Transaction);

routes.route("/transaction/:id").delete(delete_Transaction);

routes.route("/labels").get(get_Labels);

module.exports = routes;
