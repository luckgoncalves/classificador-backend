const express = require('express');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const StyleController = require('./controllers/StyleController')
const EquivalenceController = require('./controllers/EquivalenceController')
const routes = express.Router()

// Patterns
routes.get('/styles', StyleController.findAll);
routes.post('/createStyle', StyleController.store);
routes.put('/updateStyle/:id', StyleController.update);
routes.delete('/deletePattern/:id', StyleController.delete);

//Equivalence
routes.post('/styles/:style_id/equivalence', EquivalenceController.store);
routes.get('/equivalence', EquivalenceController.find);
routes.delete('/equivalence/:equivalence_id', EquivalenceController.delete)

//Compare
routes.post('/compare_equivalence/:style_id', upload.single('tabela'), EquivalenceController.compare)
routes.post('/import_equivalence/:style_id', upload.single('tabela'), EquivalenceController.import)


module.exports = routes;