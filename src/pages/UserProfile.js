import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../hooks/auth';
import axiosInstance from '../axiosInstance';

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put('/me', formData);
      setUser(response.data);  // Actualizar el estado del usuario
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>User Profile</Typography>
      {message && <Typography color="primary" sx={{ mb: 2 }}>{message}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Profile
        </Button>
      </form>
    </Box>
  );
};

export default UserProfile;
