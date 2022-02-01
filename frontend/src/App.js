import './App.css';
import { React, useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { Reviews, Submit } from "./Pages";
import { Container, Image, Form, Row, Button } from 'react-bootstrap'

export function App() {
  const [movies, setMovies] = useState(null);
  
  useEffect(() => {
    fetch('/api/movies')
      .then((response) => response.json())
      .then(setMovies)
  }, []);

  if( movies == null) return null;

  const removeMovie = async (movie) => {

    const options = {
      method: "post",
      body: JSON.stringify({"name": movie}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const result = await fetch('/api/removeMovie', options)
    const body = await result.json();
  }

  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<Reviews movies={movies} onRemoveMovie={name => {
            const newMovies = movies.filter(movie => movie.name !== name);
            setMovies(newMovies);
            removeMovie(name)
          }}/>}/>
          <Route path="/submit" element={<Submit onNewMovie={(name, date, actors, poster, rating) => {
            const newMovies = [...movies, {name, date, actors, poster, rating}];
            setMovies(newMovies);
          }} />}/>
        </Routes>
      </Container>
    </div>
  );
}

export function Movie({name, date, actors, poster, rating, onRemove = f => f}) {
  
    const posterURL = `images/${poster}`
  return (
    <Container>
      <h2>{name}</h2>
      <Image src={posterURL} thumbnail="true"></Image>
      <p>Release Date: {date}</p>
    <p>Actors:</p>
    <ul>
      {actors.map((actor) => <Actor actor={actor} />)}
    </ul>
    <p>Rating: {rating}/5</p>
    <button onClick={() => {
      onRemove(name)
    }}>
    Remove
    </button>
  </Container>
)
}

function Actor(actors) {
  return <li>{ actors.actor }</li>
}

export function SubmitMovie({onNewMovie = f => f}) {
  const [nameProps, resetName] = useInput("");
  const [dateProps, resetDate] = useInput("");
  const [actorsProps, resetActors] = useInput("");
  const [posterProps, resetPoster] = useInput("");
  const [ratingProps, resetRating] = useInput("");

  let fileName = ""
  let actorsArray = []

  const submit = event => {
    event.preventDefault();
    fileName = posterProps.value.replace("C:\\fakepath\\", "")
    actorsArray = actorsProps.value.split(",").map(actor=>actor.trim());
    addMovie(nameProps.value, dateProps.value, actorsArray, fileName, ratingProps.value);
    onNewMovie(nameProps.value, dateProps.value, actorsArray, fileName, ratingProps.value);
    uploadedFile();
    resetName();
    resetDate();
    resetActors();
    resetPoster();
    resetRating();
  }

  const uploadedFile = () => {
    const file = document.getElementById("file");        
    const options = {
      header: {
        'Content-Type': 'multipart/FormData'
      },
      method: "post",
      body: file
    }

    fetch("/api/uploadFile", options)
    .then((res) => console.log(res))
    .catch((err) => ("Error", err))
  }

  const addMovie = async() => {
    const options = {
      method: "post",
      body: JSON.stringify(
        {
          "name": nameProps.value,
          "date": dateProps.value,
          "actors": actorsArray,
          "poster": fileName,
          "rating": ratingProps.value
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const result = await fetch(`/api/addMovie`, options)
    const body = await result.json()

  }

  return (
    <Container className="p-5 mb-4 bg-light rounded-3">
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Title</Form.Label>
          <Form.Control {...nameProps} type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Release Date</Form.Label>
          <Form.Control {...nameProps} type="text" placeholder="Month and year of release" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="actors">
          <Form.Label>Actors</Form.Label>
          <Form.Control {...actorsProps} type="text" placeholder="Actors, separated by a comma" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control {...ratingProps} type="number" min="1" max="5" placeholder="Rating out of 5" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="file">
          <Form.Control {...posterProps} type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add movie
        </Button>
      </Form>
    </Container>
    
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
