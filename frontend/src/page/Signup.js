import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import loginSignupImage from '../assest/login.gif';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    image: loginSignupImage
  });

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const image = await ImagetoBase64(e.target.files[0]);
    setData(prev => ({ ...prev, image }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;

    if (!firstName || !email || !password || !confirmPassword) {
      toast.error('Please fill all required fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN || "http://localhost:8080"}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || 'Signup failed');

      if (result.alert) {
        toast.success(result.message);
        setTimeout(() => navigate('/login'), 1000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message || 'Signup error');
      console.error('Signup Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 py-6 px-8 text-center">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-green-100 mt-1">Join our community today</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={data.image} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition-all shadow-md">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleImageChange} 
                    accept="image/*"
                  />
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleOnChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleOnChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Role *</label>
                <div className="grid grid-cols-3 gap-3">
                  {['admin', 'buyer', 'farmer'].map((role) => (
                    <label 
                      key={role}
                      className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        data.role === role 
                          ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={data.role === role}
                        onChange={handleOnChange}
                        className="hidden"
                      />
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                        role === 'admin' ? 'bg-purple-100 text-purple-600' :
                        role === 'buyer' ? 'bg-blue-100 text-blue-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {role === 'admin' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {role === 'buyer' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        )}
                        {role === 'farmer' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium capitalize">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={handleShowConfirmPassword}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md transition-all"
              >
                Sign Up
              </button>
            </form>

            {/* Login Link */}
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
    </div>
  );
};

export default Signup;