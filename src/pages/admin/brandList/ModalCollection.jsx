import React, { useEffect, useState } from "react";
import axiosInstance from "../../../services";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export const ModalCollection = ({
  collectionDetails,
  isModalVisibleCollection,
  content,
  onClose,
  handleCollectionSubmit,
}) => {
  const [inputValue, setInputValue] = useState(content);
  const [loading, setLoading] = useState(false);

  const getCollectionDetailsById = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `watchModel/detail?id=${collectionDetails?.id}`
      );
      setInputValue(response?.payload?.data?.model_no);
    } catch (error) {
      console.error("Error fetching collection details:", error);
      toast.error("Failed to load collection details.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  useEffect(() => {
    if (isModalVisibleCollection) {
      getCollectionDetailsById();
    }
  }, [collectionDetails?.id, isModalVisibleCollection]);

  if (!isModalVisibleCollection) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#283641] text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Collection</h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold text-lg hover:text-red-700"
          >
            &times;
          </button>
        </div>
        {loading ? (
          <div className="flex fixed top-0 bottom-0 right-0 left-0 justify-center items-center">
            <ClipLoader color="#ffffff" size={50} />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Type something..."
                value={inputValue}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-[#283641] text-white"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setLoading(true);
                  handleCollectionSubmit(inputValue);
                  if (!isModalVisibleCollection) {
                    setLoading(false);
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
