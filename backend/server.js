const express = require('express',)
const mongoose = require('mongoose',)
const cors = require('cors',)
const bodyParser = require('body-parser',)
const database = require('./config/database',)
const app = express()
const routes = require('./routes/pizza.route',)

// connect mongoDB
mongoose.Promise = global.Promise
mongoose.connect(database.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},).then(() => {
  console.log('Database connected',)
}, (err,) => {
  console.log('Error connecting: ', err,)
},)

app.use(bodyParser.json(),)
app.use(bodyParser.urlencoded({
  extended: true,
},),)
app.use(cors(),)

// api
app.use('/api', routes,)

// create port
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Connected to port: ', port,)
},)

// error hundler
app.use(function(err, req, res,) {
  console.error(err.message,)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode,).send(err.message,)
},)
