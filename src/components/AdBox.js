import React, { useState } from 'react';
import { Box, Image, IconButton, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import useAdImages from '../hooks/useAdImages';

const AdBox = () => {
    const { movies } = useAdImages();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    console.log('ttpp:', useAdImages())

    if (!movies || movies.length === 0) {
        return null; // Return null or a loading indicator if movies is not available yet
    }

    const { backdrop_path, title, vote_average } = movies[currentImageIndex] || {};

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? movies.length - 1 : prevIndex - 1
        );
    };

    return (
        <Box maxW="lg" mx="auto" mt={8} position="relative">
            {backdrop_path && (
                <Image src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt="Movie Image" borderRadius="md" />
            )}

            <Text
                position="absolute"
                bottom={2}
                left={2}
                fontSize="xl"
                color="white"
                fontWeight="bold"
            >
                {title}
            </Text>
            <Text
                position="absolute"
                bottom={2}
                right={2}
                fontSize="md"
                color="white"
                fontWeight="bold"
            >
                Rating: {vote_average}
            </Text>

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
