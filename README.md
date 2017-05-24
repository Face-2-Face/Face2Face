# Face2Face

An interactive, Tinder-inspired app that allows users to be matched face to face through video roulette feature.

## Team

- Matthew Aguirre
- Eric Davis
- Jennifer Hwa
- Yurika Jacobsson

## Roadmap

View the project roadmap [https://docs.google.com/document/d/1A2zy15K-Wb3RkjVLB4BQqMGM_UhyEDCi4N0UNWyx148/edit?usp=sharing]

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

> Some usage instructions

## Requirements

- React 
- React Router
- Facebook API
- Twilio 
- Socket.io
- NodeJS/Express
- PostgreSQL
- Redis

## Development

### Installing System Dependencies

```
brew install yarn
brew install redis
brew install postgresql
```

Yarn is a replacement for npm. It's faster and *guarantees* consistency -- as you deploy your code in various environments, you won't run the risk of slight variations in what gets installed.

### Install Project Dependencies

```
yarn global add grunt-cli knex eslint
```

## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for your development and test environments:

Development envronment: `grunt pgcreatedb:default`

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

### Run Migrations & Data Seeds

In terminal, from the root directory:

`knex migrate:latest --env NODE_ENV`

`knex migrate:rollback --env NODE_ENV`

`knex seed:run --env NODE_ENV`

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment.

## Running the App

To run webpack build: `yarn run build`

To run server: `yarn run start`

To run tests: `yarn run test`

To run your redis server for the session store `redis-server`


