const { Model, DataTypes } = require('sequelize');

class Styles extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING
    }, {
      sequelize,
      tableName:'styles'
    })
  }

  static associate(models) {
    this.hasMany(models.Equivalence, {foreignKey: 'style_id', as: 'equivalences' });
  }
}

module.exports = Styles