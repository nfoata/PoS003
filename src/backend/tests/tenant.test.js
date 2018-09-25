const { Tenant, validate, complexity } = require('../models/tenant');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('generateAuthToken', () => {
    it('should be generate a correct Token', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const tenant = new Tenant(payload);
        const token = tenant.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
});


describe('validate', () => {

    it('should be false with json: null', () => {
        const { error } = validate(null);
        expect(error).toBeDefined();
    });

    it('should be false with json: empty', () => {
        const json = {};
        const { error } = validate(null);
        expect(error).toBeDefined();
    });

    it('should be false with json: false', () => {
        const json = { id: 'toto' };
        const { error } = validate(json);
        expect(error).toBeDefined();
    });

    it('should be false with json: firstname missing', () => {
        const json = {
            lastname: 'Foata',
            email: 'nicolas.foata@gmail.com',
            password: '1234'
        };
        const { error } = validate(json);
        expect(error).toBeDefined();
    });

    it('should be false with json: lastname missing', () => {
        const json = {
            firstname: 'N',
            email: 'nicolas.foata@gmail.com',
            password: '1234'
        };
        const { error } = validate(json);
        expect(error).toBeDefined();
    });

    it('should be false with json: email missing', () => {
        const json = {
            firstname: 'N',
            lastname: 'Foata',
            password: '1234'
        };
        const { error } = validate(json);
        expect(error).toBeDefined();
    });

    it('should be false with json: password missing', () => {
        const json = {
            firstname: 'N',
            lastname: 'Foata',
            email: 'nicolas.foata@gmail.com'
        };
        const { error } = validate(json);
        expect(error).toBeDefined();
    });

    it('should be false with json: isAdmin missing', () => {
        const json = {
            firstname: 'N',
            lastname: 'Foata',
            email: 'nicolas.foata@gmail.com'
        };
        const { error } = validate(json);
        expect(error).toBeDefined();
    });

    it('should be false with json: firstname error too short', () => {
        const json = {
            firstname: 'N',
            lastname: 'Foata',
            email: 'nicolas.foata@gmail.com',
            password: '1234'
        };
        const { error } = validate(json);
        expect(error).toBeDefined();
    });

    it('should be false with json: lasttname error too short', () => {
        const json = {
            firstname: 'Nicolas',
            lastname: 'F',
            email: 'nicolas.foata@gmail.com',
            password: '1234'
        };
        const { error } = validate(json);
        expect(error).toBeDefined();
    });

    it('should be false with json: false email', () => {
        const json = {
            firstname: 'Nicolas',
            lastname: 'Foata',
            email: 'nicolas.foata@gmailcom',
            password: '1234'
        };
        const { error } = validate(json);
        expect(error).toBeDefined();
    });

    it('should be false with json: full normal json', () => {
        const json = {
            firstname: 'Nicolas',
            lastname: 'Foata',
            email: 'nicolas.foata@gmail.com',
            password: '1234'
        };
        const { error } = validate(json);
        expect(error).toBeNull();
    });

    it('should be false with json: full no admin json', () => {
        const json = {
            firstname: 'Nicolas',
            lastname: 'Foata',
            email: 'nicolas.foata@gmail.com',
            password: '1234',
            isAdmin: false
        };
        const { error } = validate(json);
        expect(error).toBeNull();
    });

    it('should be false with json: full admin json', () => {
        const json = {
            firstname: 'Nicolas',
            lastname: 'Foata',
            email: 'nicolas.foata@gmail.com',
            password: '1234',
            isAdmin: true
        };
        const { error } = validate(json);
        expect(error).toBeNull();
    });
});

describe('complexity', () => {

    it('should be false with a null password', () => {
        const password = "1";
        const result = complexity(null);
        //console.error('RES', result);
       // console.log('RES', result);
        //expect(result).toBeFalsy;
        //throw new Error( result );
    });

    it('should be true with a correct password', () => {
        /* const password = 'N56hf_-jk';
         const result = await complexity(null);
         //expect( result ).toBeTruthy;
         console.log('RES', result);
         expect( result ).toReturn();*/
    });

    /*it('should be false with ', () => {
         const args = [ null, undefined, NaN, false];
         args.forEach( arg => {
             expect( ()=>{ complexity(arg)} ).toThrowError();
         });
     });*/


    it('should be mock', () => {

        /*const mockFunction = jest.fn();
        /*mockFunction.return...tenant

        call your function

        expect( mockFunction ).toHaveBeenCalled();*/
    })
});