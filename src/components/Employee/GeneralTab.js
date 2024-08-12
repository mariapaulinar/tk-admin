import React from 'react';
import { TextField, Grid, MenuItem } from '@mui/material';

const GeneralTab = ({ formData, handleChange, errors }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="personal_id"
          name="personal_id"
          label="Personal ID"
          fullWidth
          value={formData.personal_id}
          onChange={handleChange}
          error={!!errors.personal_id}
          helperText={errors.personal_id}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="first_name"
          name="first_name"
          label="First Name"
          fullWidth
          value={formData.first_name}
          onChange={handleChange}
          error={!!errors.first_name}
          helperText={errors.first_name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="last_name"
          name="last_name"
          label="Last Name"
          fullWidth
          value={formData.last_name}
          onChange={handleChange}
          error={!!errors.last_name}
          helperText={errors.last_name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled
          id="full_name"
          name="full_name"
          label="Full Name"
          fullWidth
          value={formData.full_name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="birth_date"
          name="birth_date"
          label="Birth Date"
          type="date"
          fullWidth
          value={formData.birth_date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.birth_date}
          helperText={errors.birth_date}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled
          id="age"
          name="age"
          label="Age"
          fullWidth
          value={formData.age}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="start_date"
          name="start_date"
          label="Start Date"
          type="date"
          fullWidth
          value={formData.start_date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.start_date}
          helperText={errors.start_date}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled
          id="seniority"
          name="seniority"
          label="Seniority"
          fullWidth
          value={formData.seniority}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="gender"
          name="gender"
          label="Gender"
          select
          fullWidth
          value={formData.gender}
          onChange={handleChange}
          error={!!errors.gender}
          helperText={errors.gender}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="undefined">Undefined</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default GeneralTab;
