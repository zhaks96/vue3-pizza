const express = require('express',)
// eslint-disable-next-line new-cap
const postRoute = express.Router()

postRoute.route('/get',).get((req, res, next,) => {
  res.send('Hello',)
},)

module.exports = postRoute
