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
  try {
    console.log('Server started!');
    await mongoose.connect('mongodb+srv://nicestrogonov:MjQPyI4I0GZ1gllT@cluster0.slrgslq.mongodb.net/graph');
    console.log('Connected!');
  } catch (err) {
    console.log(err);
  }
});