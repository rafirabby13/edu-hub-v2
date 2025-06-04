import React from "react";
import { useContext } from "react";
import a1 from "../../assets/Animation - 1735202385033.json";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const { loginUser, googleLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginUser(email, password)
      .then((res) => {
        setUser(res.user);
        // toast.success("Login Successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        console.log(res.user);
        // toast.success("Login Successfully");
        setUser(res.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Animation */}
            <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5"></div>
              <div className="relative z-10 text-center">
                <div className="w-80 h-80 mx-auto mb-6">
                  <Lottie animationData={a1} className="w-full h-full" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Welcome Back!
                </h2>
                <p className="text-indigo-100 text-lg">
                  Sign in to continue your journey with us
                </p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 border border-white/20 rounded-full"></div>
            </div>

            {/* Right side - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    Sign In
                  </h1>
                  <p className="text-gray-300">
                    Enter your credentials to access your account
                  </p>
                </div>

                <div onSubmit={handleLogin} className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-200 mb-2 group-focus-within:text-indigo-300 transition-colors">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your email"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-200 mb-2 group-focus-within:text-indigo-300 transition-colors">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your password"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-300 text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-indigo-300 hover:text-indigo-200 font-medium transition-colors duration-200 hover:underline"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    Sign In
                  </button>
                </div>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-gray-300 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleGoogleLogin}
                    className="mt-6 w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm flex items-center justify-center space-x-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;