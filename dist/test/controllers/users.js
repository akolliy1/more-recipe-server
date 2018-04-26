"use strict";

var _app = require("../../app");

var _app2 = _interopRequireDefault(_app);

var _testseederdata = require("../../../server/seeders/testseederdata");

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _models = require("../../../server/models");

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);
var assert = require('assert');

describe('Users', function () {
    before(function (done) {
        _models.User.destroy({
            cascade: true,
            truncate: true,
            restartIdentity: true
        });
        _models.User.create(_testseederdata.validUser).then(function () {
            done();
        });
    });
    describe("get('/')", function () {
        describe("it should GET / homepage route", function () {
            it("should return status code 200 when value is present", function (done) {
                _chai2.default.request(_app2.default).get('/').set('Accept', 'application/json').end(function (err, res) {
                    if (err) done(err);else (0, _chai.expect)(res.statusCode).to.equal(200);
                    setImmediate(done);
                });
            });
        });
    });
    describe("get('/api')", function () {
        describe("it should GET / Api route", function () {
            it("should return status code 200 when value is present", function (done) {
                (0, _supertest2.default)(_app2.default).get('/api').set('Accept', 'application/json').end(function (err, res) {
                    if (err) done(err);else (0, _chai.expect)(res.statusCode).to.equal(200);
                    (0, _chai.expect)(res.body.message).to.be.a('string');
                    setImmediate(done);
                });
            });
        });
    });
    describe("User signUp route", function () {
        describe('User validation name Error', function () {

            it('should reject name', function (done) {
                _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                    name: 'ay',
                    username: 'akolliys',
                    email: 'akolade@exaple.com',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(400);
                    (0, _chai.expect)(res.body[0]).deep.equal({
                        message: 'Name should be atleast 3 character',
                        field: 'name'
                    });
                    setImmediate(done);
                });
            });

            it('should return Invalid name, ensure you name contain only alphabets and no illegal spacing', function (done) {
                _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                    name: ' akool ',
                    username: 'akolliys',
                    email: 'akolade@example.com',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(400);
                    (0, _chai.expect)(res.body[0]).deep.equal({
                        message: 'Invalid name, ensure you name contain only alphabets and no illegal spacing',
                        field: 'name'
                    });
                    setImmediate(done);
                });
            });
        });

        describe('Username details', function () {
            it('username should be atleast 6 characters', function (done) {
                _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                    name: 'adesanmi akolade',
                    username: 'ak',
                    email: 'akolade@example.com',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(400);
                    (0, _chai.expect)(res.body[0].message).to.equal('Username should be atleast 6 characters');
                    (0, _chai.expect)(res.body[0].field).to.equal('username');
                    setImmediate(done);
                });
            });

            it('should return Invalid Username, kindly ensure your username is alphanumeric and no spacing', function (done) {
                _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                    name: 'adesanmi akolade',
                    username: ' akolliys',
                    email: 'akolade@example.com',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(400);
                    (0, _chai.expect)(res.body[0]).deep.equal({
                        message: 'Invalid Username, kindly ensure your username is alphanumeric and no spacing',
                        field: 'username'
                    });
                    setImmediate(done);
                });
            });
        });

        describe('Email details', function () {
            it('should return Please input a valid Email Adrress', function (done) {
                _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                    name: 'adesanmi akolade',
                    username: 'akolliys',
                    email: ' akolade@example.com',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(400);
                    (0, _chai.expect)(res.body[0].message).to.equal('Please input a valid Email Adrress');
                    (0, _chai.expect)(res.body[0].field).to.equal('email');
                    setImmediate(done);
                });
            });

            it('should return Please input a valid Email Adrress with @', function (done) {
                _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                    name: 'adesanmi akolade',
                    username: 'akolliys',
                    email: 'akoladeexample.com',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(400);
                    (0, _chai.expect)(res.body[0].message).to.equal('Please input a valid Email Adrress');
                    (0, _chai.expect)(res.body[0].field).to.equal('email');
                    setImmediate(done);
                });
            });
        });

        describe('Password details', function () {
            it('should return Please input a valid password with atleast 8 characters', function (done) {
                _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                    name: 'adesanmi akolade',
                    username: 'akolliys',
                    email: 'akolade@example.com',
                    password: 'akool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(400);
                    (0, _chai.expect)(res.body[0].message).to.equal('Please input a valid password with atleast 8 characters');
                    (0, _chai.expect)(res.body[0].field).to.equal('password');
                    setImmediate(done);
                });
            });

            it('should return Invalid password, ensure your password contain only uppercase, lowercase or any special character', function (done) {
                _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                    name: 'adesanmi akolade',
                    username: 'akolliys',
                    email: 'akolade@example.com',
                    password: ' akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(400);
                    (0, _chai.expect)(res.body[0].message).to.equal('Invalid password, ensure your password contain only uppercase, lowercase or any special character');
                    (0, _chai.expect)(res.body[0].field).to.equal('password');
                    setImmediate(done);
                });
            });
        });

        it("should create user correct details", function (done) {
            _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                name: 'akolade adesanmi',
                username: 'akolliys',
                email: 'akolade@example.com',
                password: 'akooooool'
            }).end(function (err, res) {
                (0, _chai.expect)(res.statusCode).to.equal(201);
                (0, _chai.expect)(res.body.message).to.equal('User created successfully');
                (0, _chai.expect)(res.body.success).to.equal(true);
                (0, _chai.expect)(res.body).to.have.deep.keys('success', 'message', "user");
                setImmediate(done);
            });
        });

        it("should return username already exist", function (done) {
            _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                name: 'akolade adesanmi',
                username: 'akolliys',
                email: 'akolade1@example.com',
                password: 'akooooool'
            }).end(function (err, res) {
                (0, _chai.expect)(res.statusCode).to.equal(409);
                (0, _chai.expect)(res.body.message).to.equal('Username already exist');
                (0, _chai.expect)(res.body).to.have.deep.keys('success', 'message');
                setImmediate(done);
            });
        });

        it("should return email already exist", function (done) {
            _chai2.default.request(_app2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
                name: 'akolade adesanmi',
                username: 'akolliyz',
                email: 'akolade@example.com',
                password: 'akooooool'
            }).end(function (err, res) {
                (0, _chai.expect)(res.statusCode).to.equal(409);
                (0, _chai.expect)(res.body.message).to.equal('Email already exist');
                (0, _chai.expect)(res.body).to.have.deep.keys('success', 'message');
                setImmediate(done);
            });
        });
    });

    describe('User signin', function () {
        describe('signin Error', function () {
            it('should return username cannot contain space', function (done) {
                _chai2.default.request(_app2.default).post('/api/users/signin').set('Accept', 'application/json').send({
                    username: ' ak',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(401);
                    (0, _chai.expect)(res.body).deep.equal({
                        field: 'username',
                        message: 'Username should contain lower and upper character and no spacing'
                    });
                });
            });

            it('should return username cannot be less than 3 characters', function (done) {
                _chai2.default.request(_app2.default).post('/api/users/signin').set('Accept', 'application/json').send({
                    username: 'ak',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(401);
                    (0, _chai.expect)(res.body).deep.equal({
                        field: 'username',
                        message: 'Username character must be atleast 3'
                    });
                });
            });

            it('should check for username existence', function (done) {
                _chai2.default.request(_app2.default).post('/api/users/signin').set('Accept', 'application/json').send({
                    username: 'akolli',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(401);
                    (0, _chai.expect)(res.body).deep.equal({
                        success: false,
                        message: 'User not found'
                    });
                    setImmediate(done);
                });
            });

            it('should return Invalid Email when there is space at the beginin', function (done) {
                _chai2.default.request(_app2.default).post('/api/users/signin').set('Accept', 'application/json').send({
                    email: ' akolade@example.com',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(401);
                    (0, _chai.expect)(res.body).deep.equal({
                        success: false,
                        message: 'email must be standard'
                    });
                    setImmediate(done);
                });
            });

            it('should return Invalid Email when there is no @', function (done) {
                _chai2.default.request(_app2.default).post('/api/users/signin').set('Accept', 'application/json').send({
                    email: 'akoladeexample.com',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(401);
                    (0, _chai.expect)(res.body).deep.equal({
                        success: false,
                        message: 'email must be standard'
                    });
                    setImmediate(done);
                });
            });

            it('should Signin user with username', function (done) {
                _chai2.default.request(_app2.default).post('/api/users/signin').set('Accept', 'application/json').send({
                    username: 'akolliys',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(200);
                    (0, _chai.expect)(res.body).to.have.all.deep.keys("success", "message", "token", "user");
                    setImmediate(done);
                });
            });

            it('should signin user with correct Email', function (done) {
                _chai2.default.request(_app2.default).post('/api/users/signin').set('Accept', 'application/json').send({
                    email: 'akolade@example.com',
                    password: 'akooooool'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(200);
                    (0, _chai.expect)(res.body).to.have.all.deep.keys("success", "message", "token", "user");
                    setImmediate(done);
                });
            });
        });
    });
});