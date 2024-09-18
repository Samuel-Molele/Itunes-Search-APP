import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

// Functional component to display a list of search results
function ResultsList({ results = [], onFavouriteToggle, favourites }) {
  return (
    // Create a responsive grid layout for displaying search results
    <Row>
      {results.length === 0 ? (
        <Col></Col>
      ) : (
        // Map over each result to create a column with a card layout
        results.map((result) => (
          <Col key={result.trackId} md={4} className="mb-5">
            <Card>
              <Card.Img
                variant="top"
                src={result.artworkUrl100}
                style={{ objectFit: "cover" }}
                alt={result.collectionName}
              />
              <Card.Body>
                <Card.Title>{result.collectionName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {result.artistName}
                </Card.Subtitle>
                <Card.Text>
                  {new Date(result.releaseDate).toDateString()}
                </Card.Text>
                <Button
                  variant={
                    favourites.some((fav) => fav.trackId === result.trackId)
                      ? "danger"
                      : "primary"
                  }
                  onClick={() => onFavouriteToggle(result)}
                >
                  {favourites.some((fav) => fav.trackId === result.trackId)
                    ? "Remove from Favourites"
                    : "Add to Favourites"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default ResultsList;
