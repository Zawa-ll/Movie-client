import React, { useState, useEffect } from 'react';
import { Container, Heading, Text, Flex, Box, Button } from '@chakra-ui/react';
import useAdImages from '../hooks/useAdImages';
import MovieGrid from '../components/MovieGrid';
import GenreBar from '../components/GenreBar';
import tmdbClient from '../api/tmdbClient';
import AdBox from '../components/AdBox.js'

const Homepage = () => {
    const [movieQuery, setMovieQuery] = useState({
        selectedGenre: "",
    })

    return (
        <Container maxW="container.lg" py={10}>
            <Flex direction="column" alignItems="center">
                <Heading as="h1" size="xl" mb={4}>
                    Welcome to MovieHub!
                </Heading>
                <AdBox />
                <GenreBar
                    movieQuery={movieQuery}
                    onSelectGenre={(genreId) => setMovieQuery({ ...movieQuery, selectedGenre: genreId })}
                />
                <Text fontSize="lg">
                    Discover and explore a world of movies and TV shows.
                </Text>
                <Box mt={4}>
                    <MovieGrid movieQuery={movieQuery} />
                </Box>
            </Flex>
        </Container>
    );
};

export default Homepage;
