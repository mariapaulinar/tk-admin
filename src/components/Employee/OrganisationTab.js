import React, { useEffect } from 'react';
import { TextField, Grid, MenuItem } from '@mui/material';
import axiosInstance from '../../axiosInstance';

const OrganisationTab = ({ formData, handleChange, errors }) => {
  const [companies, setCompanies] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [workplaces, setWorkplaces] = React.useState([]);
  const [positions, setPositions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesResponse = await axiosInstance.get('/companies');
        const countriesResponse = await axiosInstance.get('/countries');
        const workplacesResponse = await axiosInstance.get('/workplaces');
        const positionsResponse = await axiosInstance.get('/positions');

        setCompanies(companiesResponse.data);
        setCountries(countriesResponse.data);
        setWorkplaces(workplacesResponse.data);
        setPositions(positionsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="company_id"
          name="company_id"
          label="Company"
          select
          fullWidth
          value={formData.company_id}
          onChange={handleChange}
          error={!!errors.company_id}
          helperText={errors.company_id}
        >
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="workplace_id"
          name="workplace_id"
          label="Workplace"
          select
          fullWidth
          value={formData.workplace_id}
          onChange={handleChange}
          error={!!errors.workplace_id}
          helperText={errors.workplace_id}
        >
          {workplaces.map((workplace) => (
            <MenuItem key={workplace.id} value={workplace.id}>
              {workplace.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="position_id"
          name="position_id"
          label="Position"
          select
          fullWidth
          value={formData.position_id}
          onChange={handleChange}
          error={!!errors.position_id}
          helperText={errors.position_id}
        >
          {positions.map((position) => (
            <MenuItem key={position.id} value={position.id}>
              {position.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="country_id"
          name="country_id"
          label="Country"
          select
          fullWidth
          value={formData.country_id}
          onChange={handleChange}
          error={!!errors.country_id}
          helperText={errors.country_id}
        >
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default OrganisationTab;
