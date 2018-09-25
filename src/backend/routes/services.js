const asyncMiddleware = require('../middleware/async');
const auth       = require('../middleware/auth');
const admin      = require('../middleware/admin');
const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const math       = require('mathjs')
const {MyModel , validate, validateDeep} = require('../models/service');

// CREATE - POST
router.post('/', auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const e = validateDeep(req.body);
  if (e) {
    return res.status(400).send(e);
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

// READ JUST COMPUTE FROM A PRICE TAX AND TOTAL, NO NEED OF AUTH TOKEN 
router.get('/calc', asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const e = validateDeep(req.body);
  if (e) {
    return res.status(400).send(e);
  }
  const n1  = Number(req.body.price);
  const gst   = n1 * 10. / 100. ;
  const total = n1 * 10. / 100. + n1;
  const computePrice = {
    price: math.round(req.body.price,2),
    gst: math.round(gst,2),
    total: math.round(total,2)
  };
  res.status(200).send(computePrice);
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
  const e = validateDeep(req.body);
  if (e) {
    return res.status(400).send(e);
  }
  const document = await MyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(document);
}));
// UPDATE - UPDATE & PATCH ( A SPECIFIC PRICE )
router.put('/:id/calc', auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const e = validateDeep(req.body);
  if (e) {
    return res.status(400).send(e);
  }
  const n1  = Number(req.body.price);
  const gst   = n1 * 10. / 100. ;
  const total = n1 * 10. / 100. + n1;
  /*const gst = math.chain(100.23).multiply(10.).divide(100).round(3).done();
  const total = math.chain(100.23).multiply(10.).divide(100).add(100.23);*/
  const computePrice = {
    price: math.round(req.body.price,2),
    gst: math.round(gst,2),
    total: math.round(total,2)
  };
  const document = await MyModel.findByIdAndUpdate(req.params.id, computePrice, { new: true });
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