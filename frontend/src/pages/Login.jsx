import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import InputField from '../components/InputField';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!form.identifier) newErrors.identifier = 'Username or email is required';
    if (!form.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await API.post('/auth/login', form);
      login(res.data.username, res.data.token);
      navigate('/books'); 
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <InputField
          label="Username or Email"
          type="text"
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          error={errors.identifier}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <a href="/register" className="text-blue-600 underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
