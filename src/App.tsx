import React, { useState, useEffect } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://jgwgluakhmgzemdsqjwc.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnd2dsdWFraG1nemVtZHNxandjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODQ3NDgsImV4cCI6MjA3NTA2MDc0OH0.GvBHIJtD-PM6Jpm1A3ujMBgn3QfxkvRGUYyn7IBDoV4';

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface User {
  id: string;
  user_name: string;
  mail_id: string;
  user_code: string;
  user_phnumber: string;
  user_addcol: string;
  created_at: string;
}

const App: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    userName: '',
    mailId: '',
    userCode: '',
    userPhnumber: '',
    userAddcol: ''
  });

  const handleHeaderClick = (): void => {
    setIsPopupVisible(true);
  };

  const handleOkClick = (): void => {
    setIsPopupVisible(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      setIsPopupVisible(false);
    }
  };

  // Load users from Supabase
  const loadUsers = async () => {
    try {
        const { data, error } = await supabase
          .from('User')
          .select('*')
          .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading users:', error);
        alert('Error loading users: ' + error.message);
        return;
      }
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading users: ' + (error as Error).message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      user_name: formData.userName,
      mail_id: formData.mailId,
      user_code: formData.userCode,
      user_phnumber: formData.userPhnumber,
      user_addcol: formData.userAddcol
    };
    
    try {
      if (editingUserId) {
        // Update existing user
        const { error } = await supabase
          .from('User')
          .update(userData)
          .eq('id', editingUserId);
        
        if (error) throw error;
        alert('User updated successfully!');
        setEditingUserId(null);
      } else {
        // Add new user
        const { error } = await supabase
          .from('User')
          .insert([userData]);
        
        if (error) throw error;
        alert('User added successfully!');
      }
      
      loadUsers();
      setFormData({ userName: '', mailId: '', userCode: '', userPhnumber: '', userAddcol: '' });
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user: ' + (error as Error).message);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Edit user
  const editUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setFormData({
        userName: user.user_name,
        mailId: user.mail_id,
        userCode: user.user_code,
        userPhnumber: user.user_phnumber || '',
        userAddcol: user.user_addcol || ''
      });
      setEditingUserId(userId);
      
      // Scroll to form
      document.querySelector('.form-container')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Delete user
  const deleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const { error } = await supabase
          .from('User')
          .delete()
          .eq('id', userId);
        
        if (error) throw error;
        alert('User deleted successfully!');
        loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user: ' + (error as Error).message);
      }
    }
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="app">
      <div className="header" onClick={handleHeaderClick}>
        NaRDil
      </div>

      {/* User Management Section */}
      <div className="user-section">
        <h2>User Management</h2>
        
        {/* Add User Form */}
        <div className="form-container">
          <h3>{editingUserId ? 'Edit User' : 'Add New User'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">User Name:</label>
              <input 
                type="text" 
                id="userName" 
                name="userName" 
                value={formData.userName}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="mailId">Mail ID:</label>
              <input 
                type="email" 
                id="mailId" 
                name="mailId" 
                value={formData.mailId}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="userCode">User Code:</label>
              <input 
                type="text" 
                id="userCode" 
                name="userCode" 
                value={formData.userCode}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="userPhnumber">Phone Number:</label>
              <input 
                type="tel" 
                id="userPhnumber" 
                name="userPhnumber" 
                value={formData.userPhnumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userAddcol">Additional Column:</label>
              <input 
                type="text" 
                id="userAddcol" 
                name="userAddcol" 
                value={formData.userAddcol}
                onChange={handleInputChange}
                placeholder="Enter additional information"
              />
            </div>
            <button type="submit">
              {editingUserId ? 'Update User' : 'Add User'}
            </button>
            {editingUserId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingUserId(null);
                  setFormData({ userName: '', mailId: '', userCode: '', userPhnumber: '', userAddcol: '' });
                }}
                style={{ marginLeft: '10px', background: '#6c757d' }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Users Table */}
        <div className="table-container">
          <h3>Users List</h3>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Mail ID</th>
                <th>User Code</th>
                <th>Phone Number</th>
                <th>Additional Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.user_name}</td>
                  <td>{user.mail_id}</td>
                  <td>{user.user_code}</td>
                  <td>{user.user_phnumber || 'N/A'}</td>
                  <td>{user.user_addcol || 'N/A'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit" 
                        onClick={() => editUser(user.id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={() => deleteUser(user.id)}
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

      {/* Popup */}
      <div 
        className={`popup-overlay ${isPopupVisible ? 'active' : ''}`}
        onClick={handleOverlayClick}
      >
        <div className="popup-content">
          <p>Hi All</p>
          <button onClick={handleOkClick}>Okay</button>
        </div>
      </div>
    </div>
  );
};

export default App;

