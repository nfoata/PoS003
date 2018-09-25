const Joi = require('joi');
const mongoose = require('mongoose');
const math       = require('mathjs')

const mongoSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now },
  lastModificationDate: { type: Date },
  price: {
    type: Number,
    required: true,
    min: 0,
    get: v => math.round(v,2),
    set: v => math.round(v,2),
    // Here we could use this function to compute
    // on the fly the gst and the total from the price
    // but this not the exercise
    validate: {
      validator: function (value) {
        return value >= 0 && value < 1000000000000;
      },
      message: "The price must be in the following interval [0,1000000000000["
    }
  },
  gst: {
    type: Number,
    required: false,
    min: 0,
    get: v => math.round(v,2),
    set: v => math.round(v,2),
  },
  total: {
    type: Number,
    required: false,
    min: 0,
    get: v => math.round(v,2),
    set: v => math.round(v,2),
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Price = mongoose.model('price', mongoSchema);

function validateJson(body) {
  const schema = {
    price: Joi.number().required(), //regex(/^[0-9]{1,10}\.{0,1}[0-9]{0,2}$/).required(),
    gst:   Joi.number(), //regex(/^[0-9]{1,10}\.{0,1}[0-9]{0,2}$/),
    total: Joi.number(), //regex(/^[0-9]{1,10}\.{0,1}[0-9]{0,2}$/)
  };
  return Joi.validate(body, schema);
}

function validateDeep(req){
  let e = null;
  const sprice = ''+req.price;
  if (!sprice.match(/^[0-9]{1,10}\.{0,1}[0-9]{0,2}$/) ) {
    e = 'Price field does not match a correct price number.\n'; 
  }
  if ( req.gst ) {
    const sgst = ''+req.gst;
    if (!sgst.match(/^[0-9]{1,10}\.{0,1}[0-9]{0,2}$/) ) {
      e += 'GST field does not match a correct number.\n'; 
    }
  }
  if ( req.total ) {
    const stotal = ''+req.total;
    if (!stotal.match(/^[0-9]{1,10}\.{0,1}[0-9]{0,2}$/) ) {
      e += 'Total field does not match a correct number.\n'; 
    }
  }
  return e;
}

module.exports.MyModel = Price;
module.exports.validate = validateJson;
module.exports.validateDeep = validateDeep;