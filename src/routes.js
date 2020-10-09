const express = require('express');
const StyleController = require('./controllers/StyleController')
const EquivalenceController = require('./controllers/EquivalenceController')
const routes = express.Router()

// Models
routes.get('/styles', StyleController.findAll);
routes.post('/createStyle', StyleController.store);
routes.put('/updateStyle/:id', StyleController.update);

//Equivalence
routes.post('/styles/:style_id/equivalence', EquivalenceController.store);
routes.get('/equivalence', EquivalenceController.find);
routes.delete('/equivalence/:equivalence_id', EquivalenceController.delete)

module.exports = routes;