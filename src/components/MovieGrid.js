import React, { useEffect, useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PosterCard from './PosterCard';
import tmdbClient from '../api/tmdbClient';
import useMovieStore from '../store';

const MovieGrid = () => {

    const { movieQuery } = useMovieStore();
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const fetchFilteredMovies = async () => {
            try {
                let queryParams = {
                    with_genres: movieQuery.selectedGenre,
                };

                // Fetch movies based on the queryParams
                const response = await tmdbClient.get('/discover/movie', {
                    params: queryParams,
                });

                setFilteredMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching filtered movies:', error);
            }
        };

        fetchFilteredMovies();
    }, [movieQuery]);

    return (
        <SimpleGrid columns={4} spacing={6}>
            {filteredMovies.map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <PosterCard movie={movie} />
                </Link>
            ))}
        </SimpleGrid>
    );
};

export default MovieGrid;
