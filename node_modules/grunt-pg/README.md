# grunt-pg

> Grunt plugin to help with administering Postgres.

## Installation

_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with
the following command:

```bash
npm install --save-dev grunt-pg
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-pg');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed
plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures
that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html
[node-pg]: https://github.com/brianc/node-postgres/wiki/pg

## Synopsis ##

Firstly, an example of using the pgcreate task:

```js
grunt.initConfig({
  pgcreatedb: {
    project1: {
      // Target-specific file lists and/or options go here.
      name: 'project1', // will be created
      connection: {
        user: 'postgres',
        database: 'template1',
      },
    },
  },
})
```

## Tasks ##

There are 5 tasks in grunt-pg: *pgcreateuser*, *pgdropuser*, *pgcreatedb*, *pgowner*, *pgdropdb* and *pgsqlfile*. Each
task is a multitask.

Each works similarly as the example above shows. The connection credentials must be a user who is privieleged enough to
be able to perform these operations. For example, using the 'postgres' user to the 'template1' database should be
sufficient.

The connection object can also specify anything that [node-pg][] understands: user, database, password, port and host.

Each task also requires the following:

* pgcreateuser: user
* pgdropuser: user
* pgcreatedb: name
* pgdropdb: name
* pgowner: name, user

## Release History

```
2013-01-16: 0.1.0 - 
```

## Authors ##

* Andrew Chilton (chilts).
* Nicholas Faiz (nicholasf).

## Licence ##

Copyright (c) 2013 Moneytribe. MIT.

