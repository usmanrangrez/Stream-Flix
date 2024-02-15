import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import useFetchSingleMovie from "../hooks/useFetchSingleMovie";
import Footer from "./Footer";
import Spinner from "./Spinner"; // Import Spinner component

const SingleMovie = () => {
  const { id } = useParams();
  useFetchSingleMovie(id);

  const movieDetails = useSelector((state) => state.movies.singleMovie.details);
  const movieTrailer = useSelector((state) => state.movies.singleMovie.trailer);

  // Infer loading state based on the presence of movieDetails or movieTrailer
  const isLoading = !movieDetails || !movieTrailer;

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <Spinner /> {/* Display Spinner while loading */}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col h-screen mt-[headerHeight]">
        <div
          className="flex-grow-0 flex-shrink w-full"
          style={{ height: "70vh" }}
        >
          {movieTrailer ? (
            <iframe
              className="w-full h-full"
              title="Movie Trailer"
              src={`https://www.youtube.com/embed/${movieTrailer.key}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&loop=1&playlist=${movieTrailer.key}`}
              allowFullScreen
            ></iframe>
          ) : (
            <p className="flex items-center justify-center w-full h-full text-white">
              Trailer unavailable.
            </p>
          )}
        </div>
        <div
          className="bg-black text-white p-4 overflow-auto"
          style={{ height: "30vh" }}
        >
          {movieDetails && (
            <>
              <h1 className="text-2xl font-bold">{movieDetails.title}</h1>
              <p className="mt-2">{movieDetails.overview}</p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleMovie;
