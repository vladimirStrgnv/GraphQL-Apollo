const graphql = require('graphql');
const Director =  require('../mongo-db/models/director');
const Movie = require('../mongo-db/models/movie');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql;
const { v4: uuidv4 } = require('uuid');


const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type:new GraphQLNonNull( GraphQLString) },
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
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLString) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id})
      }
    }
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args) {
        const director = new Director({
          name: args.name,
          age: args.age
        });
        return director.save();
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString)},
        genre: { type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        const movie = new Movie({
          directorId : args.directorId,
          name: args.name,
          genre: args.genre,
          id: uuidv4()
        });
        return movie.save();
      }
    }
  },
  deleteDirector: {
    type: DirectorType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args) {
      return Director.findOneAndDelete({id: args.id});
    },
  },
  deleteMovie: {
    type: MovieType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args) {
      return Movie.findOneAndDelete({id: args.id});
    },
  },
  updateDirector: {
    type: DirectorType,
    args: {
      id: { type: GraphQLID },
      name: {type: new GraphQLNonNull(GraphQLString)},
      age: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parent, args) {
      return Director.findOneAndUpdate({id: args.id}, { $set: {age: args.age, name: args.name }}, { new: true});
    }
  },
  updateMovie: {
    type: MovieType,
    args: {
      id: { type: GraphQLID },
      name: { type: new GraphQLNonNull(GraphQLString)},
      genre: { type: new GraphQLNonNull(GraphQLString)},
      directorId: { type: GraphQLID },
    },
    resolve(parent, args) {
      return Movie.findOneAndUpdate({id: args.id}, { $set: {genre: args.genre, name: args.name, directorId : args.directorId }}, { new: true});
    }
  }

})

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
      resolve(parent, args) {
        const movies = Movie.find({});
        return Movie.find({})
      },
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});