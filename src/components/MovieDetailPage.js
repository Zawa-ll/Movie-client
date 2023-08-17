import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Table, Tbody, Tr, Td, Text, Link, VStack, Divider, Heading, Badge, Button, HStack, SimpleGrid, IconButton, Collapse } from '@chakra-ui/react';
import tmdbClient from '../api/tmdbClient';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import authClient from '../api/authClient';
import { IoMdHeart } from 'react-icons/io';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [videos, setVideos] = useState([]);
    const [mainActors, setMainActors] = useState([]);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [expandedReview, setExpandedReview] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = async () => {
        // const userId = getUserId(); // Replace with your logic to get the user ID
        const userId = 1; // Replace with your logic to get the user ID
        if (!userId) {
            console.error('User ID not available.');
            return;
        }

        try {
            await authClient.post(`/user/likes/like`, {
                userId: userId,
                movieId: movie.id,
            });
            setIsLiked(true);
        } catch (error) {
            console.error('Error liking the movie:', error);
        }
    };


    const truncateText = (text, length) => {
        return text.length > length ? text.slice(0, length) + '...' : text;
    };

    const handleExpandReview = (index) => {
        if (expandedReview === index) {
            setExpandedReview(null);
        } else {
            setExpandedReview(index);
        }
    };

    useEffect(() => {

        const fetchImages = async () => {
            try {
                const response = await tmdbClient.get(`/movie/${movieId}/images`);
                setImages(response.data.backdrops);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        const fetchMainActors = async () => {
            try {
                const response = await tmdbClient.get(`/movie/${movieId}/credits`);
                setMainActors(response.data.cast.slice(0, 5)); // Get the first 5 main actors
            } catch (error) {
                console.error('Error fetching main actors:', error);
            }
        };

        const fetchMovie = async () => {
            try {
                const response = await tmdbClient.get(`/movie/${movieId}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        const fetchVideos = async () => {
            try {
                const response = await tmdbClient.get(`/movie/${movieId}/videos`);
                setVideos(response.data.results);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await tmdbClient.get(`/movie/${movieId}/reviews`);
                setReviews(response.data.results);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        const checkIfLiked = async () => {
            try {
                const response = await authClient.get(`/user/likes/check`, {
                    params: { movieId: movie.id }
                });
                setIsLiked(response.data.liked);
            } catch (error) {
                console.error('Error checking if movie is liked:', error);
            }
        };



        fetchMovie();
        fetchVideos();
        fetchMainActors();
        fetchImages();
        fetchReviews();

        checkIfLiked();
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const trailerLink = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

    const nextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Box p={6} bg="white">
            <Heading as="h2" size="xl" mb={2}>
                {movie.title}
                <Button
                    ml={4}
                    colorScheme={isLiked ? 'red' : 'gray'}
                    onClick={handleLike}
                    disabled={isLiked}
                    leftIcon={<IoMdHeart />} // Use the IoMdHeart icon as a left icon
                >
                    {isLiked ? 'Liked' : 'Like'}
                </Button>
            </Heading>


            <HStack mt={4} align="start" spacing={6}>
                <Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} borderRadius="md" />
                <VStack align="start" spacing={3}>
                    <Text>{movie.overview}</Text>
                    <Divider />
                    <Table variant="simple">
                        <Tbody>
                            <Tr>
                                <Td><strong>Release Date:</strong></Td>
                                <Td>{movie.release_date}</Td>
                            </Tr>
                            <Tr>
                                <Td><strong>Popularity:</strong></Td>
                                <Td>{movie.popularity}</Td>
                            </Tr>
                            <Tr>
                                <Td><strong>Runtime:</strong></Td>
                                <Td>{movie.runtime} minutes</Td>
                            </Tr>
                            <Tr>
                                <Td><strong>Budget:</strong></Td>
                                <Td>${movie.budget.toLocaleString()}</Td>
                            </Tr>
                            <Tr>
                                <Td><strong>Revenue:</strong></Td>
                                <Td>${movie.revenue.toLocaleString()}</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold"><strong>Tagline:</strong></Td>
                                <Td>{movie.tagline}</Td>
                            </Tr>
                            <Tr>
                                <Td><strong>Genres:</strong></Td>
                                <Td>
                                    {movie.genres.map((genre) => (
                                        <Badge key={genre.id} colorScheme="teal" mr={1}>
                                            {genre.name}
                                        </Badge>
                                    ))}
                                </Td>
                            </Tr>

                        </Tbody>
                    </Table>
                </VStack>

            </HStack>
            <Divider mt={6} mb={4} />
            <Heading as="h3" size="lg" mb={2}>
                Reviews
            </Heading>
            <Table variant="simple">
                <Tbody>
                    {reviews.map((review, index) => (
                        <Tr key={review.id}>
                            <Td>
                                <Text fontWeight="bold" fontSize="sm">
                                    {review.author}
                                </Text>
                            </Td>
                            <Td>
                                <Collapse in={expandedReview === index}>
                                    <Text fontSize="sm">
                                        {expandedReview === index ? review.content : truncateText(review.content, 100)}
                                    </Text>
                                </Collapse>
                            </Td>
                            <Button size="sm" variant="link" onClick={() => handleExpandReview(index)}>
                                {expandedReview === index ? 'Read less' : 'Read more'}
                            </Button>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {trailerLink && (
                <>
                    <Heading as="h3" size="md" mt={4} mb={2}>
                        Watch Trailer
                    </Heading>
                    <div style={{ position: 'relative', width: 800, height: 500 }}>
                        <iframe
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            src={`https://www.youtube.com/embed/${trailerLink.key}`}
                            title="Trailer"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </>
            )}
            {/* <Link color="teal.500" href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">
                IMDb Link
            </Link> */}

            {images.length > 0 &&
                <>
                    <Heading as="h3" size="md" mt={4} mb={2}>
                        Movie Highlights
                    </Heading>
                    <Box mt={4} position="relative">
                        <IconButton
                            aria-label="Previous Images"
                            icon={<ChevronLeftIcon />}
                            onClick={prevImage}
                            disabled={currentImageIndex === 0}
                            position="absolute"
                            left={0}
                            top="50%"
                            transform="translateY(-50%)"
                        />
                        <HStack spacing={4} alignItems="center">
                            {images.slice(currentImageIndex, currentImageIndex + 4).map((image, index) => (
                                <Image
                                    key={index}
                                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                    alt={`Image ${currentImageIndex + index + 1}`}
                                    maxH={100}
                                />
                            ))}
                        </HStack>
                        <IconButton
                            aria-label="Next Images"
                            icon={<ChevronRightIcon />}
                            onClick={nextImage}
                            disabled={currentImageIndex >= images.length - 3}
                            position="absolute"
                            right={0}
                            top="50%"
                            transform="translateY(-50%)"
                        />
                    </Box>
                </>
            }

            <SimpleGrid columns={5} spacing={4} mt={6}>
                {mainActors.map(actor => (
                    <Box key={actor.id} textAlign="center">
                        <Image
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            borderRadius="full"
                            boxSize="100px"
                            objectFit="cover" // Add this line
                        />
                        <Text mt={2}>{actor.name}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default MovieDetailPage;
