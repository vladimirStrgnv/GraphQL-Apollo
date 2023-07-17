import {gql} from '@apollo/client'

export const GET_ALL_MOVIES = gql`
    query moviesQuery {
        movies {
            id
            name
            genre
        }
    }   

`

export const GET_ONE_MOVIE = gql`
  query movie($id: ID) {
    movie(id: $id) {
      id
      name
      genre
    }
  }
`;