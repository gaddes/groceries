var express = require('express');
// Import schema
const Item = require('../models/Item');
// Parse POST requests
const bodyParser = require('body-parser');
// Create JSON specific parser - used as middleware
const jsonParser = bodyParser.json();
var router = express.Router();

/* GET existing items */
router.get('/', function(req, res) {
  Item.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(data);
  });
});

/* POST new items */
router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  // const newDesc = req.body.desc;
  const newItem = new Item(req.body);

  newItem.save()
    .then(item => {
      console.log(`${item} saved to database`);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = router;
