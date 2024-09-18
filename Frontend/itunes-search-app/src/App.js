import React, { useState } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchBar'; // Adjusted import to match file name
import ResultsList from './components/Results'; // Adjusted import to match file name
import FavouritesList from './components/FavouritesList';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Style from './components/Style.css';// Import CSS file for styling

function App() {
  // State to manage search results
  const [results, setResults] = useState([]);

  // State to manage favourite items
  const [favourites, setFavourites] = useState([]);

  // Function to handle search queries
  const handleSearch = async (term, media) => {
    try {
      // Fetch search results from the backend API
      const response = await axios.get(`/api/search`, {
        params: { term, media }
      });
      // Update the results state with the fetched data
      setResults(response.data.results || []);
    } catch (error) {
      // Log any errors and clear results on failure
      console.error('Error fetching data:', error);
      setResults([]); // Ensure results is always an array
    }
  };

  // Function to toggle an item between favourites and non-favourites
  const handleFavouriteToggle = (item) => {
    setFavourites(prevFavourites => {
      // Check if the item is already a favourite
      const isFavourite = prevFavourites.some(fav => fav.trackId === item.trackId);
      if (isFavourite) {
        // Remove the item if it's already a favourite
        return prevFavourites.filter(fav => fav.trackId !== item.trackId);
      } else {
        // Add the item to favourites if it's not already in the list
        return [...prevFavourites, item];
      }
    });
  };

  // Function to remove an item from favourites
  const handleRemoveFavourite = (item) => {
    setFavourites(prevFavourites => prevFavourites.filter(fav => fav.trackId !== item.trackId));
  };

  return (
    <div>
      
      <div className={Style}>
        
      </div>

      {/* Navbar for navigation */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">iTunes Search</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
      </Navbar>

      {/* Main container for content */}
      <Container className="mt-4">
        {/* Search input component */}
        <SearchInput onSearch={handleSearch} />

        {/* Results list component displaying search results */}
        <ResultsList
          results={results}
          onFavouriteToggle={handleFavouriteToggle}
          favourites={favourites}
        />

        {/* Section header for favourites */}
        <h3 className="mt-5">Favourites:</h3>

        {/* Favourites list component displaying favourite items */}
        <FavouritesList
          favourites={favourites}
          onRemove={handleRemoveFavourite}
        />
      </Container>
    </div>
  );
}

export default App;
