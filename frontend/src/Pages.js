import React from "react";
import { Movie, SubmitMovie } from "./App";
import { Container, Navbar, Nav, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export function Reviews({movies = [], onRemoveMovie = f => f}) {
    if(!movies.length) return <div>No reviews listed.</div>;
    return (
        <>
            <Container>     
                <Navigation />
                <Container className="p-5 bg-light rounded-3">
                <h1>Reviews</h1>
                    <Row md="auto">
                    { movies.map(movie => <Movie {...movie} onRemove={onRemoveMovie} />) }
                    </Row>
                </Container>
            </Container>
        </>
    )
  }
  
export function Submit({movie =[], onNewMovie =f => f}) {
    return (
        <>
            <Container>
                <Navigation />
                <Container className="p-5 bg-light rounded-3">
                    <h1>Submit Review</h1>
                    <SubmitMovie onNewMovie={onNewMovie} />
                </Container>
            </Container>
        </>
    )
}

export function Navigation() {
    return(
        <>
        <Container className="p-3 bg-light rounded-3">
            <Navbar bg="dark" variant="dark" collapseOnSelect fixed='top' expand='sm'>
                <Container>
                    <Navbar.Toggle aria-controls='response-navbar-nav' />
                    <Navbar.Collapse id='response-navbar-nav'>
                        <Nav variant="pills" className="">
                            <Nav.Item>
                                <LinkContainer to="/">
                                    <Nav.Link>Reviews</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/submit">
                                    <Nav.Link>Submit Review</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </Container>
        </>
    )
  }