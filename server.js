const express = require('express');
const expressGraphQl = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const port = 1234

app.use('/graphql', expressGraphQl({
    schema,
    graphiql: true
}));

// app.listen(4000, () => {
//     console.log('Listening on port 4000');
// });

app.listen(port, () => {
    console.log(`Listening on my App ${port}`);
})