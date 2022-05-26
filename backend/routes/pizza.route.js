const express = require('express');
const postRoute = express.Router()

postRoute.route('/get').get((req, res, next) => {
  res.send('Hello')
})

module.exports = postRoute;