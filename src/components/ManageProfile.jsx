import React, { useState, useEffect } from 'react';

const ManageProfile = () => {
  const [profileData, setProfileData] = useState({
    companyName: '',
    username: '',
    email: ''
  });

  useEffect(() => {
    // Fetch user data from local storage or API
    const fetchProfileData = () => {
      const companyName = localStorage.getItem('companyName');
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email'); // Assuming email is stored in local storage
      setProfileData({ companyName, username, email });
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, update profile data in local storage or via API
    console.log('Profile data submitted:', profileData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={profileData.companyName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default ManageProfile;
