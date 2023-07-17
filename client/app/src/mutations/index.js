import {gql} from '@apollo/client'

export const CREATE_MOVIE = gql`
mutation addMovie($name: String!, $genre: String!) {
    addMovie(name: $name, genre: $genre) {
        name,
        genre,
        id
    }
}
`