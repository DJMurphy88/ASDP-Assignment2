import React from "react"
import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { Reviews, Submit } from "./Pages";

import Container from 'react-bootstrap/Container'

export function App() {
  const [movies, setMovies] = useState(null);
  
  useEffect(() => {
    fetch('./movies.json')
      .then((response) => response.json())
      .then(setMovies)
  }, []);

  if( movies == null) return null;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Reviews movies={movies} onRemoveMovie={name => {
          const newMovies = movies.filter(movie => movie.name !== name);
          setMovies(newMovies);
        }}/>}/>
        <Route path="/submit" element={<Submit onNewMovie={(name, date, actors, poster, rating) => {
          const newMovies = [...movies, {name, date, actors, poster, rating}];
          setMovies(newMovies);
        }} />}/>
      </Routes>
    </div>
  );
}

export function Movie({name, date, actors, poster, rating, onRemove = f => f}) {
  const altText = `Movie poster for ${name}`
  const posterURL = `./images/${poster}`
  return (
    <Container>
      <h2>{name}</h2>
      <img src={posterURL} alt={altText}></img>
      <p>Release Date: {date}</p>
    <p>Actors:</p>
    <ul>
      {actors.map((actor) => <Actor actor={actor} />)}
    </ul>
    <p>Rating: {rating}/5</p>
    <button onClick={() => onRemove(name)}>
    Remove
    </button>
  </Container>
)
}

function Actor(actors) {
  return <li>{ actors.actor }</li>
}

export function AddMovie({onNewMovie =f => f}) {
  const [nameProps, resetName] = useInput("");
  const [dateProps, resetDate] = useInput("");
  const [actorsProps, resetActors] = useInput("");
  const [posterProps, resetPoster] = useInput("");
  const [ratingProps, resetRating] = useInput("");

  const submit = event => {
    event.preventDefault();
    const fileName = posterProps.value.replace("C:\\fakepath\\", "")
    const actorsArray = actorsProps.value.split(",").map(actor=>actor.trim());
    onNewMovie(nameProps.value, dateProps.value, actorsArray, fileName, ratingProps.value);
    resetName();
    resetDate();
    resetActors();
    resetPoster();
    resetRating();
  }

  return (
    <form onSubmit={submit}>
                <div>
                <input {...nameProps} type="text" size="30" placeholder="Name" required />
                </div>
                <div>
                <input {...dateProps} type="text" size="30" placeholder="Release date" required />
                </div>
                <div>
                <input {...actorsProps} type="text" size="30" placeholder="Actors, separated by a comma" required />
                </div>
                <div>
                <input {...posterProps} type="file" placeholder="Poster" />
                </div>
                <div>
                <input {...ratingProps} type="number"size="30" placeholder="Rating out of 5" min="1" max="5" required />
                </div>
                <div>
                    <button>Add</button>
                </div>
            </form>
  )
}

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};

export default App;
