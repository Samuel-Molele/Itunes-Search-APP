import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

// Functional component to display a list of favourite items
function FavouritesList({ favourites, onRemove }) {
  return (
     // Create a responsive grid layout for displaying favourite items
    <Row>
      {favourites.map((fav) => (
        // For each favourite item, create a column with a card layout
        <Col key={fav.trackId} md={4} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={fav.artworkUrl100}
              alt={fav.collectionName}
            />
            <Card.Body>
              <Card.Title>{fav.collectionName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {fav.artistName}
              </Card.Subtitle>
              <Card.Text>{new Date(fav.releaseDate).toDateString()}</Card.Text>
              <Button variant="danger" onClick={() => onRemove(fav)}>
                Remove from Favourites
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default FavouritesList;
