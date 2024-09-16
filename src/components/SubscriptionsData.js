import React, { useEffect, useState } from 'react';
import { SubscriptionsCount } from '../api/apiService'; // Import your API function

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const SubscriptionsData = ({ subscriptions }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SubscriptionsCount(); // Call your API method
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subscriptions]);

  useEffect(() => {
    // Function to update the theme state when theme changes
    const updateTheme = () => {
      const root = window.document.documentElement;
      const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
      setTheme(currentTheme);
    };

    // Listen to changes in the document root for theme updates
    const observer = new MutationObserver(updateTheme);

    // Observe changes to class attributes of the root element
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Check the initial theme when component mounts
    updateTheme();

    // Cleanup observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={`flex justify-center items-center min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-4xl overflow-x-auto ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded-lg shadow-md`}>
        <h1 className={`text-2xl font-bold mb-4 text-center p-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Subscriptions Data</h1>

        <table className={`min-w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-gray-300`}>
          <thead className={`top-0 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} border-b border-gray-300`}>
            <tr>
              <th className="border px-4 py-2 text-left w-2/12">S. No.</th>
              <th className="border px-4 py-2 text-left w-3/12">Date</th>
              <th className="border px-4 py-2 text-left w-3/12">Exterior Count</th>
              <th className="border px-4 py-2 text-left w-3/12">Interior Count</th>
            </tr>
          </thead>
        </table>

        <div className="max-h-[450px] overflow-y-auto overflow-x-auto">
          <table className={`min-w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-gray-300`}>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2 text-left w-2/12">{index + 1}</td>
                  <td className="border px-4 py-2 text-left w-3/12">{formatDate(item._id)}</td>
                  <td className="border px-4 py-2 text-left w-3/12">{item.exteriorCount}</td>
                  <td className="border px-4 py-2 text-left w-3/12">{item.interiorCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsData;
