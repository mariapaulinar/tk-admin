import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box } from '@mui/material';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import EmployeeAdmin from './pages/EmployeeAdmin';
import EmployeeList from './pages/EmployeeList';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import UserProfile from './pages/UserProfile'; // Importar la nueva página de perfil
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './hooks/auth';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                element={
                  <>
                    <Header />
                    <Container>
                      <Box sx={{ mt: 4, mb: 4 }}>
                        <ProtectedRoute />
                      </Box>
                    </Container>
                  </>
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/create" element={<EmployeeAdmin />} />
                <Route path="/employees/edit/:id" element={<EmployeeAdmin />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/create" element={<UserForm />} />
                <Route path="/users/edit/:id" element={<UserForm />} />
                <Route path="/profile" element={<UserProfile />} /> {/* Nueva ruta para el perfil */}
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
