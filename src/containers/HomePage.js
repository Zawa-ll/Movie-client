import React, { useState } from 'react';
import { Container, Heading, Text, Flex } from '@chakra-ui/react';
import AdBox from '../components/AdBox';
import useAdImages from '../hooks/useAdImages';
import MovieGrid from '../components/MovieGrid';

const Homepage = () => {
    const { movies, loading, error } = useAdImages(); // Use the hook without passing movieId
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
                    movies={movies} // Pass the images fetched from the hook
                    currentImageIndex={currentImageIndex}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                />

                <Text fontSize="lg">
                    Discover and explore a world of movies and TV shows.
                </Text>

                <MovieGrid />
            </Flex>
        </Container>
    );
};

export default Homepage;
