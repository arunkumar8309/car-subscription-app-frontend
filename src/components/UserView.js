import React, { useState, useEffect } from 'react';
import { getSubscriptionDetails } from './../api/apiService'; // Import your API service
import { useParams } from 'react-router-dom';

const UserView = () => {
  const { userId } = useParams(); // Get userId from route params
  console.log("userId",userId)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user details when component mounts or userId changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getSubscriptionDetails(userId);
        console.log("response.data",response.data)
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!user) return <p className="text-center">User not found.</p>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">User Details</h2>
        
        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">Name</h3>
          <p className="text-gray-800 dark:text-gray-100">{user.name}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">Email</h3>
          <p className="text-gray-800 dark:text-gray-100">{user.email}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">Phone</h3>
          <p className="text-gray-800 dark:text-gray-100">{user.phone}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">Address</h3>
          <p className="text-gray-800 dark:text-gray-100">{user.address}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">Subscription</h3>
          <p className="text-gray-800 dark:text-gray-100">{user.subscription || 'No subscription'}</p>
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => window.history.back()} 
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserView;
