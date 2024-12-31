import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from './utils/axios';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerUser = async (e) => {
    e.preventDefault();
    await axios
      .post('/register', {
        name,
        email,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        toast('Successfull Registration');
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl text-center mb-4 ">Register </h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="your name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="provide your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
