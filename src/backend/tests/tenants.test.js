const request = require('supertest');
const {Tenant} = require('../models/tenant');

let server;

describe('/api/v1/tenants', () => {
    beforeEach( () => { server = require('../index');} ); 
    afterEach( async () => { server.close();await Tenant.remove({}) } );

    describe('POST/', () => {
        it('should add a new tenant and return this object' , async() => {
            const tenant = {
                firstname: 'nicky',
                lastname: 'name1',
                email: 'nicky.larson@gmail.com',
                password: 'Pass11fdgdfdg0',
                isAdmin: true
            };
            const res = await request(server)
            .post('/api/v1/tenants/')
            .set('Content-Type','application/json')
            .send(tenant);
            const tenantInDB = await Tenant.find({email: 'nicky.larson@gmail.com'});
            expect( tenantInDB ).not.toBeNull();
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('firstname','nicky');
            expect(res.body).toHaveProperty('email','nicky.larson@gmail.com'); 
        });
        it('should not add a new tenant given he is already inside' , async() => {
            const tenantDB = new Tenant({
                firstname: 'nicky',
                lastname: 'name1',
                email: 'nicky.larson@gmail.com',
                password: 'Pass11fdgdfdg0',
                isAdmin: true
            });
            await tenantDB.save();
            const tenant = {
                firstname: 'nicky',
                lastname: 'name1',
                email: 'nicky.larson@gmail.com',
                password: 'Pass11fdgdfdg0',
                isAdmin: true
            };
            const res = await request(server)
            .post('/api/v1/tenants/')
            .set('Content-Type','application/json')
            .send(tenant);
            expect(res.status).toBe(400);
        });
    });

    
    describe('GET / as an Admin', () => {
        it('should return a list of all the tenants when the db has several recors' , async  () => {
            const admin = new Tenant({
                firstname: 'first3',
                lastname: 'name1',
                email: 'first3.name1@gmail.com',
                password: 'Pass31?',
                isAdmin: true
            });
            const token = admin.generateAuthToken();
            await Tenant.collection.insertMany(
                [{ firstname:'first1',
                  lastname: 'name1',
                  email: 'first1.name1@gmail.com',
                  password: 'Pass11?',
                  isAdmin: true
                },
                { firstname:'first2',
                  lastname: 'name1',
                  email: 'first2.name1@gmail.com',
                  password: 'Pass21?',
                  isAdmin: false
                }]
            );
            const res = await request(server)
            .get('/api/v1/tenants/')
            .set('x-auth-token',token);
            //expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some( tenant => tenant.firstname === 'first1')).toBeTruthy();
        })
        it('should return a 404 if there is no entry' , async  () => {
            const admin = new Tenant({
                firstname: 'first3',
                lastname: 'name1',
                email: 'first3.name1@gmail.com',
                password: 'Pass31?',
                isAdmin: true
            });
            const token = admin.generateAuthToken();
            const res = await request(server)
            .get('/api/v1/tenants/')
            .set('x-auth-token',token);
            expect(res.status).toBe(404);
        })
        it('should return a 401 if we forgot the JWT' , async  () => {
            const admin = new Tenant({
                firstname: 'first3',
                lastname: 'name1',
                email: 'first3.name1@gmail.com',
                password: 'Pass31?',
                isAdmin: true
            });
            const res = await request(server)
            .get('/api/v1/tenants/');
            expect(res.status).toBe(401);
        })
    });
    /*describe('GET /me', () => {
        it('should return my tenant account' , async () => {
            const me = new Tenant({
                firstname: 'first1',
                lastname: 'name1',
                email: 'first1.name1@gmail.com',
                password: 'Pass11?',
                isAdmin: true
            });
            const token = me.generateAuthToken();
            await me.save();
            const res = await request(server)
            .get('/api/v1/tenants/me')
            .set('x-auth-token',token);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('firstname',me.firstname);
        })
        it('should return my tenant account' , async () => {
            const res = await request(server).get('/api/v1/tenants/me');
            expect(res.status).toBe(404);
            //expect(res.body).toHaveProperty('firstname',me.firstname);
        })
    });
    describe('UPDATE', () => {

    });
    describe('DELETE', () => {

    });*/
});