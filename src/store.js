import create from 'zustand';

const useMovieStore = create((set) => ({
    movieQuery: {
        selectedGenre: '',
    },
    setMovieQuery: (query) => set({ movieQuery: query }),
    setSelectedGenre: (selectedGenre) =>
        set((state) => ({ movieQuery: { ...state.movieQuery, selectedGenre } })),
}));

export default useMovieStore;
