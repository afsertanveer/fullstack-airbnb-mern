import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from './utils/axios';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null); // Use null for unselected state

  const handleChange = (event) => {
    setRole(Number(event.target.value)); // Convert the value to a number
  };

  const registerUser = async (e) => {
    e.preventDefault();
    await axios
      .post('/register', {
        name,
        email,
        role,
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
          <div className="">
            <select
              id="roleDropdown"
              value={role ?? ''}
              onChange={handleChange}
              // className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value={0}>User</option>
              <option value={1}>Admin</option>
              <option value={2}>Owner</option>
            </select>
          </div>
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
