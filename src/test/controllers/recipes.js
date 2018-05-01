//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
import server from "../../app"
import { insertUserSeed, user1token } from "../../../server/seeders/testseederdata";
import chai, { expect } from "chai";
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
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('You have not added recipes');
                    done();
                });
            });

            it(`should return \'Nothing found!\' when fetching all recipes 
            but none found in the database`, (done) => {
                chai.request(server)
                .get('/recipes/1')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body.success).to.equal(false
                    );
                    expect(res.body.message).to.equal('can\'t find Recipe');
                    done();
                });
            });
            
            /*it('should return few recipes on pagination', (done) => {
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
            })*/
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
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.equal('name cannot be less than 3 character and no spacing');
                    expect(res.body[1]).to.equal('name')
                    setImmediate(done)
                })
            });

            it("should return name cannot be less than 3 and greater 100", (done) => {
                chai.request(server)
                .post('/recipes')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'Fr',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body[0]).to.equal('name cannot be less than 3 character and no spacing');
                    expect(res.body[1]).to.equal('name');
                    expect(res.body).to.be.an('array');
                    setImmediate(done);
                })
            });

            it("should return name cannot contain space", (done) => {
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
                    expect(res.status).to.equal(400);
                    expect(res.body[0]).to.equal('name cannot be less than 3 character and no spacing');
                    expect(res.body[1]).to.equal('name');
                    expect(res.body).to.be.an('array');
                    setImmediate(done);
                })
            });

            it("should not be empty field", (done) => {
                chai.request(server)
                .post('/recipes')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: '',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body[0]).to.equal('name cannot be less than 3 character and no spacing');
                    expect(res.body[1]).to.equal('name');
                    expect(res.body).to.be.an('array');
                    setImmediate(done);
                })
            });

            it("should return ingredient must be between 10 to 100 character", (done) => {
                chai.request(server)
                .post('/recipes')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body).to.have.deep.equal(Array("Ingredients must be atleast 8 and alphanumeric","Ingredients"))
                    setImmediate(done)
                })
            });

            it("should return procedure must be between 10 to 1000 character", (done) => {
                chai.request(server)
                .post('/recipes')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'Fried Rice',
                    procedure: 'Put',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    console.log(res.body)
                    expect(res.status).to.equal(400)
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.equal("Procedure cannot be less than 8 character");
                    expect(res.body[1]).to.equal("Procedure");
                    setImmediate(done)
                })
            });

            it("should return procedure must be between 10 to 1000 character", (done) => {
                chai.request(server)
                .post('/recipes')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'Fried Rice',
                    procedure: '',
                    description: 'Just the way you like it',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.deep.equal(["Procedure cannot be less than 8 character","Procedure"]);
                    setImmediate(done)
                })
            });


            it("should create recipe when no description description or be less than 10"
            , (done) => {
                chai.request(server)
                .post('/recipes')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'Fried Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just that',
                    ingredients: 'water,salt , rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(201)
                    expect(res.body).to.be.an('object')
                    setImmediate(done)
                })
            });

            it("should create recipe successfuly", (done) => {
                chai.request(server)
                .post('/recipes')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'jollof Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,,salt,,rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body.recipe.name).to.equal('jollof Rice');
                    expect(res.body.recipe.ingredients).to.equal('water,,salt,,rice');
                    expect(res.body.recipe.description).to.equal('Just the way you like it');
                    expect(res.body.recipe.procedure).to.equal('Put the rice in water wash it well and have it in your plate');
                    setImmediate(done)
                })
            });

            it("should return unique error name already exist", (done) => {
                chai.request(server)
                .post('/recipes')
                .set('Accept', 'application/json')
                .send({
                    token,
                    name: 'jollof Rice',
                    procedure: 'Put the rice in water wash it well and have it in your plate',
                    description: 'Just the way you like it',
                    ingredients: 'water,,salt,,rice',
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('object');
                    setImmediate(done)
                })
            });
        })
    })
})
