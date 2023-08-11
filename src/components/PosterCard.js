import React from 'react';
import { Box, Image, Text, Center } from '@chakra-ui/react';

const PosterCard = ({ movie }) => {
    return (
        <Center>
            <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.05)' }}
                css={{ outline: 'none !important' }} // Add this line to remove the outline
            >
                <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <Box p="3">
                    <Text fontWeight="bold" textAlign="center" fontSize="md">
                        {movie.title}
                    </Text>
                </Box>
            </Box>
        </Center>
    );
};

export default PosterCard;
