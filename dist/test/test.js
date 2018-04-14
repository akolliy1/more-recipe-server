"use strict";

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

var _should = require("should");

var _should2 = _interopRequireDefault(_should);

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var User = require('../../server/models').User;
// var request = require('superagent');supertest

// const should = chai.should();

// let should = require('should/as-function');

_chai2.default.use(_chaiHttp2.default);
var assert = require('assert');
// const User = require('../models').User;
// User.hosts.modelName = 'Hosts'
// User.victims.modelName = 'Victims'
// let models = [User.hosts, User.victims]

describe('Users', function () {
    beforeEach(function (done) {
        User.destroy({ where: { id: [1, 2, 3] } }).then(function () {
            done();
        });
    });
    describe("get('/')", function () {
        describe("it should GET / homepage route", function () {
            it("should return status code 200 when value is present", function (done) {
                (0, _supertest2.default)(_app2.default).get('/').expect(200).end(function (err, res) {
                    if (err) done(err);else setImmediate(done);
                });
            });
        });
    });
    describe("get('/api')", function () {
        describe("it should GET / Api route", function () {
            it("should return status code 200 when value is present", function (done) {
                (0, _supertest2.default)(_app2.default).get('/api').expect(200).end(function (err, res) {
                    if (err) done(err);else setImmediate(done);
                });
            });
        });
    });
    describe("get('/api/users')", function () {
        describe("it should GET /api/users route", function () {
            it("should return status code 200 when get value is present", function (done) {
                (0, _supertest2.default)(_app2.default).get('/api/users').expect(200).end(function (err, res) {
                    if (err) done(err);else setImmediate(done);
                });
            });
        });
    });
    describe("post('/api/users')", function () {
        describe("it should POST /api/users route", function () {
            it("should return status code 201 when Posted value is not present", function (done) {
                var person = {
                    name: "sean",
                    username: "akolliy1",
                    email: "J.R.R.Tolkien@gmail.com",
                    password: 'ball1954'
                };
                (0, _supertest2.default)(_app2.default).post('/api/users').expect(201);
                User.create(person).then(function (err, res) {
                    console.log(res);
                    done();
                });
                // .then(function (user) {
                //     //victim name should be equivalent to the fake submission we are using
                //     expect(user.name).toEqual("sean");
                //     expect(user.email).toBe('J.R.R.Tolkien@gmail.com')
                //     expect(201).toEqual(201);
                //     console.log(user)
                //     //remove the entry from the database
                //     User.destroy({
                //         where: {
                //             id: user.id
                //         }
                //     }).then(function (res) {
                //         expect(204).toEqual(204)
                //         done();
                //     })
                // })
            });
        });
    });
});
// describe("put(/api/users/:userId)", function () {
//     describe("it should PUT /api/users/:userId route", function () {
//         it("should return status code 200 when value is present", function (done) {
//             request(server)
//                 .put('/api/users/:userId')
//                 .expect(400)
//                 .end((err, res) => {
//                     if (err) done(err);
//                     else setImmediate(done);
//                 })
//         })
//     })
// })

// describe("post('/api/users')", function () {
//     it("it should not POST a user without pages field and status code 201", function (done) {
//             // let User = {
//             //     name: "The Lord of the Rings",
//             //     email: "J.R.R.Tolkien@gmail.com",
//             //     password: 'ball1954'
//             // }
//         // 'use strict';
//         // module.exports = {
//         //     up: (queryInterface, Sequelize) => {
//         //         return queryInterface.createTable('Users', {
//         //             id: 1,
//         //             name: "The Lord of the Rings",
//         //             email: "J.R.R.Tolkien@gmail.com",
//         //             password: 'ball1954',
//         //             createdAt: Date,
//         //             updatedAt: Date
//         //         });
//         //     },
//         //     down: (queryInterface /*, Sequelize */) => {
//         //         return queryInterface.dropTable('Users');
//         //     }
//         // };
//             request(server)
//                 .post('/api/users')
//                 // .create(User)
//                 .send({
//                     name: 'John Doe',
//                     email: 'johndoe@example.com',
//                     password: 'akool122'
//                 })
//                 .expect(400)
//                 .end((err, res) => {
//                     if (err) done(err);
//                     else setImmediate(done);
//                 })
//     })
// })
// 


// describe("get('/b') ", () => {
//     it('it should GET all unavailable route', (done) => {
//             chai.request(server)
//             .get('/b')
//             // .expect(200)
// //             // .expect('Content-Type', /json/)
//             .end((err, res) => {
//                 expect(200).toEqual(200);
// //                 // expect()
//                 if (err) {
//                     throw err
//                 }
//                 done();
//             });
//     });
// });
// describe('* catch unavailable route', () => {
//     it('it should GET all unavailable route', (done) => {
//             chai.request(server)
//             .get('/')
//             // .expect(200)
//             // .expect('Content-Type', /json/)
//             .end((err, res) => {
//                 expect(200).toEqual(200);
//                 // expect()
//                 if (err) {
//                     throw new err(function () {
//                         return("expect 200")
//                     })
//                 }
//                 done();
//             });
//     });
// });


// describe("Creating default catch all route", function () {
//     describe("app.get('*')", function () {
//         it("should return default route ,make sure is not place up of other route", (done) => {
//             request(server)
//             .get('*')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 done()
//             })
//         })
//     })
// })


// describe("Creating Array test", function () {
//     describe("#indexOf()", function () {
//         it("should return return -1 when value is not present", function(done){
//             assert.equal([1,2,3].indexOf(4),-1);
//             setImmediate(done)
//         })
//     })
// })
// .end((err, res) => {
//     expect(200);
//     expect('array');
//     done()
// })