import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Avatar from "../../assets/newVendor.png";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Categories = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { handleSubmit } = useForm();
  const token = localStorage.getItem("adminToken");
  const [categories, setCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditCategoryPreview, setShowEditCategoryPreview] = useState(false);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const handleCreateCategory = () => {
    setShowAddCategory(true);
    setCategoryName("");
    setCategoryDescription("");
    setSelectedCategory(null);
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
    setLoading(true);
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
        setCategories([...categories, response.data]);
        setCategoryName("");
        setCategoryDescription("");
        setShowAddCategory(false);
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditCategory = () => {
    if (!selectedCategory) return;

    setLoading(true);
    axios
      .put(
        `${apiURL}/category/${selectedCategory.id}`,
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
        const updatedCategories = categories.map((category) =>
          category._id === selectedCategory._id ? response.data : category
        );
        setCategories(updatedCategories);
        setCategoryName("");
        setCategoryDescription("");
        setShowEditCategoryPreview(false);
        setSelectedCategory(null);
      })
      .catch((error) => {
        console.error("Error editing category:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    setLoading(true);
    axios
      .delete(`${apiURL}/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(() => {
        const updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
        toast.success("Category deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditPreview = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setShowEditCategoryPreview(true);
    setShowAddCategory(false);
  };

  return (
    <>
      <ToastContainer />
      {(showAddCategory || showEditCategoryPreview) && (
        <div className="w-full h-screen bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[498px] bg-white rounded-xl flex flex-col items-center p-6 gap-6">
            <h2 className="text-2xl font-bold">
              {showAddCategory ? "Add New Category" : "Edit Category"}
            </h2>
            <form
              onSubmit={handleSubmit(
                showAddCategory ? handleAddCategory : handleEditCategory
              )}
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
              <div className="flex items-center gap-10">
                <button
                  type="submit"
                  className="w-full h-10 rounded-md bg-[#4CBD6B] text-white flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : showAddCategory ? (
                    "Add Category"
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCategory(false);
                    setShowEditCategoryPreview(false);
                  }}
                  className="w-full h-10 rounded-md bg-red-500 text-white"
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
          <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className=""> Categories</p>
            <div
              onClick={handleCreateCategory}
              className="text-white bg-[#359E52] text-sm p-2 rounded-xl cursor-pointer"
            >
              Create Category
            </div>
          </div>
          <div className="my-8 w-full bg-white p-3">
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
                  {categories.map((category) => (
                    <tr
                      key={category._id}
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
                        <div className="flex items-center justify-center gap-4">
                          <button
                            className="text-[#359E52] hover:underline"
                            onClick={() => handleEditPreview(category)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-[#FB1010] hover:underline"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Delete
                          </button>
                        </div>
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
