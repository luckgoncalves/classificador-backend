const mongoose = require('mongoose');

const Models = mongoose.model('Models')

module.exports = {
  async index(req, res) {
    const models = await Models.find();
    return res.json(models)
  },
  async show (req, res) {
    const models = await Models.findById(req.params.id)
    return res.json(models)
  },
  async create(req, res) {
    await Models.create(req.body);
    const models = await Models.find();
    return res.json(models)
  },
  async update(req, res) {
    const models = await Models.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.json(models)
  },
  async delete(req, res) {
    await Models.findByIdAndRemove(req.params.id)
    return res.send();
  }
};