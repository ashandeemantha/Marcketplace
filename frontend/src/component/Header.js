import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom"; // Changed from Link to NavLink
import logo from "../assest/logo2.png";
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

    // Custom class for active nav links
    const navLinkClass = ({ isActive }) => 
        isActive 
            ? "text-black font-medium py-1 border-b-2 border-black transition-colors" 
            : "text-white hover:text-black font-medium transition-colors py-1 border-b-2 border-transparent hover:border-black";

    return (
        <header className='fixed w-full h-16 bg-green-500 shadow-sm z-50 border-b border-gray-100'>
            <div className='container mx-auto h-full px-4 flex items-center justify-between'>
                {/* Logo */}
                <Link to="/" className='h-24 flex items-center'>
                    <img src={logo} className="h-full" alt="Logo" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink to="/" className={navLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/menu/6801d8972fc7874395521c39" className={navLinkClass}>
                        Products
                    </NavLink>
                    <NavLink to="/about" className={navLinkClass}>
                        About
                    </NavLink>
                    <NavLink to="/contact" className={navLinkClass}>
                        Contact
                    </NavLink>
                    <NavLink to="/orders" className={navLinkClass}>
                        My Orders
                    </NavLink>
                    {(userData?.role === 'admin' || userData?.role === 'farmer') && (
                        <NavLink to="/newproduct" className={navLinkClass}>
                            Add Product
                        </NavLink>
                    )}
                </nav>

                {/* Icons Group */}
                <div className="flex items-center space-x-6">
                    {/* Cart */}
                    <Link to="/cart" className="relative text-white hover:text-black transition-colors">
                        <BsCartFill className="text-xl" />
                        {cartItem.length > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center"
                            >
                                {cartItem.length}
                            </motion.span>
                        )}
                    </Link>

                    {/* User Profile */}
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

                                    {/* Mobile nav (inside dropdown) */}
                                    <div className="md:hidden border-t border-gray-100 mt-1 pt-1">
                                        <NavLink to="/" className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? 'text-black font-medium' : 'text-gray-700'} hover:bg-gray-50 transition-colors`} onClick={() => setShowMenu(false)}>
                                            Home
                                        </NavLink>
                                        <NavLink to="/menu/6801d8972fc7874395521c39" className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? 'text-black font-medium' : 'text-gray-700'} hover:bg-gray-50 transition-colors`} onClick={() => setShowMenu(false)}>
                                            Products
                                        </NavLink>
                                        <NavLink to="/about" className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? 'text-black font-medium' : 'text-gray-700'} hover:bg-gray-50 transition-colors`} onClick={() => setShowMenu(false)}>
                                            About
                                        </NavLink>
                                        <NavLink to="/contact" className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? 'text-black font-medium' : 'text-gray-700'} hover:bg-gray-50 transition-colors`} onClick={() => setShowMenu(false)}>
                                            Contact
                                        </NavLink>
                                        <NavLink to="/orders" className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? 'text-black font-medium' : 'text-gray-700'} hover:bg-gray-50 transition-colors`} onClick={() => setShowMenu(false)}>
                                            My Orders
                                        </NavLink>
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