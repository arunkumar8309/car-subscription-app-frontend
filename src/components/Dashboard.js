
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Users from '../pages/Users';
import User from '../pages/User';

const Dashboard = ({ toggleDarkMode }) => {
  return (
    <>
    
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen">
          <Topbar toggleDarkMode={toggleDarkMode} />
          <main className="p-6 bg-gray-100 dark:bg-gray-700 flex-1">
            <Routes>
              <Route path="/:subscriptionId?" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:userId?" element={<User />} />
              
            </Routes>
          </main>
        </div>
      </div>
    </Router>
    </>
  );
};

export default Dashboard;
