import jwt from "jsonwebtoken";
import { User,recipeItem,recipeComment } from "../models";
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
    email: 'akolliy@example.com',
    password: 'akolliy1',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];
const recipes = [
  {
    id: 1,
    
  }
]
 