const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const app = express();

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });


mongoose
 .connect(
  "mongodb+srv://siyadadan:Delta246@graphql-queryapp.drm7t.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
 )
 .then(() => console.log("Connected to MongoDB Atlas"))
 .catch(err => console.log("Error: ", err.message));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
 console.log('now listening on PORT 4000...')
});