/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { motion } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    const newFilter = category === filterby ? "" : category;
    setFilterBy(newFilter);
    
    if (!newFilter) {
      setDataFilter(productData);
    } else {
      const filter = productData.filter(
        (el) => el.category.toLowerCase() === newFilter.toLowerCase()
      );
      setDataFilter([...filter]);
    }
  };

  const handlePriceFilter = () => {
    const filtered = productData.filter(
      (el) => el.price >= priceRange[0] && el.price <= priceRange[1]
    );
    setDataFilter(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sortedProducts = [...dataFilter];
    
    switch(option) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // featured
        // Keep original order or implement your featured logic
        break;
    }
    
    setDataFilter(sortedProducts);
  };

  const loadingArrayFeature = new Array(10).fill(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Mobile Filter Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <motion.h2 
          className="font-bold text-3xl md:text-4xl text-slate-800 mb-4 md:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {heading}
        </motion.h2>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium"
          >
            <FiFilter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          
          <div className="relative w-full md:w-48">
            <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {categoryList[0] ? (
                categoryList.map((el) => (
                  <button
                    key={el}
                    onClick={() => handleFilterProduct(el)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      filterby === el
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {el}
                  </button>
                ))
              ) : (
                <div className="animate-pulse space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded-md"></div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8">
              <h3 className="font-medium text-lg mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">RS.{priceRange[0]}</span>
                  <span className="text-sm text-gray-600">RS.{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <button
                  onClick={handlePriceFilter}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Apply Price Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Categories</h4>
                      <div className="space-y-2">
                        {categoryList[0] ? (
                          categoryList.map((el) => (
                            <button
                              key={el}
                              onClick={() => {
                                handleFilterProduct(el);
                                setMobileFiltersOpen(false);
                              }}
                              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                                filterby === el
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {el}
                            </button>
                          ))
                        ) : (
                          <div className="animate-pulse space-y-2">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="h-8 bg-gray-200 rounded-md"></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">${priceRange[0]}</span>
                          <span className="text-sm text-gray-600">${priceRange[1]}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <button
                          onClick={() => {
                            handlePriceFilter();
                            setMobileFiltersOpen(false);
                          }}
                          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Apply Price Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {filterby && (
            <div className="mb-4 flex items-center">
              <span className="text-gray-600 mr-2">Filtered by:</span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {filterby}
              </span>
              <button
                onClick={() => handleFilterProduct("")}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          )}

          {dataFilter.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {dataFilter.map((el) => (
                <motion.div key={el._id} variants={itemVariants}>
                  <CardFeature
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
              <div className="max-w-md">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No products found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setFilterBy("");
                      setDataFilter(productData);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {!dataFilter[0] && !loadingArrayFeature[0] && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {loadingArrayFeature.map((_, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <CardFeature loading="Loading..." />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;