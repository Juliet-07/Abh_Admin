import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/newVendor.png";
import { format } from "date-fns";

const Categories = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { handleSubmit } = useForm();
  const token = localStorage.getItem("adminToken");
  const [categories, setCategories] = useState([]);
  const [showAddCategory, setAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const handleCreateCategory = () => {
    setAddCategory(true);
  };

  useEffect(() => {
    const getCategories = () => {
      axios
        .get(`${apiURL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.data);
          setCategories(response.data.data.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };

    getCategories();
  }, [apiURL, token]);

  const handleAddCategory = () => {
    axios
      .post(
        `${apiURL}/category`,
        {
          name: categoryName,
          description: categoryDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((response) => {
        console.log("Category added:", response.data);
        setCategories([...categories, response.data]);
        setCategoryName("");
        setCategoryDescription("");
        setAddCategory(false);
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <>
      {showAddCategory && (
        <div className="w-full h-screen bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[498px] bg-white rounded-xl flex flex-col items-center p-6 gap-6">
            <h2 className="text-2xl font-bold">Add New Category</h2>
            <form
              onSubmit={handleSubmit(handleAddCategory)}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="font-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
                >
                  Add Category
                </button>
                <button
                  type="button"
                  onClick={() => setAddCategory(false)}
                  className="w-full h-[46px] rounded-[6px] bg-red-500 text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {categories.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="w-full h-20 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">Product Categories</p>
            <div
              onClick={handleCreateCategory}
              className="text-white bg-[#359E52] text-base p-3 rounded-xl cursor-pointer"
            >
              Create Category
            </div>
          </div>
          <div className="my-10 w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                  <tr>
                    <th className="text-center p-3">Date</th>
                    <th className="text-center p-3">Name</th>
                    <th className="text-center p-3">Description</th>
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-center">
                        {formatDate(category.createdAt)}
                      </td>
                      <td className="p-4 text-center">{category.name}</td>
                      <td className="p-4 text-center">
                        {category.description}
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-[#359E52] hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full h-20 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">Product Categories</p>
            <div
              onClick={handleCreateCategory}
              className="text-white bg-[#359E52] text-base p-3 rounded-xl cursor-pointer"
            >
              Create Category
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <div className="text-xl font-primaryRegular">No Categories</div>
            <div className="my-10 md:p-10">
              <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Categories;
