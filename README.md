# Express_API_With_JWT_Auth

This is a simple API, (a pratice work) that basically:

- Registers a user
  - Collects {name, email, password}
  - Verify each with [express-validator](https://express-validator.github.io/)
  - hashes the password with [bcrypt](npmjs.com/package/bcrypt)
  - Insert in [Mongodb](mongodb.org)
- Logins in a user

  - collects {name, password}
  - returns **token** and result of auth

- Query a user information requires Token

// TODO

- Edit user data
- Delete user

## TL;DR

To get started right way:

- Install all project dependencies with `yarn install` or `npm install`

- Edit `server/config/db.js` and `server/config/env/local.js` to fit your data

- start the development server with `npm start`

### Folder structure

```bash
|-- README.md - #This file
|-- package.json - ## npm package manager file. It's unlikely that you'll need to modify this.
|-- server.js #entry point for app
|-- server
|    |-- config # contain server setup
|    |    |--env
|    |    |   |-- config.js
|    |    |   |-- local.js
|    |    |-- app.js
|    |    |-- connect_db.js #contains connection to connect to mongod
|    |    |-- db.js
|    |-- controllers
|    |     |--apis
|    |     |   |-- v1
|    |     |        |-- auth.js
|    |     |        |-- user.js
|    |-- middlewares
|    |      |-- authgaurd.js #JWT token verification
|    |      |-- validation.js #validate all input
|    |-- models
|           |-- user.js #Model - Schema for user
|    |-- routes
|    |      |--apis
|    |      |   |-- index.js
|    |      |   |-- v1.js
|    |      | -- index.js
|    |-- services
|    |      | - v1
|    |      |    |-- auth
|    |      |        |-- auth.js
|    |      |    |-- user
|    |      |        | -- user.js
|
```
