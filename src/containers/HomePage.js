import React from 'react';
import { Container, Heading, Text, Flex, Box } from '@chakra-ui/react';
import useAdImages from '../hooks/useAdImages';
import MovieGrid from '../components/MovieGrid';
import GenreBar from '../components/GenreBar';
import AdBox from '../components/AdBox.js';
import useMovieStore from '../store';

const Homepage = () => {
    const { movieQuery } = useMovieStore();

    return (
        <Container maxW="container.lg" py={10}>
            <Flex direction="column" alignItems="center">
                <Heading as="h1" size="xl" mb={4}>
                    Welcome to MovieHub!
                </Heading>
                <AdBox />

                <GenreBar />
                {/* <GenreBar
                    movieQuery={movieQuery}
                    onSelectGenre={(genreId) =>
                        setMovieQuery({ ...movieQuery, selectedGenre: genreId })
                    }
                /> */}
                <Text fontSize="lg">Discover and explore a world of movies and TV shows.</Text>
                <Box mt={4}>
                    <MovieGrid />
                    {/* <MovieGrid movieQuery={movieQuery} /> */}
                </Box>
            </Flex>
        </Container>
    );
};

export default Homepage;
