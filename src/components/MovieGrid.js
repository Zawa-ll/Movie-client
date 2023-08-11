import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import useAdImages from '../hooks/useAdImages';
import PosterCard from './PosterCard'; // Import the PosterCard component

const MovieGrid = () => {
    const { movies, loading, error } = useAdImages();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <SimpleGrid columns={4} spacing={6}>
            {movies.map((movie) => (
                <PosterCard key={movie.id} movie={movie} />
            ))}
        </SimpleGrid>
    );
};

export default MovieGrid;
