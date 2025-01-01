// src/providers/UserContextProvider.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './pages/contexts/UserContext';
import axios from './pages/utils/axios';

// Export the provider as a React component
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const naviagate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token');
      console.log(token);
      if (token) {
        try {
          // await axios.get('/profile').then(({ data }) => {
          //   setUser(data);
          //   sessionStorage.setItem('token', data);
          // });
          await axios
            .get('/profile', {
              headers: {
                Authorization: `${token}`, // Add the token to the header
              },
            })
            .then(({ data }) => {
              setUser(data);
            });
        } catch {
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
