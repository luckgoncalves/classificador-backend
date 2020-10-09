const Style = require('../models/Style')
const Equivalence = require('../models/Equivalence')

module.exports = {

  async find(req, res) {
    try {
      let equivalence = await Equivalence.findAll({where: req.query},{order: ['id']});
      return res.json(equivalence)
    } catch (error) {
      return res.status(400).json({error: 'Where undefined'})
    }
  },

  async store (req, res) {
    const { style_id } = req.params
    const { word, word_key } = req.body
    const style = await Style.findByPk(style_id)
    
    if(!style){
      return res.status(400).json({error: 'Modelo não encontrado'})
    }
    const equivalence = await Equivalence.create({word, word_key, style_id}) 
    
    return res.json(equivalence)
  },

  async delete (req, res) {
    const equivalence = await Equivalence.destroy({where:{id: req.params.equivalence_id}})
    return res.json(equivalence)
  }
};