"use strict";

var express = require('express');

var expressGraphQL = require('express-graphql');

var cores = require('cors');

var schema = require('./schema/schema');

var app = express();
var port = 8081;
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));
app.listen(port, function () {
  console.log("This app listen to the port http://localhost:8081/graphql ".concat(port));
});