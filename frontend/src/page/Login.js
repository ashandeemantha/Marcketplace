/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginSignupImage from "../assest/login.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { LoginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // ✅ Only log when user data is available
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

    console.log("Form submitted with data:", data);

    if (email && password) {
      try {
        const fetchData = await fetch('http://localhost:8080/Login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const dataRes = await fetchData.json();
       
        console.log("Server response:", dataRes);
        dispatch(LoginRedux(dataRes));
        //console.log(dataRes);

        if (fetchData.ok && dataRes.alert) {
          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error(dataRes.message || "Login failed");
        }
        
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Please enter all required fields");
    }
  };

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto'>
          <img src={loginSignupImage} className='w-full' />
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            id='email'
            name='email'
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              name='password'
              className='w-full bg-slate-200 border-none outline-none'
              value={data.password}
              onChange={handleOnChange}
            />
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type='submit'
            className="w-full max-w-[150px] m-auto bg-red-400 hover:bg-red-600 cursor-pointer text-white text-xl font font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>

        <p className='text-left text-sm mt-2'>
          Don't have an account?{" "}
          <Link to={"/signup"} className='text-red-500 underline'>SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
