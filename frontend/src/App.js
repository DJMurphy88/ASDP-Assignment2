import React from "react"
import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { Reviews, Submit } from "./Pages";

import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

export function App() {
  const [movies, setMovies] = useState(null);
  
  useEffect(() => {
    fetch('/api/movies')
      .then((response) => response.json())
      .then(setMovies)
  }, []);

  if( movies == null) return null;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Reviews movies={movies} />}/>
        <Route path="/submit" element={<Submit onNewMovie={(name, date, actors, poster, rating) => {
          const newMovies = [...movies, {name, date, actors, poster, rating}];
          setMovies(newMovies);
        }} />}/>
      </Routes>
    </div>
  );
}

export function Movie(props) {

  const removeMovie = async (movie) => {
    console.log(movie)
    const options = {
      method: 'post',
      body: "test",
      Headers: {'Content-Type': 'application/json'}
    }
    console.log(options.body)
    const result = await fetch('/api/removeMovie', options)
    const body = await result.json();
    console.log(body)
  }
  
    const posterURL = `./images/${props.info.poster}`
  return (
    <Container>
      <h2>{props.info.name}</h2>
      <Image src={posterURL} thumbnail="true"></Image>
      <p>Release Date: {props.info.date}</p>
    <p>Actors:</p>
    <ul>
      {props.info.actors.map((actor) => <Actor actor={actor} />)}
    </ul>
    <p>Rating: {props.info.rating}/5</p>
    <button onClick={() => removeMovie(props.info.name)}>
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

  const addMovie = async() => {
    const res = await fetch(``);
  }

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
