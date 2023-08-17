import { useState, useEffect } from 'react';
import tmdbClient from '../api/tmdbClient';

const useAdImages = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await tmdbClient.get('/trending/movie/week', {
                    params: {
                        language: 'en-US',
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

    return { movies, loading, error }; // Returning movies instead of images
};

export default useAdImages;
