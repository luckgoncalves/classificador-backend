const { Model, DataTypes } = require('sequelize');

class Equivalence extends Model {
  static init (sequelize) {
    super.init({
      word: DataTypes.STRING,
      word_key: DataTypes.STRING,
      style_id: DataTypes.INTEGER
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Styles, { foreignKey: 'style_id', as: 'styles' });
  }
}

module.exports = Equivalence
