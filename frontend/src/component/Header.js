import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { LogoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    const cartItem = useSelector((state) => state.product.cartItem);
    const dispatch = useDispatch();

    const handleShowMenu = () => {
        setShowMenu(prev => !prev);
    };

    const handleLogout = () => {
        dispatch(LogoutRedux());
        toast.success("Logout Successfully");
        setShowMenu(false);
    };

    return (
        <header className='fixed w-full h-16 bg-white shadow-sm z-50 border-b border-gray-100'>
            <div className='container mx-auto h-full px-4 flex items-center justify-between'>
                {/* Logo */}
                <Link to="/" className='h-12 flex items-center'>
                    <img src={logo} className="h-full" alt="Logo" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors py-1 border-b-2 border-transparent hover:border-green-600">
                        Home
                    </Link>
                    <Link to="/menu/6801d8972fc7874395521c39" className="text-gray-700 hover:text-green-600 font-medium transition-colors py-1 border-b-2 border-transparent hover:border-green-600">
                        Products
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors py-1 border-b-2 border-transparent hover:border-green-600">
                        About
                    </Link>
                    <Link to="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors py-1 border-b-2 border-transparent hover:border-green-600">
                        Contact
                    </Link>
                   

                    {/* Add Product (admin or farmer only) */}
                    {(userData?.role === 'admin' || userData?.role === 'farmer') && (
                        <Link to="/newproduct" className="text-green-600 font-medium py-1 border-b-2 border-transparent hover:border-green-600">
                            Add Product
                        </Link>
                    )}
                </nav>

                {/* Icons Group */}
                <div className="flex items-center space-x-6">
                    {/* Cart with animated badge */}
                    <Link to="/cart" className="relative text-gray-600 hover:text-green-600 transition-colors">
                        <BsCartFill className="text-xl" />
                        {cartItem.length > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center"
                            >
                                {cartItem.length}
                            </motion.span>
                        )}
                    </Link>

                    {/* User Profile with animated dropdown */}
                    <div className="relative">
                        <button 
                            onClick={handleShowMenu}
                            className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-gray-200 hover:border-green-400 transition-colors"
                        >
                            {userData.image ? (
                                <img src={userData.image} className="h-full w-full object-cover" alt="Profile" />
                            ) : (
                                <HiOutlineUserCircle className="h-full w-full text-gray-400" />
                            )}
                        </button>

                        <AnimatePresence>
                            {showMenu && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Dropdown link to New Product for authorized users */}
                                    {(userData?.role === 'admin' || userData?.role === 'farmer') && (
                                        <Link 
                                            to="/newproduct" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setShowMenu(false)}
                                        >
                                            Add Product
                                        </Link>
                                    )}

                                    {userData.image ? (
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                                        >
                                            Logout ({userData.firstName})
                                        </button>
                                    ) : (
                                        <Link 
                                            to="/login" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setShowMenu(false)}
                                        >
                                            Login
                                        </Link>
                                    )}

                                    {/* Mobile Navigation - Shown only in dropdown on mobile */}
                                    <div className="md:hidden border-t border-gray-100 mt-1 pt-1">
                                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setShowMenu(false)}>
                                            Home
                                        </Link>
                                        <Link to="/menu/6801d8972fc7874395521c39" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setShowMenu(false)}>
                                            Products
                                        </Link>
                                        <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setShowMenu(false)}>
                                            About
                                        </Link>
                                        <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setShowMenu(false)}>
                                            Contact
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
