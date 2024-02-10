import logo from "../assets/Logo.webp";
const Header = () => {
  return (
    <div className="absolute z-[100] px-8 py-2 bg-gradient-to-b from-black">
      <img className="w-44 h-20 rounded-lg" src={logo} alt="Logo" />
    </div>
  );
};

export default Header;
