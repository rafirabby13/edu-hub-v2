import React, { useContext, useState } from "react";
import Button from "./Button";
import { Link } from "react-router";
import { Menu, X, Zap } from "lucide-react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  // console.log(user);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged out!", "", "success");
        logoutUser()
          .then(() => {
            // console.log("object");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Logged out successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            // console.log(err);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${err.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const items = (
    <>
      <li>
        <Link
          to="/"
          className="relative hover:text-emerald-400 transition-colors duration-300 text-slate-300 hover:text-white group py-2 px-4 rounded-lg hover:bg-slate-800/50"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </li>
      <li>
        <Link
          to="/plans"
          className="relative hover:text-emerald-400 transition-colors duration-300 text-slate-300 hover:text-white group py-2 px-4 rounded-lg hover:bg-slate-800/50"
        >
          Plans
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </li>
      <li>
        <Link
          to="/blog"
          className="relative hover:text-emerald-400 transition-colors duration-300 text-slate-300 hover:text-white group py-2 px-4 rounded-lg hover:bg-slate-800/50"
        >
          Blog
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </li>
      <li>
        <Link
          to="/faq"
          className="relative hover:text-emerald-400 transition-colors duration-300 text-slate-300 hover:text-white group py-2 px-4 rounded-lg hover:bg-slate-800/50"
        >
          FAQ
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </li>
      
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 py-4 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-xl shadow-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-3 text-2xl font-bold text-white hover:text-emerald-400 transition-colors duration-300"
            >
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Edu-Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav>
              <ul className="flex items-center space-x-2">{items}</ul>
            </nav>
          </div>

          {/* CTA Buttons */}
          {user && user.email ? (
            <div className="flex items-center gap-4">
              <div className=" bg-teal-500   rounded-2xl px-6 py-1 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-900 flex items-center gap-3 max-w-md">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-white font-medium flex-1 truncate hidden md:flex">
                  {user?.email}
                </p>
              </div>
              <div
                className="  hidden md:flex"
                onClick={handleLogout}
              >
                <Link
                  className="block w-full bg-teal-500 text-center py-3 px-4 text-white hover:text-white font-medium rounded-lg hover:bg-slate-700/50 transition-all duration-300 border border-slate-700/50"
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="px-6 py-2 text-slate-300 hover:text-white font-medium rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/50 hover:border-slate-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}
          {/* Mobile CTA Button */}
          {!user && (
            <div className="sm:hidden">
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-medium rounded-lg shadow-lg shadow-emerald-500/25 text-sm transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <nav className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-4">
              <ul className="space-y-2">
                {React.Children.map(items.props.children, (item, index) => (
                  <li key={index} className="block">
                    {React.cloneElement(item.props.children, {
                      className:
                        "block py-3 px-4 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300",
                      onClick: () => setIsOpen(false),
                    })}
                  </li>
                ))}
              </ul>

              {user && (
                <div
                  className="mt-4 pt-4 border-t border-slate-700/50 space-y-3"
                  onClick={handleLogout}
                >
                  <Link
                    className="block w-full text-center py-3 px-4 text-slate-300 hover:text-white font-medium rounded-lg hover:bg-slate-700/50 transition-all duration-300 border border-slate-700/50"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
