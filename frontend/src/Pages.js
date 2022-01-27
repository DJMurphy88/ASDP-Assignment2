import React from "react";
import { Link } from "react-router-dom";
import { Movie, AddMovie } from "./App";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { LinkContainer } from 'react-router-bootstrap'

export function Reviews({movies = [], onRemoveMovie = f => f}) {
    if(!movies.length) return <div>No reviews listed.</div>;
    return (
        <div>
            <Container className="p-3">
                <Container className="p-5 mb-4 bg-light rounded-3">
                    <ButtonToolbar className="custom-btn-toolbar">
                        <LinkContainer to="/">
                            <Button>Reviews</Button>
                        </LinkContainer>
                        <LinkContainer to="/Submit">
                            <Button>Submit Review</Button>
                        </LinkContainer>
                    </ButtonToolbar>
                </Container>
            </Container>
            <h1>Reviews</h1>
            <Container className="p-5 mb-4 bg-light rounded-3">
                <Row md="auto">
                { movies.map(movie => <Movie {...movie} onRemove={onRemoveMovie} />) }
                </Row>
            </Container>
        </div>
    )
  }
  
export function Submit({movie =[], onNewMovie =f => f}) {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> Submit Review
            </nav>
            <h1>Submit</h1>
            <AddMovie onNewMovie={onNewMovie} />
        </div>
    )
}
