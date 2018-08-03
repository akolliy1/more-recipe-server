# more-recipe-server
more-recipe is basically about Food recipes.
This app provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt. 
# More-Recipes
![Build Status](https://travis-ci.org/akolliy1/more-recipe-server.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/akolliy1/more-recipe-server/badge.svg?branch=master)](https://coveralls.io/github/akolliy1/more-recipe-server?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/61935e09f001a06fb347/maintainability)](https://codeclimate.com/github/akolliy1/more-recipe-server/maintainability)

### Features
- Create account
- Modify account
- Sign-in account
- Follow user
- Add recipes to catalog
- Modify a recipe
- Delete a recipe
- See all recipes on the catalog
- Upvote or downvote a recipe
- Favorite a recipe
- Review a recipe
- Review a recipe by different user
- Set privacy for Recipe
- Tag user on Recipe
- See most popular recipes on the application

## Technologies Used

#### Client side:
     - The client side of this application is built with REACT(Front-end Library) and REDUX(state management)
#### Server side:
     - The server side is built on NODE using EXPRESS(web framework) as the server,
	  SEQUELIZE as the ORM(object Relation Mapper) for communicating with POSTGRESQL DB
    
    - Written in ES6 and transpiled down to ES5 with BABEL
	
     - API's is RESTful 
		
#### Style checking and best pratice
    - ESLINT, which is configured to Airbnb-base rule

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Installation and Dependencies

You can get the app running locally in the following way:
1.  Install NodeJs [`node`](https://nodejs.org/en/download/), version 5 or greater on your machine

2. Install [`postgres`](https://www.postgresql.org/download/) to your local machine

3. Clone the repository and cd into it
   
	  ```
    git clone https://github.com/akolliy/more-recipe-server.git
    cd More-recipes
    ```
		
 4. Install dependenices 
    
		 npm install
		 
 5. Create a database in progresql
    
		 In the application src directory, check the config.js file in
		 `server/config/config.js` to setup your database
		 
 6. Run database migrations
    
		 sequelize db: migrate

 7.  start the application
 
		 - npm run start:dev
		 - Application would be up and running on localhost 2000
		 
#### Testing
	WIP (WORK IN PROGRESS)
