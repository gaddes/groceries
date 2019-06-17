var express = require('express');
// Import schema
const Item = require('../models/Item');
const router = express.Router();

/* GET existing items */
router.get('/', function(req, res) {
  Item.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(data);
  });
});

/* POST new items */
router.post('/', (req, res) => {
  const newItem = new Item(req.body);

  newItem.save()
    .then(item => {
      console.log(`SUCCESS: ${item} saved to database`);
    })
    .catch(err => {
      res.status(400).send(`FAILURE: Unable to save to database`);
    });
});

module.exports = router;
