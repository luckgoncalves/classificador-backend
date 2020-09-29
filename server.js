const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const requireDir = require('require-dir');
//Iniciando App
const app = express();
app.use(cors())
app.use(express.json());

//Iniciando o DB
mongoose.connect(
  'mongodb://localhost:27017/classificador', 
  { useNewUrlParser: true, 
    useUnifiedTopology: true }
);
requireDir('./src/models');

//Rotas
app.use('/api', require('./src/routes'))

app.listen(3001);