import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "../../assets/newVendor.png";
import { CheckIcon } from "@heroicons/react/solid";
import { FcCancel } from "react-icons/fc";
import moment from "moment";
import { FaEye, FaPenAlt } from "react-icons/fa";
import { XIcon } from "@heroicons/react/outline";
import { Settings } from "../../components/SliderSettings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [showPreview, setPreview] = useState(false);
  const [showPricePreview, setShowPricePreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showApproval, setApproval] = useState(false);
  const [showDecline, setDecline] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM DD, YYYY");
  };

  useEffect(() => {
    const getProducts = () => {
      axios
        .get(`${apiURL}/products/admin-all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.data);
          setProducts(response.data.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getProducts();
  }, [apiURL, token]);

  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setPreview(true);
  };

  const handleEditSalesPrice = (product) => {
    setSelectedProduct(product);
    setShowPricePreview(true);
  };

  const handleUpdatePrice = () => {
    setLoading(true);
    const url = `${apiURL}/products/manage-product-status/${selectedProduct._id}`;
    const payload = {
      status: "APPROVED",
      sellingPrice: parseInt(selectedProduct.sellingPrice),
    };
    axios
      .put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(() => {
        toast.success("Product price updated successfully!");
        setShowPricePreview(false);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to update product.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (productId) => {
    const url = `${apiURL}/products/${productId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        console.log("Product deleted:", response.data);
        alert(response.data.data);
        setPreview(false);
        // Update the state to reflect the change
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error updating vendor status:", error);
      });
  };

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          bgColor: "bg-[#088D2D]/[12%]",
          textColor: "text-[#088D2D]",
          dotColor: "bg-[#088D2D]",
        };
      case "pending":
        return {
          bgColor: "bg-[#FB1010]/[12%]",
          textColor: "text-[#FB1010]",
          dotColor: "bg-[#FB1010]",
        };
      case "declined":
        return {
          bgColor: "bg-[#F58634]/[12%]",
          textColor: "text-[#F58634]",
          dotColor: "bg-[#F58634]",
        };
      default:
        return {
          bgColor: "bg-gray-200",
          textColor: "text-gray-800",
        };
    }
  };

  const CustomSlider = ({ settings, images }) => {
    return (
      <div className="slider-container px-4">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="flex gap-4">
              <img src={image.url} className="w-[100px] h-[100px]" />
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const closePricePopup = () => {
    setShowPricePreview(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <ToastContainer />
      {showPreview &&
        selectedProduct &&
        (() => {
          const { bgColor, textColor, dotColor } = getStatusStyles(
            selectedProduct.status
          );
          return (
            <div className="w-full h-[100vh] overflow-y-scroll bg-[#000000a8] fixed z-50 top-0 left-0 flex flex-col items-center">
              <div className="w-[90%] max-w-[882px] relative bg-white rounded-[10px] p-[20px] md:p-[40px] my-[5vh]">
                <b className="text-[16px] w-full text-center flex justify-center font-primaryRegular">
                  Product Details
                </b>
                <XIcon
                  width={20}
                  height={20}
                  className="absolute right-[20px] top-[20px] cursor-pointer active:opacity-5"
                  color="red"
                  onClick={() => setPreview(false)}
                />
                <div className="w-full flex flex-row flex-wrap mt-[20px] min-h-1 gap-2 font-primaryRegular">
                  <div className="w-full min-w-[300px] min-h-[200px] flex flex-[45] flex-col">
                    <p>{selectedProduct.id}</p>
                    <br />
                    <div
                      className="w-full h-[198px] bg-contain"
                      style={{
                        background: `url(${selectedProduct.featured_image}) center no-repeat`,
                        backgroundSize: "contain",
                      }}
                    ></div>
                    <br />
                    <CustomSlider
                      settings={Settings}
                      images={selectedProduct.images}
                    />
                  </div>
                  <div className="w-full min-w-[300px] flex flex-[55] flex-col">
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Product Name:</b>
                      <p>{selectedProduct.name}</p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Product Category:</b>
                      <p>{selectedProduct?.categoryId?.name}</p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Description:</b>
                      <p>{selectedProduct?.description}</p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Price</b>
                      <p>
                        {selectedProduct.currency + " " + selectedProduct.price}
                      </p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Quantity</b>
                      <p>
                        {selectedProduct.quantity -
                          selectedProduct.soldQuantity +
                          " " +
                          selectedProduct.unit}
                      </p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Size</b>
                      <p>{selectedProduct.size}</p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Vendor's Name</b>
                      <p>
                        {selectedProduct?.vendor?.firstName +
                          " " +
                          selectedProduct?.vendor?.lastName}
                      </p>
                    </div>
                    <br />
                    <div className="flex flex-row gap-[10px]">
                      <b>Vendor's Store</b>
                      <p>{selectedProduct?.vendor?.store}</p>
                    </div>
                    <br />
                    <div className="flex items-center gap-3">
                      <b>Status</b>
                      <div
                        className={`h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                      >
                        <div
                          className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                        />
                        <p className={`${textColor} text-xs`}>
                          {selectedProduct.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="flex items-center justify-between md:mt-10 mb-4 font-primaryRegular">
                  <div></div>
                  <button
                    onClick={() => handleDelete(selectedProduct._id)}
                    className="md:w-[186px] w-[99px] h-[46px] bg-[#E3140F] text-white rounded-md font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {showPricePreview && selectedProduct && (
        <div className="w-full h-screen bg-[#503e3ea8] z-[1000] fixed top-0 left-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[550px] relative bg-white p-6 rounded-[10px] flex flex-col">
            <XIcon
              width={20}
              height={20}
              onClick={closePricePopup}
              color="red"
              className="absolute active:opacity-5 right-[20px] top-[20px] cursor-pointer"
            />
            <b className="md:text-xl text-center">Edit Selling Price</b>
            <p className="py-2 text-xs md:text-base">
              ID {selectedProduct?.categoryId?._id}
            </p>
            <div className="w-full flex flex-col md:flex-row items-center gap-4">
              <div className="w-[234px] h-[198px]">
                <img
                  src={selectedProduct?.featured_image}
                  // className="w-[234px] h-[198px]"
                />
              </div>
              <div className="grid gap-3 md:gap-6 text-left">
                <div>
                  <b>{selectedProduct?.name}</b>
                  <p>{selectedProduct?.categoryId?.name}</p>
                </div>

                <div>
                  <label className="font-primaryRegular text-sm">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    className="w-full h-[46px] p-2 border rounded mt-2"
                    value={selectedProduct?.sellingPrice}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        sellingPrice: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-6">
              <button
                onClick={handleUpdatePrice}
                className="w-full h-[46px] rounded-lg bg-[#4CBD6B] text-white flex items-center justify-center"
                // disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {products.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">Products ({products.length})</p>
          </div>
          <div className="my-4 w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryMedium md:font-primaryBold text-xs md:text-sm">
                  <tr>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Product</th>
                    <th className="text-left p-3">Product Type</th>
                    <th className="text-left p-3">Vendor's Price</th>
                    <th className="text-left p-3">Sale's Price</th>
                    <th className="text-left p-3">Status</th>
                    {/* <th className="text-center p-3">Stock</th>
                    <th className="text-center p-3">Vendor</th>
                    <th className="text-center p-3">Store</th> */}
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product, index) => {
                    const { bgColor, textColor, dotColor } = getStatusStyles(
                      product.status
                    );
                    return (
                      <tr
                        key={index}
                        className="border text-xs font-primaryMedium mb-4"
                      >
                        <td className="min-w-[100px] md:w-0 p-4 text-left">
                          {formatDate(product.created_at)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 shadow-lg rounded border border-gray-200 flex items-center justify-center p-1">
                              <img src={product.featured_image} alt="" />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                              <p className="text-ellipsis whitespace-nowrap">
                                {product.name}
                              </p>
                              <b>{product?.categoryId?.name}</b>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-left">{product.productType}</td>
                        <td className="min-w-[100px] p-4 text-left">
                          {product.currency + " " + product.price}
                        </td>
                        <td className="min-w-[100px]  p-4 text-left">
                          {product.currency + " " + product.sellingPrice}
                        </td>
                        <td className="min-w-[100px] md:w-0 p-4 text-left">
                          <div
                            className={`h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                          >
                            <div
                              className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                            />
                            <p className={`${textColor} text-xs`}>
                              {product.status}
                            </p>
                          </div>
                        </td>
                        {/* <td className="min-w-[100px] md:w-0 p-4 text-center">
                        {product.quantity + " " + product.unit}
                      </td>
                      <td className="p-4 text-center">
                        {product?.vendor?.firstName +
                          " " +
                          product?.vendor?.lastName}
                      </td>
                      <td className="min-w-[100px] md:w-0 p-4 text-center">
                        {product?.vendor?.store}
                      </td> */}
                        <td className="text-center">
                          <div className="flex items-center justify-evenly">
                            <button
                              onClick={() => handleEditSalesPrice(product)}
                              className="w-8 h-8 rounded-full border border-gray-300 text-[#359E52] flex items-center justify-center"
                            >
                              <FaPenAlt size={14} />
                            </button>
                            <button
                              onClick={() => handleViewMore(product)}
                              className="w-8 h-8 rounded-full border border-gray-300 text-[#359E52] flex items-center justify-center"
                            >
                              <FaEye size={14} />
                            </button>
                          </div>
                        </td>
                        {/* <td className="p-4 flex items-center justify-center">
                          <button
                            onClick={() => handleViewMore(product)}
                            className="w-8 h-8 rounded-full border border-gray-300 text-[#359E52] flex items-center justify-center"
                          >
                            <FaEye size={14} />
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 mb-2 font-primaryMedium">
              {Array.from({ length: totalPages }, (_, index) => {
                const isHidden =
                  index + 1 < currentPage - 2 || index + 1 > currentPage + 2;

                return (
                  <React.Fragment key={index + 1}>
                    {/* Show first page and ellipsis */}
                    {index + 1 === 1 && index + 1 < currentPage - 2 && (
                      <>
                        <button
                          onClick={() => handlePageChange(1)}
                          className={`w-8 rounded mx-1 p-2 ${
                            currentPage === 1
                              ? "bg-[#359E52] text-white"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          1
                        </button>
                        <span className="mx-2">...</span>
                      </>
                    )}

                    {/* Main pagination logic */}
                    {!isHidden && (
                      <button
                        onClick={() => handlePageChange(index + 1)}
                        className={`w-8 rounded mx-1 p-2 ${
                          currentPage === index + 1
                            ? "bg-[#359E52] text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )}

                    {/* Show last page and ellipsis */}
                    {index + 1 === totalPages &&
                      index + 1 > currentPage + 2 && (
                        <>
                          <span className="mx-2">...</span>
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className={`w-8 rounded mx-1 p-2 ${
                              currentPage === totalPages
                                ? "bg-[#359E52] text-white"
                                : "bg-gray-200 text-black"
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
          <div className="text-xl font-primaryRegular">No new products</div>
          <div className="my-10 md:p-10">
            <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
