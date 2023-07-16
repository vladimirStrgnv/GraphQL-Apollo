const graphql = require('graphql');
const Director =  require('../mongo-db/models/director');
const Movie = require('../mongo-db/models/movie');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql;
const { v4: uuidv4 } = require('uuid');


const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findOne({id: parent.directorId})
      }
    }
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id})
      }
    }
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findOne({id: args.id})
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findOne({id: args.directorId})
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.find({})
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.find({})
      },
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});