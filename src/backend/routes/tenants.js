// Code checked the 20/09/2018 r1
const validateObjectId = require('../middleware/isValidId');
const asyncMiddleware = require('../middleware/async');
const auth     = require('../middleware/auth');
const admin    = require('../middleware/admin');
const _        = require('lodash');
const bcrypt   = require('bcrypt');
const dbgDbT   = require('debug')('app:dbtenants');
const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const { Tenant, validate, complexity } = require('../models/tenant');

// CREATE - POST
router.post('/', asyncMiddleware( async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  /*const { error2 } = complexity(req.body.password);
  if (error2) {
    res.status(400);
    res.send(error.details[0].message);
    return;
  }*/
  let document = await Tenant.findOne({ email: req.body.email });
  if (document) {
    return res.status(400).send("Tenant already registered");
  }
  document = new Tenant(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(document.password, salt);
  document.password = hashed;
  dbgDbT("POST save ", document);
  document = await document.save();
  dbgDbT("POST send ", document);
  //_.pick( document , [ 'password','firstname', 'lastname', 'email'])
  const token = document.generateAuthToken();
  res.header('x-auth-token', token).status(201).send(document);
}));

// READ - GET (ITS TENANT DATA)
router.get('/me', auth, asyncMiddleware(async (req, res) => {
  const document = await Tenant.findById(req.tenant._id).select('-password');
  res.send(document);
}));

// UPDATE (ITS TENANT DATA)
router.put('/me', auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const document = await Tenant.findByIdAndUpdate(req.tenant._id, req.body, { new: true });
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(document);
}));

// DELETE (ITS TENANT DATA)
router.delete('/me', auth, asyncMiddleware(async (req, res) => {
  const document = await Tenant.findByIdAndRemove(req.tenant._id);
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(204).send(document);
}));

// READ - GET (ALL THE TENANTS AS AN ADMIN/SUPPORT)
router.get('/', [auth, admin], asyncMiddleware(async (req, res) => {
  const documents = await Tenant.find().sort({ lastname: 1, firstname: 1 });
  /*const pageNumber = 1; const pageSize   = 10; const position   = (pageNumber-1) * pageSize; .skip( position ).limit( pageSize ) */
  if (!documents || (Array.isArray(documents) && documents.length===0)) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(documents);
}));

// READ - GET (A SPECIFIC TENANT AS AN ADMIN/SUPPORT)
router.get('/:id', [auth, admin, validateObjectId], asyncMiddleware(async (req, res) => {
  const document = await Tenant.findById(req.params.id);
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(document);
}));

// UPDATE - UPDATE (A SPECIFIC TENANT AS AN ADMIN/SUPPORT)
router.put('/:id', [auth, admin, validateObjectId], asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const document = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(document);
}));

// UPDATE - PATCH (A SPECIFIC TENANT AS AN ADMIN/SUPPORT)
router.patch('/:id', [ auth , admin, validateObjectId ] , asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const document = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(document);
}));

// DELETE (A SPECIFIC TENANT AS AN ADMIN/SUPPORT)
router.delete('/:id', [auth, admin, validateObjectId], asyncMiddleware(async (req, res) => {
  const document = await Tenant.findByIdAndRemove(req.params.id);
  if (!document) {
    return res.status(404).send("Not found");
  }
  res.status(204).send(document);
}));

// DELETE (ALL TENANTS AS AN ADMIN)
router.delete('/', [ auth , admin ] , asyncMiddleware(async (req, res) => {
  const result = await Tenant.deleteMany({});
  if (!result) {
    return res.status(404).send("Not found");
  }
  res.status(204).send(document);
}));

module.exports = router;