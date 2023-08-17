import React, { useState, useEffect } from 'react';
import { Container, Heading, Text, Flex, Box, Button } from '@chakra-ui/react';
import AdBox from '../components/AdBox';
import useAdImages from '../hooks/useAdImages';
import MovieGrid from '../components/MovieGrid';
import GenreBar from '../components/GenreBar';
import tmdbClient from '../api/tmdbClient';

const Homepage = () => {
    const { movies } = useAdImages();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await tmdbClient.get('/genre/movie/list');
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                if (selectedGenre) {
                    const response = await tmdbClient.get('/discover/movie', {
                        params: {
                            with_genres: selectedGenre,
                        },
                    });
                    setFilteredMovies(response.data.results);
                } else {
                    setFilteredMovies(movies);
                }
            } catch (error) {
                console.error('Error fetching movies by genre:', error);
            }
        };
        fetchMoviesByGenre();
    }, [selectedGenre, movies]);

    const handleSelectGenre = (genreId) => {
        setSelectedGenre(genreId);
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? movies.length - 1 : prevIndex - 1
        );
    };

    return (
        <Container maxW="container.lg" py={10}>
            <Flex direction="column" alignItems="center">
                <Heading as="h1" size="xl" mb={4}>
                    Welcome to MovieHub!
                </Heading>

                <AdBox
                    movies={movies}
                    currentImageIndex={currentImageIndex}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                />

                <GenreBar
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onSelectGenre={handleSelectGenre}
                />
                <Text fontSize="lg">
                    Discover and explore a world of movies and TV shows.
                </Text>
                <Box mt={4}>
                    <MovieGrid movies={filteredMovies} />
                </Box>
            </Flex>
        </Container>
    );
};

export default Homepage;
