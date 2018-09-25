// Code checked the 20/09/2018 r1 but warning on schema
const Joi        = require('joi');     
const PassComplx = require('joi-password-complexity');
const mongoose   = require('mongoose');
const jwt        = require('jsonwebtoken');
const config     = require('config');

//Missing encryption of sensitive data (GDPR)
const mongoSchema = new mongoose.Schema( {
    firstname: { 
        type: String , 
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
        match: /[A-Za-z '"]+/
    },
    lastname: { 
        type: String , 
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
        match: /[A-Za-z '"]+/
    },
    email: {
        type: String,
        unique:true,
        trim: true,
        minlength: 2,
        maxlength: 250
    },
    password: {
        type: String,
        unique:true
    },
    creationDate: { type: Date , default: Date.now },
    lastModificationDate: { type: Date , default: Date.now },
    isAdmin: Boolean
    //operations: [ { type:String , enum: ['del-price'] ] 
});

mongoSchema.methods.generateAuthToken = function() {
    const payload = { _id: this._id , isAdmin: this.isAdmin };
    const token = jwt.sign( payload , config.get('jwtPrivateKey'));
    return token;
};

const Tenant = mongoose.model( 'tenant' , mongoSchema );

// Validate the JSON coming from the HTTP body
function validateJson( body ) {
  const schema = {
      firstname: Joi.string().min(2).max(100).required(),
      lastname: Joi.string().min(2).max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(2).max(250).required(),
      isAdmin: Joi.boolean()
  };
  return Joi.validate( body , schema);
}

const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
}

async function validatePassComplx( password ){
    try {
        const result = await Joi.validate( password, new PassComplx(complexityOptions));
        return result;
    } catch( exception ) {
        return new Error(exception.message);
    }
}

module.exports.Tenant = Tenant;
module.exports.validate = validateJson;
module.exports.complexity = validatePassComplx;