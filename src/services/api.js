const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${encodeURIComponent(
      page
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getNowPlayingMovies = async (page) => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${encodeURIComponent(
      page
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getTopRatedMovies = async (page) => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${encodeURIComponent(
      page
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getUpcomingMovies = async (page) => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${encodeURIComponent(
      page
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query, page) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US&page=${encodeURIComponent(page)}`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
};

export const getMovieTrailer = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results[0];
};

export const getMovieImages = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/images?include_image_language=en&api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.backdrops[0];
};

export const getWatchProviders = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results.MX;
};

export const getSimilarMovies = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieCast = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.cast;
};

export const getActorDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
};

export const getActorImages = async (id) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}/images?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.profiles[0];
};

export const getActorMovies = async (id) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.cast;
};
