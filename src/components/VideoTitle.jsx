import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="z-[9] -mt-20 w-screen sm:h-[70vh] aspect-video absolute  pt-[20%] md:pt-[20%] px-12 text-white sm:bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-extrabold ">{title}</h1>
      <p className="w-full md:w-2/4 py-6 text-sm md:text-lg font-semibold">
        <span className="hidden md:inline">{overview}</span>
        <span className="inline md:hidden">
          {overview.length > 30 ? overview.substring(0, 30) + "..." : overview}
        </span>
      </p>
      <div className="flex gap-2 ">
        <button className="md:bg-white flex justify-center items-center gap-1 md:gap-2  md:py-2 md:px-4 text-sm  w-fit md:text-black font-medium md:text-lg rounded-[3px] hover:opacity-70">
          <FaPlay /> Play
        </button>
        <button className="md:bg-gray-400 flex justify-center items-center gap-1  md:gap-2 md:py-2 md:px-4 text-sm  w-fit md:text-white font-medium md:text-lg rounded-[3px] hover:opacity-70">
          <FiInfo /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
