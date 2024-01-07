import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import logo from "../../images/logo.jpeg"

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img className="h-9 w-auto" src={logo} alt="Logo" />
          </div>

          {/* Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/home">
                <a
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                  Home
                </a>
              </Link>
              <div className="relative group">
                <button
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={toggleDropdown}
                >
                  Departments
                </button>
                <ul
                  className={`absolute ${isOpen ? 'block' : 'hidden'} text-gray-300 bg-gray-700 rounded-md mt-2 space-y-2`}
                >
                  <li>
                    <Link to="/rawproducts" className="block px-4 py-2 hover:bg-gray-600">
                      Raw Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/processing" className="block px-4 py-2 hover:bg-gray-600">
                      Batch Processing
                    </Link>
                  </li>
                  <li>
                    <Link to="/sales" className="block px-4 py-2 hover:bg-gray-600">
                      Sales
                    </Link>
                  </li>
                </ul>
              </div>
              <Link to="/about">
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                  About Us
                </a>
              </Link>
              

              <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            {!user ? (
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white font-bold hover:text-blue-200">
                  <button
                  onClick={() => navigate("/signup")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </button>
                </li>
                
                <li className="text-white font-bold hover:text-blue-200">
                <Link to="/login">
                  <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                    Login
                  </button>
                </Link>
                </li>
              </ul>
            ) : (
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                {/* <li className="text-white font-bold hover:text-blue-200"> */}
                <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={logoutUser}>
                  Logout
                </button>
                {/* </li> */}
              </ul>
            )}
          </div>

              {/* Add more menu items as needed */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;







