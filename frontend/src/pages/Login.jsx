import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import InputField from '../components/InputField';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

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
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: null });
    }
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
      const apiError = err.response?.data?.error || 'Login failed. Please check your credentials.';
      setErrors({ form: apiError });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:grid md:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col justify-center items-center w-full min-h-screen px-4 py-10 bg-white lg:col-span-2 ">
            <div className="w-full max-w-sm mx-8">
                <div className="text-left mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome To LMS!</h1>
                    <p className="mt-2 text-gray-500">Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <InputField
                    label="Username or Email"
                    type="text"
                    name="identifier"
                    value={form.identifier}
                    onChange={handleChange}
                    error={errors.identifier}
                    placeholder='penguinsmart'
                    />
                    <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder='*********'
                    />

                    {errors.form && <p className="text-red-500 text-sm mb-4 text-center">{errors.form}</p>}
                    
                    <div className="mt-6">
                        <Button type="submit" text="Sign In" className="bg-lime-500 hover:scale-105 text-white" />
                    </div>

                    <p className="mt-6 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="font-semibold text-lime-600 hover:underline">
                        Register
                    </a>
                    </p>
                </form>
            </div>
        </div>

        <div className="hidden lg:col-span-3 lg:block bg-cream">
            <div className="h-full w-full flex items-center justify-center">
                <img
                    src="/login.png"
                    alt="login illustration"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x1000/e2e8f0/334155?text=Image+Not+Found'; }}
                />
            </div>
        </div>
    </div>
  );
};

export default Login;

