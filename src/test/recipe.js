//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

import server from "../app";
import chai from "chai";
import chaiHttp from 'chai-http';
const User = require('../../server/models').Recipe
// var request = require('superagent');supertest
import request from 'supertest';
// const should = chai.should();
import should from 'should';
// let should = require('should/as-function');
import expect from "expect";
chai.use(chaiHttp);
let assert = require('assert');
