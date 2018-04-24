//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
import server from "../../app"
import { validUser } from "../../../server/seeders/testseederdata";
import chai, { expect } from "chai";
import chaiHttp from 'chai-http';
import { User } from "../../../server/models";
import request from 'supertest';
const should = chai.should();
chai.use(chaiHttp);
let assert = require('assert');

describe('Users', () => {
    before((done) => {
        User.destroy({
            cascade: true,
            truncate: true,
            restartIdentity: true
        });
        User.create(validUser)
            .then(() => {
                done();
            });
    });
    describe("get('/')", function () {
        describe("it should GET / homepage route", function () {
            it("should return status code 200 when value is present", function (done) {
                chai.request(server)
                    .get('/')
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        if (err) done(err);
                        else 
                        expect(res.statusCode).to.equal(200)
                        setImmediate(done);
                    })
            })
        })
    })
    describe("get('/api')", function () {
        describe("it should GET / Api route", function () {
            it("should return status code 200 when value is present", function (done) {
                request(server)
                    .get('/api')
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        if (err) done(err);
                        else 
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.message).to.be.a('string')
                        setImmediate(done);
                    })
            })
        })
    })
    describe("User signUp route", () => {
        describe('User validation name Error', () => {

                it('should reject name', (done) => {
                chai.request(server)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: 'ay',
                    username: 'akolliys',
                    email: 'akolade@exaple.com',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    expect(res.body[0]).deep.equal({
                        message: 'Name should be atleast 3 character',
                        field: 'name'
                    })
                    setImmediate(done)
                })
            });

            it('should return Invalid name, ensure you name contain only alphabets and no illegal spacing', 
            (done) => {
                chai.request(server)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: ' akool ',
                    username: 'akolliys',
                    email: 'akolade@example.com',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    expect(res.body[0]).deep.equal({
                        message: 'Invalid name, ensure you name contain only alphabets and no illegal spacing',
                        field: 'name'
                    })
                    setImmediate(done)
                })
            })
        });

        describe('Username details', () => {
            it('username should be atleast 6 characters', (done) => {
                chai.request(server)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: 'adesanmi akolade',
                    username: 'ak',
                    email: 'akolade@example.com',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    expect(res.body[0].message).to.equal('Username should be atleast 6 characters')
                    expect(res.body[0].field).to.equal('username')
                    setImmediate(done)
                })
            });

            it('should return Invalid Username, kindly ensure your username is alphanumeric and no spacing', (done) => {
                chai.request(server)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: 'adesanmi akolade',
                    username: ' akolliys',
                    email: 'akolade@example.com',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    expect(res.body[0]).deep.equal({
                        message: 'Invalid Username, kindly ensure your username is alphanumeric and no spacing',
                        field: 'username'
                    })
                    setImmediate(done)
                })
            })
        });
        
        describe('Email details', () => {
            it('should return Please input a valid Email Adrress', (done) => {
                chai.request(server)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: 'adesanmi akolade',
                    username: 'akolliys',
                    email: ' akolade@example.com',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    expect(res.body[0].message).to.equal('Please input a valid Email Adrress')
                    expect(res.body[0].field).to.equal('email')
                    setImmediate(done)
                })
            });

            it('should return Please input a valid Email Adrress with @', (done) => {
                chai.request(server)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: 'adesanmi akolade',
                    username: 'akolliys',
                    email: 'akoladeexample.com',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    expect(res.body[0].message).to.equal('Please input a valid Email Adrress')
                    expect(res.body[0].field).to.equal('email')
                    setImmediate(done)
                })
            });
        })

        describe('Password details', () => {
            it('should return Please input a valid password with atleast 8 characters', (done) => {
                chai.request(server)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: 'adesanmi akolade',
                    username: 'akolliys',
                    email: 'akolade@example.com',
                    password: 'akool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    expect(res.body[0].message).to.equal('Please input a valid password with atleast 8 characters')
                    expect(res.body[0].field).to.equal('password')
                    setImmediate(done)
                })
            });

            it('should return Invalid password, ensure your password contain only uppercase, lowercase or any special character', (done) => {
                chai.request(server)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: 'adesanmi akolade',
                    username: 'akolliys',
                    email: 'akolade@example.com',
                    password: ' akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    expect(res.body[0].message).to.equal('Invalid password, ensure your password contain only uppercase, lowercase or any special character')
                    expect(res.body[0].field).to.equal('password')
                    setImmediate(done)
                })
            });
        })

        it("should create user correct details", (done) => {
            chai.request(server)
            .post('/api/v1/users/signup')
            .set('Accept', 'application/json')
            .send({
                name: 'akolade adesanmi',
                username: 'akolliys',
                email: 'akolade@example.com',
                password: 'akooooool'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body.message).to.equal('User created successfully')
                expect(res.body.success).to.equal(true)
                expect(res.body).to.have.deep.keys(
                    'success', 'message', "user"
                )
                setImmediate(done);
            })
        });

        it("should return username already exist", (done) => {
            chai.request(server)
            .post('/api/v1/users/signup')
            .set('Accept', 'application/json')
            .send({
                name: 'akolade adesanmi',
                username: 'akolliys',
                email: 'akolade1@example.com',
                password: 'akooooool'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body.message).to.equal('Username already exist')
                expect(res.body).to.have.deep.keys(
                    'success', 'message'
                )
                setImmediate(done);
            })
        });

        it("should return email already exist", (done) => {
            chai.request(server)
            .post('/api/v1/users/signup')
            .set('Accept', 'application/json')
            .send({
                name: 'akolade adesanmi',
                username: 'akolliyz',
                email: 'akolade@example.com',
                password: 'akooooool'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body.message).to.equal('Email already exist')
                expect(res.body).to.have.deep.keys(
                    'success', 'message'
                )
                setImmediate(done);
            })
        });
    });
    
    describe('User signin', () => {
        describe('signin Error', () => {
            it('should return username cannot contain space',(done) => {
                chai.request(server)
                .post('/api/users/signin')
                .set('Accept', 'application/json')
                .send({
                    username: ' ak',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401)
                    expect(res.body).deep.equal({
                        field: 'username',
                        message: 'Username should contain lower and upper character and no spacing'
                    })
                })
            });

            it('should return username cannot be less than 3 characters',(done) => {
                chai.request(server)
                .post('/api/users/signin')
                .set('Accept', 'application/json')
                .send({
                    username: 'ak',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401)
                    expect(res.body).deep.equal({
                        field: 'username',
                        message: 'Username character must be atleast 3'
                    })
                })
            });

            it('should check for username existence', (done) => {
                chai.request(server)
                .post('/api/users/signin')
                .set('Accept', 'application/json')
                .send({
                    username: 'akolli',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401)
                    expect(res.body).deep.equal({
                        success: false,
                        message: 'User not found'
                    })
                    setImmediate(done)
                })
            });

            it('should return Invalid Email when there is space at the beginin', (done) => {
                chai.request(server)
                .post('/api/users/signin')
                .set('Accept', 'application/json')
                .send({
                    email: ' akolade@example.com',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401)
                    expect(res.body).deep.equal({
                        success: false,
                        message: 'email must be standard'
                    })
                    setImmediate(done)
                })
            });

            it('should return Invalid Email when there is no @', (done) => {
                chai.request(server)
                .post('/api/users/signin')
                .set('Accept', 'application/json')
                .send({
                    email: 'akoladeexample.com',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401)
                    expect(res.body).deep.equal({
                        success: false,
                        message: 'email must be standard'
                    })
                    setImmediate(done)
                })
            })

            it('should Signin user with username', (done) => {
                chai.request(server)
                .post('/api/users/signin')
                .set('Accept', 'application/json')
                .send({
                    username: 'akolliys',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body).to.have.all.deep.keys(
                        "success","message","token","user"
                    )
                    setImmediate(done)
                })
            })

            it('should signin user with correct Email', (done) => {
                chai.request(server)
                .post('/api/users/signin')
                .set('Accept', 'application/json')
                .send({
                    email: 'akolade@example.com',
                    password: 'akooooool'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body).to.have.all.deep.keys(
                        "success","message","token","user"
                    )
                    setImmediate(done)
                })
            })
        })
    })
    
})
