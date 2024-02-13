import React, { useState } from "react";
import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const VideoBackground = ({ movie_id }) => {
  useTrailerVideo(movie_id);
  const trailerKey = useSelector((store) => store?.movies?.trailerVideo?.key);
  const [isMuted, setIsMuted] = useState(true); // State to track whether the video is muted

  // Function to toggle the mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative">
      {trailerKey && (
        <iframe
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${
            isMuted ? 1 : 0
          }&controls=0`} // Toggle the mute parameter and hide controls
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      )}
      <button
        type="button"
        className="absolute rounded-3xl hover:opacity-65 border border-1 border-black flex items-center justify-center h-10 w-10 right-[10%] top-[50%] z-[50] height={50} width={50} bg-white "
        onClick={toggleMute}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        {/* Toggle the icon based on the isMuted state */}
      </button>
    </div>
  );
};

export default VideoBackground;
