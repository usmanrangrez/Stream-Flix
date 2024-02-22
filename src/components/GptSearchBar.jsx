import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { lang } from "../utils/languageConstants";
import openai from "../utils/openai";
import { setRecommendedMovies } from "../stores/GptSlice";
import { useDispatch } from "react-redux";
const GptSearchBar = ({ currentLang, setCurrentLang }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${inputRef.current.value}. Only give name of 4 movies,seperated by commas,like exmample: Gadar,Sholay,Don,Dhamaal,Golmaal,more...`;

    const gptResults = await openai?.chat?.completions?.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    const movies = gptResults?.choices[0]?.message?.content;
    const movieArray = movies?.split(",");
    dispatch(setRecommendedMovies(movieArray));
    inputRef.current.value = "";
  };

  // Handle language change from dropdown
  const handleLanguageChange = (event) => {
    setCurrentLang(event.target.value);
  };

  return (
    <>
      <p>{lang[currentLang]?.introText}</p>
      <form
        className="flex justify-center items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={lang[currentLang].placeholderSearch}
          className="w-[50vw] px-2 text-xs sm:text-sm sm:px-5 py-1 sm:py-2 rounded-[3px] bg-gray-600"
          ref={inputRef}
          required
        />
        <button type="submit" className="p-2 flex items-center">
          <FaSearch />
        </button>
        <select
          onChange={handleLanguageChange}
          value={currentLang}
          className="sm:px-2 sm:py-2 px-2 py-1 rounded bg-blue-500 text-white text-xs"
        >
          <option value="en">English</option>
          <option value="urdu">اردو</option>
        </select>
      </form>
    </>
  );
};

export default GptSearchBar;
