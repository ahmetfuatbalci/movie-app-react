import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState({show: false, msg: ''});
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovie = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    if(data.Response === 'False'){
      setError({show: true, msg: data.Error})
      setIsLoading(false)
    }
    else{
      console.log(data)
      setMovie(data)
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    fetchMovie(`${API_ENDPOINT}&i=${id}`)
  },[id])

  if(isLoading){
    return <div className="loading"></div>
  }
  if(error.show){
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">back to home</Link>
      </div>
    )
  }
  const {Poster: poster, Title: title, Plot: plot, DVD: year, imdbRating: point} = movie
  return (
    <section className="single-movie">
      <img src={poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>Year : {year}</h4>
        <h4>Imdb : {point}</h4>
        <h4>Director : {movie.Director}</h4>
        <Link to="/" className="btn">back to home</Link>
      </div>
    </section>
  )
}

export default SingleMovie
