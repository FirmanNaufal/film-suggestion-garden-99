import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  runtime?: number;
  director?: string;
}

export const searchMovies = async (query: string, year?: string, genre?: string) => {
  const params: any = {
    query,
    include_adult: false,
    language: 'en-US',
  };

  if (year) {
    params.year = year;
  }

  if (genre) {
    params.with_genres = genre;
  }

  const response = await tmdbApi.get('/search/movie', { params });
  return response.data.results;
};

export const getMovieDetails = async (movieId: number) => {
  const [movieResponse, creditsResponse] = await Promise.all([
    tmdbApi.get(`/movie/${movieId}`),
    tmdbApi.get(`/movie/${movieId}/credits`),
  ]);

  const director = creditsResponse.data.crew.find(
    (person: any) => person.job === 'Director'
  );

  return {
    ...movieResponse.data,
    director: director?.name,
  };
};

export const getGenres = async () => {
  const response = await tmdbApi.get('/genre/movie/list');
  return response.data.genres;
};