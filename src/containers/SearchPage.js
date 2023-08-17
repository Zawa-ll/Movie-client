import React, { useState } from 'react';
import { Box, Input, Button, Flex, Text, Center, Table, Thead, Tbody, Tr, Th, Td, Image, Link as ChakraLink, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import tmdbClient from '../api/tmdbClient';
import searchImage from '../assets/noom-peerapong-2uwFEAGUm6E-unsplash.jpg';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);


    const handleSearch = async () => {
        try {
            const response = await tmdbClient.get('/search/movie', {
                params: {
                    query: searchQuery,
                },
            });
            const filteredResults = response.data.results.filter(result => result.poster_path);
            const sortedResults = filteredResults.sort((a, b) => b.vote_average - a.vote_average); // Sort by rating in descending order
            setSearchResults(sortedResults); // Filter out movies without a poster
            setShowNoResultsMessage(response.data.results.length === 0);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    return (
        <Center>
            <Box p={4} textAlign="center">
                <Flex mt={4} justifyContent="center">

                    <Box
                        backgroundImage={`url(${searchImage})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        width="600px"
                        height="300px"
                        borderRadius="md"
                    />
                </Flex>
                <Flex mt={4} justifyContent="center">
                    <Input
                        type="text"
                        placeholder="Enter your search query"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '90%', border: '2px solid black', fontWeight: 'bold' }}
                        mr={2}
                    />
                    <Button
                        onClick={handleSearch}
                        style={{ backgroundColor: '#333333', color: 'white' }}
                    >
                        Search
                    </Button>
                </Flex>
                <Box mt={4}>
                    {searchResults.length > 0 ? (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Poster</Th>
                                    <Th>Title</Th>
                                    <Th>Release Date</Th>
                                    <Th>Rating</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {searchResults.map((result) => (
                                    // Check if poster_path exists before displaying the movie
                                    result.poster_path && (
                                        <Tr key={result.id}>
                                            <Td>
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                                                    alt={`${result.title} Poster`}
                                                    borderRadius="md"
                                                    width="36px"
                                                />
                                            </Td>
                                            <Td>
                                                <Text fontWeight="bold">{result.title}</Text>
                                            </Td>
                                            <Td>{result.release_date}</Td>
                                            <Td>
                                                <Badge colorScheme="teal">{result.vote_average}</Badge>
                                            </Td>
                                            <Td>
                                                {/* /movies/:movieId */}
                                                <ChakraLink as={Link} to={`/movies/${result.id}`} color="teal.500">
                                                    Details
                                                </ChakraLink>
                                            </Td>
                                        </Tr>
                                    )))}
                            </Tbody>
                        </Table>
                    ) : (
                        showNoResultsMessage && (
                            <Text>No results found.</Text>
                        )
                    )}
                </Box>
            </Box>
        </Center>
    );
};

export default SearchPage;
