const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
//Iniciando App
const app = express();

//Iniciando o DB
mongoose.connect(
  'mongodb://localhost:27017/classificador', 
  { useNewUrlParser: true, 
    useUnifiedTopology: true }
);
requireDir('./src/models');
const Models = mongoose.model('Models');

//Primeira rota
app.post('/createModel',(req, res) => {
  console.log(req.params)
  // Models.create({
  //   model: 'Lucas',
  // })

  return res.send(req)
})

app.get('/deleteModel/:model', async (req, res) => {
  await Models.deleteOne({model: req.params.model},function(err){

    return res.send('DeleteModels')
  })
})

app.get('/Models', async (req, res) => {
  const resp = await Models.find().then(r => r)
  return res.send(resp)
})

app.listen(3001);