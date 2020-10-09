module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'classificador',
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: false
}