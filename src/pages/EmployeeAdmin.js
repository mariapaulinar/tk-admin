import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Button, Alert, AlertTitle } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import GeneralTab from '../components/Employee/GeneralTab';
import OrganisationTab from '../components/Employee/OrganisationTab';
import OtherTab from '../components/Employee/OtherTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const EmployeeAdmin = () => {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    personal_id: '',
    first_name: '',
    last_name: '',
    full_name: '',
    birth_date: '',
    age: '',
    start_date: '',
    seniority: '',
    gender: '',
    company_id: '',
    country_id: '',
    workplace_id: '',
    position_id: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { id } = useParams(); // Obtener el ID del empleado desde la URL
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // Determina si estamos en modo de edición

  useEffect(() => {
    if (isEditMode) {
      const fetchEmployee = async () => {
        try {
          const response = await axiosInstance.get(`/employees/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching employee data', error);
        }
      };

      fetchEmployee();
    }
  }, [id, isEditMode]);

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const calculateSeniority = (startDate) => {
    if (!startDate) return '';
    const today = new Date();
    const startDateObj = new Date(startDate);
    const years = today.getFullYear() - startDateObj.getFullYear();
    const monthDiff = today.getMonth() - startDateObj.getMonth();
    const seniority = years + monthDiff / 12;
    return seniority.toFixed(1);
  };

  const calculateFullName = (firstName, lastName) => {
    return `${lastName} ${firstName}`.trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'birth_date') {
      updatedFormData.age = calculateAge(value);
    } else if (name === 'start_date') {
      updatedFormData.seniority = calculateSeniority(value);
    } else if (name === 'first_name' || name === 'last_name') {
      updatedFormData.full_name = calculateFullName(
        name === 'first_name' ? value : formData.first_name,
        name === 'last_name' ? value : formData.last_name
      );
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [name]: '' });
    setApiError(null);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.personal_id) formErrors.personal_id = 'Personal ID is required';
    if (!formData.first_name) formErrors.first_name = 'First Name is required';
    if (!formData.last_name) formErrors.last_name = 'Last Name is required';
    if (!formData.birth_date) formErrors.birth_date = 'Birth Date is required';
    if (!formData.start_date) formErrors.start_date = 'Start Date is required';
    if (!formData.gender) formErrors.gender = 'Gender is required';
    if (!formData.company_id) formErrors.company_id = 'Company is required';
    if (!formData.workplace_id) formErrors.workplace_id = 'Workplace is required';
    if (!formData.position_id) formErrors.position_id = 'Position is required';
    if (!formData.country_id) formErrors.country_id = 'Country is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        if (isEditMode) {
          await axiosInstance.put(`/employees/${id}`, formData);
          setSuccessMessage('Employee information updated successfully!');
        } else {
          await axiosInstance.post('/employees', formData);
          setSuccessMessage('Employee information saved successfully!');
        }
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } catch (error) {
        if (error.response && error.response.data) {
          setApiError(error.response.data.message || 'An error occurred while saving the employee data.');
        } else {
          setApiError('An error occurred while saving the employee data.');
        }
      }
    }
  };

  const handleCancel = () => {
    navigate('/employees'); // Redirige al listado de empleados sin guardar
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
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}

      <Tabs value={value} onChange={handleTabChange} aria-label="Employee Admin Tabs">
        <Tab label="General" />
        <Tab label="Organisation" />
        <Tab label="Other" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GeneralTab formData={formData} handleChange={handleChange} errors={errors} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrganisationTab formData={formData} handleChange={handleChange} errors={errors} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OtherTab formData={formData} handleChange={handleChange} errors={errors} />
      </TabPanel>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
          {isEditMode ? 'Update' : 'Save'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeAdmin;
