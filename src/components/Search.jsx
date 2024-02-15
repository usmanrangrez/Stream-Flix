import Header from "./Header";
import GptSearchBar from "./GptSearchBar";
import GptSuggestions from "./GptSuggestions";
import { useState } from "react";
import { lang } from "../utils/languageConstants";
import Footer from "./Footer";

const Search = () => {
  const [currentLang, setCurrentLang] = useState("en");

  return (
    <>
      <div className="bg-slate-900 flex flex-col h-screen text-white relative">
        <Header />
        <div className="absolute text-xs sm:text-xl right-[20%] sm:right-[30%] top-[10%] sm:top-[20%] flex flex-col gap-5 flex-grow items-center justify-center">
          <GptSearchBar
            currentLang={currentLang}
            setCurrentLang={setCurrentLang}
          />
        </div>
      </div>
      <div className="absolute pl-5 top-[30%] sm:top-[50%] text-white flex flex-col">
        <p className="sm:text-xl text-lg">
          {lang[currentLang].searchResultsFor}{" "}
        </p>
        <GptSuggestions />
      </div>
      <Footer />
    </>
  );
};

export default Search;
