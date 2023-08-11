import React from 'react';
import { Box, Image, IconButton, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const AdBox = ({ movies, currentImageIndex, handleNext, handlePrevious }) => {
    const { backdrop_path, title, vote_average } = movies[currentImageIndex] || {};

    return (
        <Box maxW="lg" mx="auto" mt={8} position="relative">
            {backdrop_path && (
                <Image src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt="Movie Image" borderRadius="md" />
            )}

            <Text
                position="absolute"
                bottom={2}
                left={2}
                fontSize="xl" // Larger font size for the title
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
