import create from 'zustand';

const useStore = create((set) => ({
    movies: [],
    currentImageIndex: 0,
    selectedGenre: null,
    filteredMovies: [],
    genres: [],

    setMovies: (movies) => set({ movies }),
    setCurrentImageIndex: (index) => set({ currentImageIndex: index }),
    setSelectedGenre: (genre) => set({ selectedGenre: genre }),
    setFilteredMovies: (movies) => set({ filteredMovies: movies }),
    setGenres: (genres) => set({ genres }),
}))

export default useStore;