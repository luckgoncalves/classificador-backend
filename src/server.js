const express = require('express')
const routes  = require('./routes')
const cors = require('cors')
require('./database')

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api', routes)
app.listen(3001)