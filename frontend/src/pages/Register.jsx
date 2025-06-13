import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Please enter a valid email address';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
     if (errors[e.target.name] || errors.form) {
        const currentErrors = { ...errors };
        delete currentErrors[e.target.name];
        delete currentErrors.form;
        setErrors(currentErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      const apiError = err.response?.data?.error || 'Registration failed. Please try again.';
      setErrors({ form: apiError });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:grid md:grid-cols-2 lg:grid-cols-5">
      <div className="flex flex-col justify-center items-center w-full min-h-screen px-4 py-10 bg-white lg:col-span-2">
        <div className="w-full max-w-sm">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
            <p className="mt-2 text-gray-500">Join our library management system.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="e.g., smartreader"
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Must be at least 8 characters"
            />

            {errors.form && <p className="text-red-500 text-sm mb-4 text-center">{errors.form}</p>}

            <div className="mt-6">
                <Button type="submit" text="Register" className="bg-lime-500 hover:scale-105 text-white" />
            </div>

            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-lime-600 hover:underline">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden lg:col-span-3 lg:block bg-cream">
            <div className="h-full w-full flex items-center justify-center">
                <img
                    src="/login.png"
                    alt="Register background"
                    className="w-full h-auto object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x1000/e2e8f0/334155?text=Image+Not+Found'; }}
                />
            </div>
        </div>
    </div>
  );
};

export default Register;

