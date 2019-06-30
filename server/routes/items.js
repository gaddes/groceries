var express = require('express');
// Import schema
const Item = require('../models/Item');
const router = express.Router();

/* GET existing items */
router.get('/items', function(req, res) {
  Item.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(data);
  });
});

/* POST new item */
router.post('/items', (req, res) => {
  const newItem = new Item(req.body);
  newItem.save()
    .then(item => {
      console.log(`SUCCESS: ${item} saved to database`);
      return res.json({ success: true });
    })
    .catch(err => {
      res.status(400).send(`FAILURE: Unable to save to database`);
    });
});

/* DELETE item */
router.delete('/items', (req, res) => {
  const idToDelete = req.body.id;
  Item.deleteOne({ _id: idToDelete }, (err) => {
    if (err) return res.send(err);
    console.log(`SUCCESS: item with ID = ${idToDelete} removed from database`);
    return res.json({ success: true });
  });
});

module.exports = router;
