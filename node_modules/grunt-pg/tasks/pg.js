/*
 * grunt-pg
 * https://github.com/moneytribeaustralia/grunt-pg
 *
 * Copyright (c) 2013 Moneytribe.
 * Written by Andrew Chilton.
 * Licensed under the MIT license.
 */

var pg = require('pg');

function execute_db(connection, statement, done) {
    pg.connect(connection, function(err, client) {
        if (err) {
            pg.end();
            throw new Error(err);
        }

        // console.log(statement);
        client.query(statement, function(err, result) {
            if (err) {
                pg.end();
                throw err;
            }
            // console.log('Result:', result);

            done();
        });
    });
}

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task
  // creation: https://github.com/gruntjs/grunt/blob/devel/docs/toc.md

  var _ = require('underscore');

  grunt.registerMultiTask('pgcreateuser', 'Add a new Postgres user.', function() {
      var self = this;
      var data = self.data;
      var done = self.async();

      var stmt = 'CREATE user ' + data.user;

      execute_db(data.connection, stmt, function(err, res) {
          grunt.log.writeln("Database user '" + data.user + "' created.");
          done();
      });
  });

  grunt.registerMultiTask('pgdropuser', 'Drop a Postgres user.', function() {
      var self = this;
      var data = self.data;
      var done = self.async();

      var stmt = 'DROP ROLE IF EXISTS ' + data.user;

      execute_db(data.connection, stmt, function(err, res) {
          grunt.log.writeln("Database user '" + data.user + "' dropped.");
          done();
      });
  });

  grunt.registerMultiTask('pgcreatedb', 'Create a new Postgres database.', function() {
      var self = this;
      var data = self.data;
      var done = self.async();

      // do DB name and owner here:
      // * http://www.postgresql.org/docs/8.1/static/sql-createdatabase.html
      var stmt = 'CREATE DATABASE ' + data.name;
      if ( data.owner ) {
          stmt += ' WITH OWNER ' + data.owner;
      }

      execute_db(data.connection, stmt, function(err, res) {
          grunt.log.writeln('Database "' + data.name + '" created.');
          done();
      });
  });

  grunt.registerMultiTask('pgowner', 'Change the owner of a Postgres database.', function() {
      var self = this;
      var data = self.data;
      var done = self.async();

      var stmt = "ALTER DATABASE " + data.name + " OWNER TO " + data.owner;
      execute_db(data.connection, stmt, function(err, res) {
          grunt.log.writeln('Database "' + data.name + '" created.');
          done();
      });
  });

  grunt.registerMultiTask('pgdropdb', 'Drop a Postgres database.', function() {
      var self = this;
      var done = this.async();
      var data = this.data;

      execute_db(data.connection, "DROP DATABASE IF EXISTS " + data.name + ";", function(err, res) {
          grunt.log.writeln('Database "' + data.name + '" dropped.');
          done();
      });
  });

  grunt.registerMultiTask( 'pgsqlfile', 'Run a sql against a Postgres database', function() {
      var exec = require('child_process').exec;
      var done = this.async();
      var data = [].concat(grunt.config.get('shell')._options).concat(this.data);
      var dataOut = data.stdout;
      var dataErr = data.stderr;

      if ( _.isFunction( data.callback ) ) {
          data.callback.call( this );
          return;
      }

      var db = data.connection;
      var command = (db.password ? "PGPASSWORD='" + db.password + "'" : "") +
        " psql " +
        " -d " + db.name +
        (db.host ? " -h " + db.host : "" ) +
        " -p " + db.port +
        " -U " + db.user +
        " -w " +
        " -f " + data.filename;

      exec( grunt.template.process(command), data.execOptions, function( err, stdout, stderr ) {
          if ( stdout ) {
              if ( _.isFunction( dataOut ) ) {
                  dataOut( stdout );
              } else if ( dataOut === true ) {
                  grunt.log.write( stdout );
              }
          }

          if ( err ) {
              if ( _.isFunction( dataErr ) ) {
                  dataErr( stderr );
              } else if ( data.failOnError === true ) {
                  grunt.fatal( err );
              } else if ( dataErr === true ) {
                  grunt.log.error( err );
              }
          }

          done();
      });
  });

};
