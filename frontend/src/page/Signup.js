import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginSignupImage from '../assest/login.gif';
import { BiShow, BiHide } from 'react-icons/bi';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: loginSignupImage
  });

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleImageChange = async(e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    setData((preve) => {
      return {
        ...preve,
        image: data
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;

    if (!firstName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN || "http://localhost:8080"}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataRes = await fetchData.json();
      
      if (!fetchData.ok) {
        throw new Error(dataRes.message || "Signup failed");
      }

      if (dataRes.alert) {
        toast.success(dataRes.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(dataRes.message);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during signup");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  src={data.image} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <label 
                htmlFor="profileImage" 
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
              >
                <input 
                  type="file" 
                  id="profileImage" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </label>
            </div>
          </div>

          <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={data.firstName}
                  onChange={handleOnChange}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={data.lastName}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={data.email}
                onChange={handleOnChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                  value={data.password}
                  onChange={handleOnChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <BiHide className="h-5 w-5 text-gray-400" /> : <BiShow className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? <BiHide className="h-5 w-5 text-gray-400" /> : <BiShow className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;