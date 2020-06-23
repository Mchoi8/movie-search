import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE = //This is for movies retrieved that don't have an image
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const Movie = ({ movie, movieInfo }) => {

  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;


  return (
    <div className="movie" onClick={()=> movieInfo(movie.Title)} >
      <h3>{movie.Title}</h3>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
    </div>
  );
};


export default Movie;