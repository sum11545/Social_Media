import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/admin');
      setUsers(response.data); // Assuming response.data is an array of users
    } catch (err) {
      setError('Failed to fetch records. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Admin Dashboard</h1>

      {loading && <div className="text-white text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            
            <div className="p-5">
              <h5 className="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-red-300" >
                Name: {user.name}
              </h5>
              <p className="mb-3 font-normal  text-gray-700 dark:text-red-300">
                Social Media Handle: {user.url || 'N/A'}
              </p>
              <h6 className="text-lg font-semibold text-gray-900 dark:text-yellow-300">Images:</h6>
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {user.images && user.images.length > 0 ? (
                  user.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`User Upload ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No images uploaded</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
