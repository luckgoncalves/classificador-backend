const Style = require('../models/Style')
const Equivalence = require('../models/Equivalence')
const TableUtils = require('../tools/TableUtils')
const xlsx = require('node-xlsx').default;
const fs = require('fs');


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
  },

  async compare (req, res) {

    const { style_id } = req.params

    const style = await Style.findByPk(style_id)

    if(!style){
      return res.status(400).json({error: 'Modelo não encontrado'})
    }
    
    if (req.file) {
      let equivalence = await Equivalence.findAll({where: {style_id}},{order: ['id']});
      
      const sheet = xlsx.parse(fs.readFileSync(req.file.path));
      const columns = TableUtils.registerTable(sheet[0].data);
      
      let TableHeader = columns
          TableHeader.push('PRE_EQUIVALENCIA')
      
      let eventKey = TableHeader.indexOf('EVENTO')
      
      if(!eventKey) {
        return res.status(400).json({error: 'Coluna Evento não encontrada'}) 
      }

      let TableRow = []
      let result = { total: 0, success: 0, error: 0 }
      
      for (let index = 0; index < sheet[0].data.length; index++) {
        const wordImport = sheet[0].data[index];
        
        if(index > 0) {
          result.total++
          
          let ob = equivalence.filter( eq => wordImport[eventKey] ? wordImport[eventKey].indexOf(eq.word) !== -1 : '')

          TableRow.push({evento: wordImport[eventKey], equivalencia: ob.length > 0 ? ob[0].word_key : '(não classificado)'})
          ob ? result.success++ : result.error++

        }
      }
      let Table = [TableRow, TableRow]

      return res.json({TableRow, result})
    }
  },
  
  async import (req, res) {
    const { style_id } = req.params

    const style = await Style.findByPk(style_id)

    if(!style){
      return res.status(400).json({error: 'Modelo não encontrado'})
    }

    if (req.file) {
      const sheet = xlsx.parse(fs.readFileSync(req.file.path));
      const columns = TableUtils.registerTable(sheet[0].data);

      let wordKey = columns.indexOf('Equivalence')
      let word = columns.indexOf('Keywords')
      
      for (let index = 0; index < sheet[0].data.length; index++) {
        const element = sheet[0].data[index];
        
        if(index > 0) {
          await Equivalence.create({word_key: element[wordKey], word : element[word], style_id}) 
        }
      }

      return res.json('sucess')
    }
  }
};