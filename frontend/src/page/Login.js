/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginSignupImage from "../assest/login.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { LoginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && userData.user) {
      console.log("Updated user data:", userData.user);
    }
  }, [userData]);

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      const fetchData = await fetch('http://localhost:8080/Login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataRes = await fetchData.json();
      dispatch(LoginRedux(dataRes));

      if (fetchData.ok && dataRes.alert) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(dataRes.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 py-6 px-8 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-white p-2 shadow-md flex items-center justify-center">
            <img src={loginSignupImage} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">Welcome Back</h1>
          <p className="text-green-100 mt-1">Login to your Field Crops account</p>
        </div>

        <form className="p-8" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                placeholder="your@email.com"
                value={data.email}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                placeholder="••••••••"
                value={data.password}
                onChange={handleOnChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <BiHide className="text-gray-500 hover:text-gray-700" />
                ) : (
                  <BiShow className="text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FiLogIn className="mr-2" />
                Sign in
              </>
            )}
          </button>
        </form>

        <div className="px-8 pb-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;