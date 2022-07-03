import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { getMovies } from "../api";
import "./Row.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const imageHost = "https://image.tmdb.org/t/p/original/";
function Row({ title, path, isLarge }) {
  const [movies, setMovies] = React.useState([]);
  const [trailerUrl, setTrailerUrl] = React.useState("");
  const [scrollX, setScrollX] = React.useState(0);
  // const [scrollY, setScrollY] = React.useState(0);
  const handleOnClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || "")
        .then((url) => {
          setTrailerUrl(url);
        })
        .catch((error) => {
          console.log("Error fetching movie trailer: ", error);
        });
    }
  };

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      console.log("data ", data);
      setMovies(data?.results);
      console.log("ada", movies)
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
    // eslint-disable-next-line
  }, [path]);

  const handleLeft = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleRight = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
      let listW = movies.length * 190;
      if ((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 70;
    }
    setScrollX(x);
  };

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-left" onClick={handleLeft}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="row-right" onClick={handleRight}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>
      <div className="row-cards" style={{ marginLeft: scrollX }}>
        {movies?.map((movie) => {
          return (
            <img
              className={`movie-card ${isLarge && "movie-card-large"}`}
              onClick={() => handleOnClick(movie)}
              key={movie.id}
              src={`${imageHost}${
                movie.poster_path
                // isLarge ? movie. : movie.poster_path
              }`}
              alt={movie.name}
            ></img>
          );
        })}
      </div>
      {trailerUrl && <ReactPlayer url={trailerUrl} playing={true} />}
    </div>
  );
}

export default Row;
