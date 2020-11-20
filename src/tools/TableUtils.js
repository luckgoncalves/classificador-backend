var sheet = {
  columns: [
  ]
};

function registerTable(table) {
  sheet.columns = []
  let headerTable = table[0]
  
  return headerTable
}

module.exports = {
  registerTable
}