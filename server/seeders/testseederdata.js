import jwt from "jsonwebtoken";
import { User, recipeItem, recipeComment } from "../models";
const users = [
  {
    name: 'John Doe',
    email: 'adex@example.com',
    username: 'iamuser',
    password: 'ampassword',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    name: 'akolade',
    username: 'akolliy',
    email: 'akooolliy@example.com',
    password: 'akolliy1234',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];
const recipes = [
  {
    id: 1,
    name: 'Fried Rice',
    procedure: 'Put the rice in water wash it well and have it in your plate',
    description: 'Just the way you like it',
    ingredients: 'water,salt , rice',
    imageUrl: '',
    imageId: null,
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 2,
    name: 'africa salad',
    procedure: 'Put Onion own for slice and the green plant itself call salad',
    description: '',
    ingredients: 'water,salt , rice',
    imageUrl: '',
    imageId: null,
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];
const reviews = [
  {
    recipeId: 1,
    userId: 1,
    content: 'this is a comment on recipe',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    recipeId: 1,
    userId: 1,
    content: 'Too much on recipe',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    recipeId: 1,
    userId: 1,
    content: 'is this a recipe',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    recipeId: 1,
    userId: 1,
    content: 'this recipe is tasty',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];
/**
 * @description insert seed data in user model
 * 
 * @returns {void} Nothing
 */
export const insertUserSeed = () => {
  User.bulkCreate(users,{validate: true}).catch(errors => {
    console.log(errors.path)
  });
};

/**
 * @description insert seed data in recipe model
 * 
 * @returns {void} Nothing
 */
export const insertRecipeSeed = () => {
  Recipe.bulkCreate(recipes)
}

/**
 * @description insert seed data in review model
 * 
 * @returns {void} Nothing
 */
export const insertReviewSeed = () => {
  Review.bulkCreate(reviews)
}

/**
 * @description Generates token from seed data
 * 
 * @param {Number} id - User Id
 * @param {String} username - username in seed data
 * @param {string} email - user email
 * @returns {string} token - Generated token
 */
const generateToken = (id, username, email) => {
  const secret = process.env.JWT_SECRET;
  const payload = { id, username, email };
  const token = jwt.sign(payload, secret, {
    expiresIn: '4h'
  })
  return token
}
export const user1token = generateToken(1, users[0].username, users[0].email)

export const user2token = generateToken(2, users[1].username, users[1].email)

export const validUser = {
  name: 'akolliy bobo',
  email: 'akolliy@example.com',
  username: 'akolliyy',
  password: 'akooooool'
}

export const validRecipe = {
  name: 'Fried Rice',
  procedure: 'Put the rice in water wash it well and have it in your plate',
  description: 'Just the way you like it',
  ingredients: 'water;;salt;;rice',
  userId: 1
}