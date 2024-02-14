import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import useFetchSingleMovie from "../hooks/useFetchSingleMovie";
import Footer from "./Footer";

const SingleMovie = () => {
  const { id } = useParams();

  useFetchSingleMovie(id);

  const movieDetails = useSelector((state) => state.movies.singleMovie.details);
  const movieTrailer = useSelector((state) => state.movies.singleMovie.trailer);

  return (
    <>
      <Header />
      {/* Container for video and text, taking up the remaining screen height minus the header */}
      <div className="flex flex-col h-screen mt-[headerHeight]">
        {" "}
        {/* Adjust mt-[headerHeight] accordingly if the header's height is known and fixed */}
        {/* Video container taking 70% of the remaining screen */}
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
              Loading trailer...
            </p>
          )}
        </div>
        {/* Text container taking the specified portion */}
        <div
          className="bg-black text-white p-4 overflow-auto"
          style={{ height: "30vh" }}
        >
          {" "}
          {/* Ensures the content scrolls if it exceeds the height */}
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
