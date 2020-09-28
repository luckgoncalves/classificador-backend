const mongoose = require('mongoose')

const EquivalenceSchema = new mongoose.Schema({
  word_key: {
    type: String,
    required: true
  },
  word_equivalence: {
    type: String,
    required: true
  },
  id_model: {
    type: Number,
    required: true,
  }
})

mongoose.model('Equivalence', EquivalenceSchema)