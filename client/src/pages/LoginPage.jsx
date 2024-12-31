import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from './contexts/UserContext';
import axios from './utils/axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const loginUser = async (e) => {
    // console.log('dada');
    e.preventDefault();
    await axios
      .post(
        '/login',
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(({ data }) => {
        // console.log(data);
        toast(data);
        setUser(data);
        navigate('/');
      })
      .catch((err) => {
        alert('Login Failed');
        console.log(err);
      });
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl text-center mb-4 ">Login </h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            name="username"
            id="username"
            placeholder="your@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="provide your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="underline text-black">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;