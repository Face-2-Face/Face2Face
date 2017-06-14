'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');



const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

module.exports.getPath = (req, res) => {
  console.log('getPath called ===>>>>>>', req.params.id)
  var nspPath = '/chat/' + req.params.id;
  console.log('PATH: ===>', nspPath)
  var nsp = io.of('/chat/8z11');
  nsp.on('connection', function(socket){
    console.log('someone connected in NSP');
    socket.on('message', function(message) {
      console.log('this is the message in chat!', message);

      nsp.emit('message', message);
    });
  });


  function registerNamespace(name){
  var nsp = io.of('/chat/' + name);
  console.log('innn herrreee',  name)
  nsp.on('connection', function(socket){
    console.log("I am in namespace: " + this.name);

    socket.on('hello', function () {
      console.log("Hello in namespace: " + this.nsp.name);
    });

    socket.on('disconnect', function () {
      console.log("I was in namespace: " + this.nsp.name);
    });
  });
}
  console.log('ssheeiit',req.params.id)
  registerNamespace(req.params.id)
}

const app2 = require('../app');

module.exports.addComment = (post, room, client) => {


  //     models.comments.addComment(post.user, post.comment, post.universityId, function(err, comment) {
  //       if (err) {
  //         client.emit('dbError', err);
  //       } else {
           app2.io2.to(room).emit('commentAdded', comment);
  //       }
  //     });


};
