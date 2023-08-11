
import React from 'react';
import { Box, Image, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import useAdImages from '../hooks/useAdImages';

const AdBox = ({ movieId, setMovieId }) => {
    const { images, loading, error } = useAdImages(movieId);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    React.useEffect(() => {
        // When movieId changes, reset the currentImageIndex to 0
        setCurrentImageIndex(0);
    }, [movieId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Box maxW="lg" mx="auto" mt={8} position="relative">
            <Image src={`https://image.tmdb.org/t/p/original${images[currentImageIndex].file_path}`} alt="Movie Image" borderRadius="md" />
            <IconButton
                icon={<ChevronLeftIcon />}
                aria-label="Previous Image"
                position="absolute"
                top="50%"
                left={2}
                transform="translateY(-50%)"
                onClick={handlePrevious}
                colorScheme="gray"
            />
            <IconButton
                icon={<ChevronRightIcon />}
                aria-label="Next Image"
                position="absolute"
                top="50%"
                right={2}
                transform="translateY(-50%)"
                onClick={handleNext}
                colorScheme="gray"
            />
        </Box>
    );
};

export default AdBox;
