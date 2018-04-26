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
var token = void 0;
describe("Recipe", function () {
    before(function (done) {
        _models.Recipe.destroy({
            truncate: true,
            cascade: true,
            restartIdentity: true
        }).then(function () {
            (0, _testseederdata.insertUserSeed)();
            token = _testseederdata.user1token;
            done();
        });
    });

    describe('creating Recipe', function () {
        describe('Get Recipe', function () {
            it('should return all recipes', function (done) {
                _chai2.default.request(_app2.default).get('/recipes').set('Accept', 'application/json').set('x-access-token', token).end(function (err, res) {
                    (0, _chai.expect)(res.statusCode).to.equal(404);
                    (0, _chai.expect)(res.body.success).to.equal(true);
                    (0, _chai.expect)(res.body.message).to.equal('Nothing found!');
                    done();
                });
            });

            it('should return few recipes on pagination', function (done) {
                _chai2.default.request(_app2.default).get('/recipes?page=0').set('Accept', 'application/json').set('x-access-token', token).end(function (err, res) {
                    (0, _chai.expect)(res.status).to.equal(200);
                    (0, _chai.expect)(res.body.recipeData).to.be.an('array');
                    (0, _chai.expect)(res.body.pages).to.be.a('number');
                    (0, _chai.expect)(res.body.success).to.equal(true);
                    (0, _chai.expect)(res.body.recipeData[0]).to.have.deep.keys(name, id, imageUrl, imageId, viewCount, upvotes, downvotes, ingredients, createdAt, updatedAt, userId);
                    setImmediate(done);
                });
            });
        });
        describe('create recipe with incomplete data', function () {

            it("should be non spacing characters in name", function (done) {
                _chai2.default.request(_app2.default).post('/recipes').set('Accept', 'application/json').send({
                    token: token,
                    name: ' Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.status).to.equal(400);
                    (0, _chai.expect)(res.body).deep.equal({
                        success: false,
                        message: 'Name colunm must contain only alphanumeral',
                        field: 'name'
                    });
                    setImmediate(done);
                });
            });

            it("should return name cannot be less than 3 and greater 100", function (done) {
                _chai2.default.request(_app2.default).post('/recipes/create/').set('Accept', 'application/json').send({
                    token: token,
                    name: 'Fr',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.status).to.equal(400);
                    (0, _chai.expect)(res.body).deep.equal({
                        success: false,
                        message: 'Name must be between 3 to 100',
                        field: 'name'
                    });
                    setImmediate(done);
                });
            });

            it("should return ingredient must be between 10 to 100 character", function (done) {
                _chai2.default.request(_app2.default).post('/recipes/create/').set('Accept', 'application/json').send({
                    token: token,
                    name: ' Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.status).to.equal(400);
                    (0, _chai.expect)(res.body).deep.equal({
                        success: false,
                        message: 'ingredient must be between 10 to 100 character',
                        field: 'ingredients'
                    });
                    setImmediate(done);
                });
            });

            it("should return procedure must be between 10 to 1000 character", function (done) {
                _chai2.default.request(_app2.default).post('/recipes/create/').set('Accept', 'application/json').send({
                    token: token,
                    name: ' Fried Rice',
                    procedure: 'Put',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.status).to.equal(400);
                    (0, _chai.expect)(res.body).deep.equal({
                        success: false,
                        message: 'procedure must be between 10 to 1000 character',
                        field: 'ingredients'
                    });
                    setImmediate(done);
                });
            });

            it("should return procedure must not have spacing at last character but fullstop", function (done) {
                _chai2.default.request(_app2.default).post('/recipes/create/').set('Accept', 'application/json').send({
                    token: token,
                    name: ' Fried Rice',
                    procedure: 'Put ',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.status).to.equal(400);
                    (0, _chai.expect)(res.body).deep.equal({
                        success: false,
                        message: 'procedure must be between 10 to 1000 character',
                        field: 'ingredients'
                    });
                    setImmediate(done);
                });
            });

            it("should return description cannot be less than 10 and greater than 2000", function (done) {
                _chai2.default.request(_app2.default).post('/recipes/create/').set('Accept', 'application/json').send({
                    token: token,
                    name: 'Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the',
                    ingredients: 'water,salt , rice'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.status).to.equal(400);
                    (0, _chai.expect)(res.body).deep.equal({
                        field: 'description',
                        success: false,
                        message: 'description cannot be less than 10 and greater than 2000'
                    });
                    setImmediate(done);
                });
            });

            it("should create recipe successfuly", function (done) {
                _chai2.default.request(_app2.default).post('/recipes/create/').set('Accept', 'application/json').send({
                    token: token,
                    name: 'Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,,salt,,rice'
                }).end(function (err, res) {
                    (0, _chai.expect)(res.status).to.equal(201);
                    (0, _chai.expect)(res.body.recipe.name).to.equal('Fried Rice');
                    (0, _chai.expect)(res.body.recipe.ingredients).to.equal('water,,salt,,rice');
                    (0, _chai.expect)(res.body.recipe.description).to.equal('Just the way you like it');
                    (0, _chai.expect)(res.body.recipe.procedure).to.equal('Put the rice in water wash it well and have it in your plate');
                    setImmediate(done);
                });
            });
        });
    });
});