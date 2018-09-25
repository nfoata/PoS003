const Joi = require('joi');
const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now },
  lastModificationDate: { type: Date },
  price: {
    type: Number,
    required: true,
    min: 0,
    set: v => Math.fround(v, 0.01),
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
    min: 0
  },
  total: {
    type: Number,
    required: false,
    min: 0
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Price = mongoose.model('price', mongoSchema);

function validateJson(body) {
  const schema = {
    price: Joi.number().required(),
    gst: Joi.number(),
    total: Joi.number()
  };
  return Joi.validate(body, schema);
}

module.exports.MyModel = Price;
module.exports.validate = validateJson;