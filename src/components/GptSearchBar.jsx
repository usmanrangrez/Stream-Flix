import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchText } from "../stores/GptSlice";
import { lang } from "../utils/languageConstants";

const GptSearchBar = ({ currentLang, setCurrentLang }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSearchText(inputRef.current.value));
    inputRef.current.value = "";
  };

  // Handle language change from dropdown
  const handleLanguageChange = (event) => {
    setCurrentLang(event.target.value);
  };

  return (
    <>
      <p>{lang[currentLang].introText}</p>
      <form
        className="flex justify-center items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={lang[currentLang].placeholderSearch}
          className="w-[50vw] px-2 text-xs sm:text-sm sm:px-5 py-1 sm:py-2 rounded-[3px] bg-gray-600"
          ref={inputRef}
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
