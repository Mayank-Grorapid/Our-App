<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---

# NestJS Blog Backend 

This repository contains a NestJS application that provides various API endpoints for managing posts, users, authentication, and more.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Deployment on Render](#deployment-on-render)
- [Available API Endpoints](#available-api-endpoints)
- [Usage](#usage)
- [Using Yarn Package Manager](#using-yarn-package-manager)
- [Specifying Node.js Version for Deployment](#specifying-nodejs-version-for-deployment)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/nestjs-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nestjs-app
   ```

3. Install project dependencies using Yarn:

   ```bash
   yarn install
   ```

## Running the Application

To run the application locally, use the following command:

```bash
yarn start:dev
```

The application will start and be accessible at `http://localhost:3000`.

## Deployment on Render

This application can be easily deployed on Render. Simply follow these steps:

1. Create a new web service on Render.
2. Connect the service to your GitHub repository.
3. Specify the following settings:
   - Build Command: `yarn; yarn install --ignore-engines`
   - Start Command: `yarn start`
4. Deploy the service.

## Available API Endpoints

Here are some of the available API endpoints:


- `GET /` - Home endpoint
- `POST /users/signup` - Create a new user account
- `POST /users/login` - Log in with user credentials
- `GET /users` - Get a list of all users
- `GET /users/:id` - Get user details by ID
- `POST /users/follow/:id` - Follow a user by ID
- `POST /users/unfollow/:id` - Unfollow a user by ID
- `PUT /users/:id` - Update user details by ID
- `GET /posts` - Get a list of all posts
- `GET /posts/:id` - Get post details by ID
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update post details by ID
- `DELETE /posts/:id` - Delete a post by ID
- `POST /posts/like/:id` - Like a post by ID
- `POST /posts/dislike/:id` - Dislike a post by ID
- `GET /posts/:title` - Search for posts by title


For a complete list of API endpoints, you can refer to the `src/app.controller.ts` file.

## Usage

To use the API endpoints, you can use tools like [Postman](https://www.postman.com/) or send HTTP requests using a library like `axios` in your frontend application.

### Example API Request

To get a list of posts using the `GET /posts` endpoint:

1. Send a `GET` request to `http://localhost:3000/posts` using Postman or your preferred HTTP client.
2. You'll receive a JSON response containing the list of posts.

## Using Yarn Package Manager

This project uses Yarn as the package manager. You can install dependencies and run scripts using Yarn commands. For example:

- Install dependencies: `yarn install`
- Start the application in development mode: `yarn start:dev`

## Specifying Node.js Version for Deployment

The Node.js version used for deployment on Render can be specified in the `package.json` file. Look for the `engines` field and adjust the version if needed.

```json
"engines": {
  "node": "14.x"
}
```

Ensure that the specified Node.js version matches the Render runtime environment.

---
