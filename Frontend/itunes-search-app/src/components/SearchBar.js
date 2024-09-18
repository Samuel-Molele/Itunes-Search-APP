import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

// Functional component for a search input form
function SearchInput({ onSearch }) {
  // State to manage the search term and media type
  const [term, setTerm] = useState(""); // Initial term is an empty string
  const [media, setMedia] = useState("all"); // Initial media type is "all"

  // Function to handle the search action
  const handleSearch = () => {
    // Call the onSearch function passed via props with the current term and media type
    onSearch(term, media);
  };

  return (
    <Form>
      <Row>
        <Col md={8}>
          <Form.Control
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for media..."
          />
        </Col>
        <Col md={4}>
          <Form.Control
            as="select"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
          >
            <option value="all">All</option>
            <option value="music">Music</option>
            <option value="movie">Movie</option>
            <option value="podcast">Podcast</option>
            <option value="audiobook">Audiobook</option>
            <option value="shortFilm">Short Film</option>
            <option value="tvShow">TV Show</option>
            <option value="software">Software</option>
            <option value="ebook">Ebook</option>
          </Form.Control>
        </Col>
      </Row>
      <Button variant="primary" onClick={handleSearch} className="mt-3 mb-3">
        Search
      </Button>
    </Form>
  );
}

export default SearchInput;
