const express = require('express');
const schema = require('./schema');
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, async (err) => {
  err ? console.log(err) : console.log('Server started!');
  await mongoose.connect('mongodb://127.0.0.1:27017/graphql')
    .then(() => console.log('Connected!'));
});