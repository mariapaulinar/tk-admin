import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Alert, AlertTitle } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [apiError, setApiError] = useState(null);
  const { id } = useParams(); // Obtener el ID del usuario desde la URL para edición
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // Determina si estamos en modo de edición

  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(`/users/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      };

      fetchUser();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
    setApiError(null);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!isEditMode) {
      if (!formData.password) formErrors.password = 'Password is required';
    }
    if (formData.password !== formData.password_confirmation) {
      formErrors.password_confirmation = 'Passwords do not match';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        if (isEditMode) {
          await axiosInstance.put(`/users/${id}`, formData);
          setSuccessMessage('User updated successfully!');
        } else {
          await axiosInstance.post('/users', formData);
          setSuccessMessage('User created successfully!');
        }
        setTimeout(() => {
          setSuccessMessage(null);
          navigate('/users');
        }, 3000);
      } catch (error) {
        if (error.response && error.response.data) {
          setApiError(error.response.data);
        } else {
          setApiError('An error occurred while saving the user.');
        }
      }
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {apiError && (
        <Alert severity="error" onClose={() => setApiError(null)} sx={{ mb: 2 }}>
          <AlertTitle>Error</AlertTitle>
          {apiError}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage(null)} sx={{ mb: 2 }}>
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}

      <TextField
        required
        name="name"
        label="Name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        required
        name="email"
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        required={!isEditMode}
        name="password"
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        required={!isEditMode}
        name="password_confirmation"
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password_confirmation}
        onChange={handleChange}
        error={!!errors.password_confirmation}
        helperText={errors.password_confirmation}
      />

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {isEditMode ? 'Update User' : 'Create User'}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
