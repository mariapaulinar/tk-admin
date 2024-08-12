import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/me');
                setUser(response.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            const userResponse = await axiosInstance.get('/me');
            setUser(userResponse.data);
            navigate('/');
        } catch (error) {
            throw new Error('Invalid credentials');
        }
    };

    const logout = async () => {
        await axiosInstance.post('/logout');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
