import React from "react";
import { Movie, SubmitMovie } from "./App";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'

export function Reviews({movies = [], onRemoveMovie = f => f}) {
    if(!movies.length) return <div>No reviews listed.</div>;
    return (
        <div>
            <Container>
                <NavBar />
                <h1>Reviews</h1>
                <Container className="p-5 mb-4 bg-light rounded-3">
                    <Row md="auto">
                    { movies.map(movie => <Movie {...movie} onRemove={onRemoveMovie} />) }
                    </Row>
                </Container>
            </Container>
        </div>
    )
  }
  
export function Submit({movie =[], onNewMovie =f => f}) {
    return (
        <div>
            <Container>
                <NavBar />
                <h1>Submit</h1>
                <SubmitMovie onNewMovie={onNewMovie} />
            </Container>
        </div>
    )
}

function NavBar() {
    return(
        <Container className="p-3">
            <Container className="p-5 mb-4 bg-light rounded-3">
                <Nav className="justify-content-center" variant="pills" defaultActiveKey="/">
                    <Nav.Item>
                        <Nav.Link href="/">Reviews</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/submit">Submit Review</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Container>
    )
  }
