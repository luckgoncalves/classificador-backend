const express = require('express');
const routes = express.Router();
const ModelsController = require("./controllers/ModelsController");

routes.get('/models', ModelsController.index);
routes.get('/model/:id', ModelsController.show)
routes.post('/createModel', ModelsController.create);
routes.put('/updateModel/:id', ModelsController.update);
routes.delete('/deleteModel/:id', ModelsController.delete);

module.exports = routes;