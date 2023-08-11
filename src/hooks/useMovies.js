import { useState, useEffect } from 'react';
import tmdbClient from '../api/tmdbClient';

const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await tmdbClient.get('/discover/movie', {
                    params: {
                        sort_by: 'popularity.desc',
                    },
                });

                setMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return { movies, loading, error };
};

export default useMovies;
