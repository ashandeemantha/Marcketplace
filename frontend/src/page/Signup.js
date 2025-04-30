import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginSignupImage from '../assest/login.gif';
import { BiShow, BiHide } from 'react-icons/bi';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { toast } from "react-hot-toast";

function Signup() {
  
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage] = useState(loginSignupImage);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });

  console.log(data)
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

 
  const handleImageChange = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
  

      setData((preve)=>{
          return{
            ...preve,
            image : data
          }
      })

  }
console.log(process.env.REACT_APP_SERVER_DOMIN)

const handleSubmit = async (e) => {
  e.preventDefault();
  const { firstName, email, password, confirmPassword } = data;

  try {
    // Validation checks
    if (!firstName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const fetchData = await fetch("http://localhost:8080/signup", {
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
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto relative cursor-pointer">
          <img src={data.image || profileImage} alt="Profile" className="w-full h-full object-cover" />
          <label htmlFor="profileImage" className="absolute bottom-0 h-1/3 w-full text-center cursor-pointer">
            <p className="text-sm p-1 text-black">Upload</p>
            <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" 
          id="firstName" 
          name="firstName" 
          className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus:outline-blue-300" 
          value={data.firstName} 
          onChange={handleOnChange} />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" 
          id="lastName" 
          name="lastName" 
          className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus:outline-blue-300" 
          value={data.lastName} 
          onChange={handleOnChange} />

          <label htmlFor="email">Email</label>
          <input type="email" 
          id="email" 
          name="email" 
          className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus:outline-blue-300" 
          value={data.email} 
          onChange={handleOnChange} />

          <label htmlFor="password">Password</label>
          <div className="flex items-center px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input type={showPassword ? "text" : "password"} 
            id="password" 
            name="password" 
            className="w-full bg-transparent border-none outline-none" 
            value={data.password} 
            onChange={handleOnChange} />
            <span className="text-xl cursor-pointer" 
            onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex items-center px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input type={showConfirmPassword ? "text" : "password"} 
            id="confirmPassword" 
            name="confirmPassword" 
            className="w-full bg-transparent border-none outline-none" 
            value={data.confirmPassword} 
            onChange={handleOnChange} />
            <span className="text-xl cursor-pointer" 
            onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
          </div>

          <button type="submit" className="w-full max-w-[150px] m-auto bg-red-400 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">Sign Up</button>
        </form>

        <p className="text-left text-sm mt-2">
          Already have an account? <Link to={"/login"} className="text-red-500 underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
