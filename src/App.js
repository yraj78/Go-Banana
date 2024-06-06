import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

// styles for components
const StyledContainer = styled(Container)({
  marginTop: '2rem',
  backgroundColor: '#f4f1de',
  padding: '1rem',
});

const StyledTableContainer = styled(TableContainer)({
  marginTop: '1rem',
  backgroundColor: '#083d77',
  borderRadius: '1%',
});

const StyledTableCell = styled(TableCell)({
  minWidth: 150,
  maxWidth: 300,
  wordBreak: 'break-all',
  color: 'white',
});

const StyledTableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  fontSize: '1.2rem', 
  color: 'white',
});

const StyledThumbnail = styled('img')({
  width: '200px',
  height: '200px',
  borderRadius: '10%',
});

const StyledButton = styled('button')({
  height: '3rem',
  width: '5rem',
  backgroundColor: '#f4f1de',
  borderRadius: '45%',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'gray',
  },
});

const StyledLink = styled('a')({
  textDecoration: 'none',
  color: '#0c4006',
  fontSize: '20px',
});

function App() {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random?count=10&query=nature&client_id=Mj8M_9-MBRldVdUmeHEG2ng1BkovYwH92vXtUswncJA');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch photos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPhotos = photos.filter((photo) =>
    photo.alt_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Unsplash Photo Gallery
      </Typography>
      <TextField
        label="Search by Description"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
      />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>Description</StyledTableHeadCell>
                <StyledTableHeadCell>Thumbnail</StyledTableHeadCell>
                <StyledTableHeadCell>URL</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPhotos.map((photo, index) => (
                <TableRow key={index}>
                  <StyledTableCell>
                    {photo.alt_description ? photo.alt_description.toLowerCase() : 'No description'}
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledThumbnail src={photo.urls.thumb} alt={photo.alt_description} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledButton>
                      <StyledLink href={photo.links.html} target="_blank" rel="noopener noreferrer">
                        View
                      </StyledLink>
                    </StyledButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
    </StyledContainer>
  );
}

export default App;