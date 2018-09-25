const asyncMiddleware = require('../middleware/async');
const jwt        = require('jsonwebtoken');
const config     = require('config');
const _          = require('lodash');
const bcrypt     = require('bcrypt');
const dbgDbT     = require('debug')('app:dbtenants');
const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const {Tenant}   = require('../models/tenant');
const Joi        = require('joi'); 

function validate( body ) {
    const schema = {
        email: Joi.string().min(2).max(250).required(),
        password: Joi.string().min(2).max(250).required()
    };
    return Joi.validate( body , schema);
  }
  
// CREATE - POST
router.post( '/' , asyncMiddleware( async (req,res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let document = await Tenant.findOne({ email: req.body.email });
  if (!document) {
    return res.status(400).send("Invalid email or password");
  }
  const validPassword = bcrypt.compare(req.body.email, document.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }
  const payload = { _id: document._id , isAdmin: document.isAdmin};
  const token = jwt.sign(payload, config.get('jwtPrivateKey'));
  res.status(200).send({token: token});
}));

module.exports = router;