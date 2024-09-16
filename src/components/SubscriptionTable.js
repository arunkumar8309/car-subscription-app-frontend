import React, { useEffect, useState } from "react";
import { listSubscriptions, cancelSubscription } from "../api/apiService";
import { FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SubscriptionsChart from "./SubscriptionsChart"; // Chart component
import SubscriptionsData from "./SubscriptionsData"; // Data component

const SubscriptionTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const subscriptionsPerPage = 6; // Show 6 subscriptions per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await listSubscriptions();
        setSubscriptions(response.data);
        if (response.data.length === 0) {
          setError("No Subscriptions Found");
        }
      } catch (error) {
        setError("Failed to fetch subscriptions.");
        console.error(error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await cancelSubscription(id);
      const updatedSubscriptions = subscriptions.filter(
        (sub) => sub._id !== id
      );
      setSubscriptions(updatedSubscriptions);

      if (updatedSubscriptions.length === 0) {
        setError("No Subscriptions Found");
      }

      const totalPages = Math.ceil(
        updatedSubscriptions.length / subscriptionsPerPage
      );
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }

      // Trigger chart/data refresh after deletion
      refreshChartAndData(updatedSubscriptions);
    } catch (error) {
      setError("Failed to delete subscription.");
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/${id}`);
  };

  const handleView = (id) => {
    navigate(`/user/${id}`);
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Pagination logic
  const indexOfLastSubscription = currentPage * subscriptionsPerPage;
  const indexOfFirstSubscription =
    indexOfLastSubscription - subscriptionsPerPage;
  const currentSubscriptions = subscriptions.slice(
    indexOfFirstSubscription,
    indexOfLastSubscription
  );

  const totalPages = Math.ceil(subscriptions.length / subscriptionsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to refresh chart and data components
  const refreshChartAndData = (updatedSubscriptions) => {
    console.log("Refreshing chart and data components...");
    // Here you could add any specific logic if needed
    // SubscriptionsChart and SubscriptionsData will re-render with new data
  };

  return (
    <div className="flex justify-center items-center p-4 bg-gray-100 dark:bg-gray-900 overflow-x-hidden">
      <div className="w-full max-w-[80%] lg:max-w-[80%] bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-900">
          <div className="overflow-x-auto pt-12">
            {subscriptions.length > 0 && !error ? (
              <>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        S. No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Car Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Plan Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Time Slot
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {currentSubscriptions.map((sub, index) => (
                      <tr key={sub._id} className="h-[60px]">
                        <td className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                          {index + 1 + indexOfFirstSubscription}
                        </td>
                        <td className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                          {sub.carType}
                        </td>
                        <td className="px-6 py-4 text-left text-sm text-gray-500 dark:text-gray-300">
                          {sub.planType}
                        </td>
                        <td className="px-6 py-4 text-left text-sm text-gray-500 dark:text-gray-300">
                          {formatDate(sub.startDate)}
                        </td>
                        <td className="px-6 py-4 text-left text-sm text-gray-500 dark:text-gray-300">
                          {sub.timeSlot}
                        </td>
                        <td className="px-6 py-4 text-left text-sm font-medium flex space-x-2">
                          <button
                            className="text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 p-1 rounded"
                            aria-label="View"
                            onClick={() => handleView(sub._id)}
                          >
                            <FaEye size={16} />
                          </button>
                          <button
                            className="text-yellow-500 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-800 p-1 rounded"
                            aria-label="Edit"
                            onClick={() => handleEdit(sub._id)}
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            className="text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 p-1 rounded"
                            aria-label="Delete"
                            onClick={() => handleDelete(sub._id)}
                          >
                            <FaTrash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-end items-center py-4 space-x-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`p-2 rounded ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-500"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      <FaChevronLeft size={16} />
                    </button>
                    <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-300 text-gray-500"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      <FaChevronRight size={16} />
                    </button>
                  </div>
                )}
                {/* Render the chart and data components with updated subscriptions */}
                <SubscriptionsChart subscriptions={subscriptions} />
                <SubscriptionsData subscriptions={subscriptions} />
              </>
            ) : (
              <div className="text-center py-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {error ? error : "No subscriptions available"}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTable;
