const mongoose = require('mongoose')

const ModelsSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  }
});

mongoose.model('Models', ModelsSchema)