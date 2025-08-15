import { Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import OutfitRecommendation from "./Recommend";
import { useTheme } from "../contexts/ThemeContext";

const Nav = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className="bg-amber-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container  ">
        <div className="wrapper  md:flex items-center justify-between hidden py-3 w-full text-2xl text-gray-700 dark:text-gray-200">
          <div className="logo mx-10 px-12">OUR-FIT</div>
          <div className="nav">
            <div className="nav-items flex justify-around  drop-shadow-2xl ">
              <ul className="flex text-center  ">
                <Link to="/" className="mx-6 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                  HOME
                </Link>
                <Link to='' className="mx-6 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">ABOUT</Link>
              </ul>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <Link
              to="/predict"
              className="text-white rounded-xl bg-yellow-500 dark:bg-yellow-600 p-2 font-bold shadow hover:scale-105 hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-all duration-200"
            >
              GET RECOMMENDATIONS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
