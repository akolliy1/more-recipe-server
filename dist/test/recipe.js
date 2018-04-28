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

var User = require('../../server/models').Recipe;
// var request = require('superagent');supertest

// const should = chai.should();

// let should = require('should/as-function');

_chai2.default.use(_chaiHttp2.default);
var assert = require('assert');