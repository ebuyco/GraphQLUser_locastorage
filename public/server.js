

const express = require('express');

const expressGraphQL = require('express-graphql');

const cors = require('cors');

const schema = require('./schema/schema');

const app = express();
const port = 8081;
app.use(cors());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));
app.listen(port, () => {
  console.log('This app listen to the port http://localhost:8081/graphql '.concat(port));
});
