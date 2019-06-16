var express = require('express');
var router = express.Router();

/* GET items listing. */
router.get('/', function(req, res, next) {
  res.json([
    'chicken',
    'eggs',
    'pickles'
  ])
});

module.exports = router;