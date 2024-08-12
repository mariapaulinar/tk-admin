import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

const Header = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [employeeAnchorEl, setEmployeeAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null); // Para manejar el menú de usuarios

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEmployeeMenu = (event) => {
    setEmployeeAnchorEl(event.currentTarget);
  };

  const handleUserMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEmployeeAnchorEl(null);
    setUserAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a237e', position: 'relative' }}>
      <Toolbar>
        {/* Título a la izquierda */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TK
        </Typography>

        {/* Menús de navegación centrados */}
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex' }}>
          <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>
            Dashboard
          </Button>
          <Button
            color="inherit"
            aria-controls="employee-menu"
            aria-haspopup="true"
            onClick={handleEmployeeMenu}
            sx={{ marginRight: 2 }}
          >
            Employees
          </Button>
          <Menu
            id="employee-menu"
            anchorEl={employeeAnchorEl}
            open={Boolean(employeeAnchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'employee-menu-button',
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/employees/create">Create Employee</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/employees">Employee List</MenuItem>
          </Menu>
          <Button
            color="inherit"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleUserMenu}
            sx={{ marginRight: 2 }}
          >
            Users
          </Button>
          <Menu
            id="user-menu"
            anchorEl={userAnchorEl}
            open={Boolean(userAnchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'user-menu-button',
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/users/create">Create User</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/users">User List</MenuItem>
          </Menu>
        </Box>

        {/* Avatar y menú de usuario a la derecha */}
        <Box>
          <Avatar alt={user?.name} src="/path/to/user-avatar.jpg" onClick={handleMenu} sx={{ cursor: 'pointer' }} />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/profile">Edit Profile</MenuItem>
            <MenuItem onClick={() => { handleClose(); logout(); }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
