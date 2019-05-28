"use strict";

var express = require('express');

var cors = require('cors');

var expressGraphQl = require('express-graphql');

var schema = require('./schema/schema');

var app = express();
var port = 1234;
app.use('/graphql', expressGraphQl({
  schema: schema,
  graphiql: true
})); // app.listen(4000, () => {
//     console.log('Listening on port 4000');
// });

app.listen(port, function () {
  console.log("Listening on my App http://localhost:1234/graphql ".concat(port));
});