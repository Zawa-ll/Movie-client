import { useState, useEffect } from 'react';
import tmdbClient from '../api/tmdbClient';

const useAdImages = (movieId) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdImages = async () => {
            try {
                const response = await tmdbClient.get(`/movie/${movieId}/images`);
                setImages(response.data.backdrops);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchAdImages();
    }, [movieId]);

    return { images, loading, error };
};

export default useAdImages;
