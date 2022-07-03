const API_KEY = "fd4309f87fe092080b9bdebaecd66543";

const categories = [
  {
    name: "trending",
    title: "Trending",
    path: `/trending/all/week?api_key=${API_KEY}`,
    isLarge: true,
  },
  {
    name: "netflixOriginals",
    title: "Originals Netflix",
    path: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    isLarge: false,
  },
  {
    name: "topRated",
    title: "Top Rated",
    path: `/movie/top_rated?api_key=${API_KEY}`,
    isLarge: false,
  },
  {
    name: "comedy",
    title: "Comedy",
    path: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    isLarge: false,
  },
  {
    name: "romances",
    title: "Romance",
    path: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    isLarge: false,
  },
  {
    name: "documentaries",
    title: "Documentary",
    path: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
    isLarge: false,
  },
];

export const getMovies = async (path) => {
  try {
    let url = `https://api.themoviedb.org/3${path}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getMovies: ", error);
  }
};

export default categories;
