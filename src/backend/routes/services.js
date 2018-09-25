const asyncMiddleware = require('../middleware/async');
const auth       = require('../middleware/auth');
const admin      = require('../middleware/admin');
const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const {MyModel , validate} = require('../models/service');

// CREATE - POST
router.post('/', auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let document = new MyModel(req.body);
  //document.tenantid = new mongoose.Types.ObjectId(req.tenant._id);
  document.tenantId = req.tenant._id;
  document = await document.save();
  res.status(201).send(document);
}));

// READ - GET (ALL THE TENANTS AS AN ADMIN/SUPPORT)
router.get('/all', [auth, admin], asyncMiddleware(async (req, res) => {
  const documents = await MyModel.find().sort({ creationDate: -1 });
  /*const pageNumber = 1; const pageSize   = 10; const position   = (pageNumber-1) * pageSize; .skip( position ).limit( pageSize ) */
  res.send(documents).status(200);
}));

// READ - GET (ALL HIS PRICES FOR THE CURRENT TENANT)
router.get('/', auth, asyncMiddleware(async (req, res) => {
  const documents = await MyModel.find({ tenantId: req.tenant._id }).sort({ creationDate: -1 });
  /*const pageNumber = 1; const pageSize   = 10; const position   = (pageNumber-1) * pageSize; .skip( position ).limit( pageSize ) */
  res.send(documents).status(200);
}));

// READ - GET ( A SPECIFIC PRICE )
router.get('/:id', auth, asyncMiddleware(async (req, res) => {
  let document = null;
  if (req.tenant.isAdmin) {
    document = await MyModel.findById(req.params.id);
  } else {
    document = await MyModel.find({ _id: req.params.id, tenantId: req.tenant._id });
  }
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(document);
}));

// UPDATE - UPDATE & PATCH ( A SPECIFIC PRICE )
router.put('/:id', auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const document = await MyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(document);
}));

// DELETE ( A SPECIFIC PRICE )
router.delete('/:id', [auth], asyncMiddleware(async (req, res) => {
  const document = await MyModel.findByIdAndRemove(req.params.id);
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(204).send(document);
}));

// DELETE ( ALL THE PRICES AS ADMIN/SUPPORT )
router.delete('/all', [auth, admin], asyncMiddleware(async (req, res) => {
  const document = await MyModel.remove({});
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(204).send(document);
}));

// DELETE ( ALL THE PRICES OF THE CURRENT TENANT )
router.delete('/', auth, asyncMiddleware(async (req, res) => {
  const document = await MyModel.remove({ tenantId: req.tenant._id });
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(204).send(document);
}));

module.exports = router;