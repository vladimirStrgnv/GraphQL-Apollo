import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_MOVIES, GET_ONE_MOVIE} from "./query";
import {CREATE_MOVIE} from "./mutations";
import './App.css'

const App = () => {
    const {data, loading, error, refetch} = useQuery(GET_ALL_MOVIES)
    const {data: oneMovie, loading: loadingOneMovie} = useQuery(GET_ONE_MOVIE, {
        variables: {
            id: '2c223587-d14b-4fff-9ffe-dd05d3b36f47'
        }
    })
    const [newMovie] = useMutation(CREATE_MOVIE)
    const [movies, setMovies] = useState([])
    const [movieName, setmovieName] = useState('')
    const [genre, setGenre] = useState('')

    useEffect(() => {
        if (!loading) {
          console.log(data.movies)
          setMovies(data.movies)
        }
    }, [data])
    console.log(oneMovie)
    const addMovie = (e) => {
        e.preventDefault()
        newMovie({
            variables: {
              name: movieName,
              genre: genre
            }
        }).then(({data}) => {
            console.log(data)
            setMovies(prevValue => [...prevValue, data.addMovie])
            setmovieName('')
            setGenre('')
        })
    }
    const getAll = e => {
        e.preventDefault()
        refetch()
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <form>
                <input value={movieName} onChange={e => setmovieName(e.target.value)} type="text" placeholder='введите название фильма'/>
                <input value={genre} onChange={e => setGenre(e.target.value)} type="text" placeholder='установить жанр фильма'/> 
                <div className="btns">
                    <button onClick={(e) => addMovie(e)}>Создать</button>
                    <button onClick={e => getAll(e)}>Получить</button>
                </div>
            </form>
            <div>
                {movies.map(movie =>
                    <div className="user"
                      key={movie.id}
                    > {movie.name} | {movie.genre}  
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;