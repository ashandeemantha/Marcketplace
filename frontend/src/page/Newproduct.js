import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(userData.role === 'admin' || userData.role === 'farmer')) {
      toast.error("You are not authorized to upload products");
      navigate("/");
    }
  }, [userData, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value
    }));
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("Image size should be less than 2MB");
        return;
      }
      const imageData = await ImagetoBase64(file);
      setData((preve) => ({
        ...preve,
        image: imageData
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, category, price } = data;

    if (!name || !image || !category || !price) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data, role: userData.role }) // include role in request body
      });

      const fetchRes = await fetchData.json();

      if (!fetchData.ok) {
        throw new Error(fetchRes.message || "Failed to upload product");
      }

      toast.success(fetchRes.message || "Product added successfully!");
      
      setData({
        name: "",
        category: "",
        image: "",
        price: "",
        description: ""
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to add a new product to your marketplace
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <form className="p-6 sm:p-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder="e.g. Organic Apples"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={data.category}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetable">Vegetables</option>
                  <option value="rice">Rice</option>
                  <option value="chips">Chips</option>
                  <option value="snacks">Snacks</option>
                  <option value="sweets">Sweets</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {data.image ? (
                      <div className="relative">
                        <img 
                          src={data.image} 
                          alt="Product preview" 
                          className="mx-auto h-40 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => setData(prev => ({ ...prev, image: "" }))}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex text-gray-400 justify-center">
                          <BsCloudUpload className="text-5xl" />
                        </div>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                          >
                            <span>Upload an image</span>
                            <input
                              id="image"
                              name="image"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={uploadImage}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 2MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">RS.</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="w-full pl-7 pr-12 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                    value={data.price}
                    onChange={handleOnChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={data.description}
                  onChange={handleOnChange}
                  placeholder="Add product details, features, etc."
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newproduct;
