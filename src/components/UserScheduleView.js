import React, { useState, useEffect } from 'react';
import { getSubscriptionDetails } from './../api/apiService'; // Import your API service
import { useParams, useNavigate } from 'react-router-dom';

// Helper function to format date as dd-mm-yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const UserScheduleView = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from route params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user details when component mounts or userId changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getSubscriptionDetails(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        if (error.response) {
          // Server responded with a status other than 2xx
          setError(`Error ${error.response.status}: ${error.response.data.message || ''}`);
        } else if (error.request) {
          // Request was made but no response received
          setError('Network error: No response received from the server.');
        } else {
          // Something happened while setting up the request
          setError('');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Handle navigation to the users list
  const handleBack = () => {
    navigate('/users');    
  };

  if (loading) return <p className="text-center text-gray-900 dark:text-gray-100">Loading...</p>;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-500"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zm0 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-red-500 text-lg mt-4">No Data Found</p>
      <button 
        onClick={handleBack} 
        className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Go Back
      </button>
    </div>
  );
  if (!user) return <p className="text-center text-gray-900 dark:text-gray-100">User not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-[70px] bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Go Back button (Top Right) */}
        {/* <div className="absolute top-4 right-4">
          <button 
            onClick={handleBack}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Subscription List View
          </button>
        </div> */}
        
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" style={{overflow:"hidden"}}>User Schedule</h2>

        {/* Subscription Details */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Subscription Details</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex bg-gray-200 dark:bg-gray-600 font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 p-2">
              <div className="w-1/6">S No</div>
              <div className="w-1/4">Detail</div>
              <div className="w-1/4 text-center">Value</div>
              <div className="w-1/4 text-right"></div> {/* Empty for alignment purposes */}
            </div>
            <div className="flex bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 p-2">
              <div className="w-1/6">1</div>
              <div className="w-1/4">Car Type</div>
              <div className="w-1/4 text-center">{user.carType || 'N/A'}</div>
              <div className="w-1/4 text-right"></div>
            </div>
            <div className="flex bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 p-2">
              <div className="w-1/6">2</div>
              <div className="w-1/4">Plan Type</div>
              <div className="w-1/4 text-center">{user.planType || 'N/A'}</div>
              <div className="w-1/4 text-right"></div>
            </div>
            <div className="flex bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 p-2">
              <div className="w-1/6">3</div>
              <div className="w-1/4">Start Date</div>
              <div className="w-1/4 text-center">{user.startDate ? formatDate(user.startDate) : 'N/A'}</div>
              <div className="w-1/4 text-right"></div>
            </div>
            <div className="flex bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 p-2">
              <div className="w-1/6">4</div>
              <div className="w-1/4">Time Slot</div>
              <div className="w-1/4 text-center">{user.timeSlot || 'N/A'}</div>
              <div className="w-1/4 text-right"></div>
            </div>
          </div>
        </div>

        {/* Scheduled Services */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Scheduled Services</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex bg-gray-200 dark:bg-gray-600 font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 p-2">
              <div className="w-1/6">S No</div>
              <div className="w-1/4">Service Type</div>
              <div className="w-1/4 text-center">Date</div>
              <div className="w-1/4 text-right">Car Type</div>
            </div>
            {user.services && user.services.length > 0 ? (
              user.services.map((service, index) => (
                <div key={service._id} className="flex bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 p-2">
                  <div className="w-1/6">{index + 1}</div>
                  <div className="w-1/4">{service.type}</div>
                  <div className="w-1/4 text-center">{formatDate(service.date)}</div>
                  <div className="w-1/4 text-right">{user.carType || 'N/A'}</div>
                </div>
              ))
            ) : (
              <div className="flex bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-2">
                <div className="w-full text-center">No scheduled services.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserScheduleView;
