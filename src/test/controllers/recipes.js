//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
import server from "../../app"
import { validUser } from "../../../server/seeders/testseederdata";
import chai, { expect } from "chai";
import chaiHttp from 'chai-http';
import { Recipe } from "../../../server/models";
import request from 'supertest';
const should = chai.should();
chai.use(chaiHttp);
let assert = require('assert');
