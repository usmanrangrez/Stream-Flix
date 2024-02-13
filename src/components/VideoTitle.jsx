import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="z-[9] w-screen aspect-video absolute  pt-[20%] md:pt-[20%] px-12 text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-extrabold ">{title}</h1>
      <p className="w-full md:w-2/4 py-6 text-sm md:text-lg font-semibold">
        <span className="hidden md:inline">{overview}</span>
        <span className="inline md:hidden">
          {overview.length > 30 ? overview.substring(0, 30) + "..." : overview}
        </span>
      </p>
      <div className="flex gap-2 ">
        <button className="bg-white flex justify-center items-center gap-2 py-2 px-2 md:py-2 md:px-4  w-fit text-black font-medium md:text-lg rounded-[3px] hover:opacity-70">
          <FaPlay /> Play
        </button>
        <button className="bg-gray-400 flex justify-center items-center gap-2 py-2 px-2 md:py-2 md:px-4  w-fit text-white font-medium md:text-lg rounded-[3px] hover:opacity-70">
          <FiInfo /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
