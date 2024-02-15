import { useSelector } from "react-redux";

const GptSuggestions = () => {
  return (
    <div className="text-white flex gap-2">
      {[...Array(5)].map((_, idx) => (
        <div key={idx}>{idx}</div>
      ))}
    </div>
  );
};

export default GptSuggestions;
