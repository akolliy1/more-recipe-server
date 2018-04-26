//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
import server from "../../app"
import { insertUserSeed, user1token } from "../../../server/seeders/testseederdata";
import chai, { expect } from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from 'chai-http';
import { Recipe } from "../../../server/models";
import request from 'supertest';
const should = chai.should();
chai.use(chaiHttp);
let assert = require('assert');
let token;
describe("Recipe", () => {
    before((done) => {
        Recipe.destroy({
            truncate: true,
            cascade: true,
            restartIdentity: true
        })
        .then(() => {
            insertUserSeed();
            token = user1token;
            done();
        })
    });

    describe('creating Recipe', () => {
        describe('Get Recipe', () => {
            it('should return all recipes', (done) => {
                chai.request(server)
                .get('/recipes')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body.success).to.equal(true);
                    expect(res.body.message).to.equal('Nothing found!');
                    done();
                });
            });

            it(`should return \'Nothing found!\' when fetching all recipes 
            but none found in the database`, (done) => {
                chai.request(server)
                .get('/api/v1/recipes')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body.success).to.equal(true);
                    expect(res.body.message).to.equal('Nothing found!');
                    done();
                });
            });
            
            it('should return few recipes on pagination', (done) => {
                chai.request(server)
                .get('/recipes?page=0')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.recipeData).to.be.an('array');
                    expect(res.body.pages).to.be.a('number')
                    expect(res.body.success).to.equal(true)
                    expect(res.body.recipeData[0]).to.have.deep.keys(
                        name,id,imageUrl,imageId,viewCount,
                        upvotes,downvotes,
                        ingredients,createdAt,updatedAt,
                        userId
                    )
                    setImmediate(done)
                })
            })
        });
        describe('create recipe with incomplete data', () => {

            it("should be non spacing characters in name", (done) => {
                chai.request(server)
                .post('/recipes')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: ' Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body).deep.equal({
                        success: false,
                        message: 'Name colunm must contain only alphanumeral',
                        field: 'name'
                    })
                    setImmediate(done)
                })
            });

            it("should return name cannot be less than 3 and greater 100", (done) => {
                chai.request(server)
                .post('/recipes/create/')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'Fr',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body).deep.equal({
                        success: false,
                        message: 'Name must be between 3 to 100',
                        field: 'name'
                    })
                    setImmediate(done)
                })
            });

            it("should return ingredient must be between 10 to 100 character", (done) => {
                chai.request(server)
                .post('/recipes/create/')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: ' Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body).deep.equal({
                        success: false,
                        message: 'ingredient must be between 10 to 100 character',
                        field: 'ingredients'
                    })
                    setImmediate(done)
                })
            });

            it("should return procedure must be between 10 to 1000 character", (done) => {
                chai.request(server)
                .post('/recipes/create/')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: ' Fried Rice',
                    procedure: 'Put',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body).deep.equal({
                        success: false,
                        message: 'procedure must be between 10 to 1000 character',
                        field: 'ingredients'
                    })
                    setImmediate(done)
                })
            });

            it("should return procedure must not have spacing at last character but fullstop"
            , (done) => {
                chai.request(server)
                .post('/recipes/create/')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: ' Fried Rice',
                    procedure: 'Put ',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body).deep.equal({
                        success: false,
                        message: 'procedure must be between 10 to 1000 character',
                        field: 'ingredients'
                    })
                    setImmediate(done)
                })
            });


            it("should return description cannot be less than 10 and greater than 2000"
            , (done) => {
                chai.request(server)
                .post('/recipes/create/')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body).deep.equal({
                        field: 'description',
                        success: false,
                        message: 'description cannot be less than 10 and greater than 2000',
                    })
                    setImmediate(done)
                })
            });

            it("should create recipe successfuly", (done) => {
                chai.request(server)
                .post('/recipes/create/')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,,salt,,rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body.recipe.name).to.equal('Fried Rice');
                    expect(res.body.recipe.ingredients).to.equal('water,,salt,,rice');
                    expect(res.body.recipe.description).to.equal('Just the way you like it');
                    expect(res.body.recipe.procedure).to.equal('Put the rice in water wash it well and have it in your plate');
                    setImmediate(done)
                })
            })
        })
    })
})
