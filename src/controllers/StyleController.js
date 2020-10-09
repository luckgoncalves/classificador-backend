const Style = require('../models/Style');

module.exports = {

  async findAll(req, res) {
    try {
      const style = await Style.findAll(
        {
          order: ['id'],
          include: ['equivalences']
      }
      );
      return res.json(style)
      
    } catch (error) {
      console.error(error)
    }
  },

  async store (req, res) {
    const { name } = req.body;
    const style = await Style.create({name});
    return res.json(style)
  },

  async update (req, res) {
    const toUpdate = await Style.findByPk(req.params.id)
    const style = await toUpdate.update({name: req.body.name})
    return res.json(style)
  }
};