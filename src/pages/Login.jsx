import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../assets/logo.png";
import Pattern from "../assets/pattern.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = 'http://localhost:3000';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  // State for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for signup
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  const [visible, setVisible] = useState(false);

  // Switch between login and signup forms
  const switchSection = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setIsLogin(!isLogin);
    }, 250);
  };

  // Handle signup form submission
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/api/account/signup`, {
        companyName,
        companyType,
        username,
        email: signupEmail,
        password: signupPassword
      });
      const { data } = response;
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('companyName', data.companyName); // Store company name
        setIsAuthenticated(true);
        navigate('/form');
        toast.success('Signup successful!');
      } else {
        console.error('Unexpected response:', data);
        toast.error('Unexpected response');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Error during signup');
    }
  };

  // Handle login form submission
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE}/api/account/signin`, { email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('companyName', data.companyName); // Store company name
        setIsAuthenticated(true);
        navigate('/form');
        toast.success('Login successful!');
      }
    } catch (error) {
      console.error('Error during signin:', error);
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className={visible ? "fade-in flex items-center justify-center min-h-screen bg-gradient opacity-0" : "fade-out flex items-center justify-center min-h-screen bg-slate-100"}>
      <img src={Pattern} className="absolute z-0 object-cover w-full h-full opacity-20" />
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 text-gray-700 w-full max-w-md">
        <div className="flex flex-col justify-center p-8 md:p-14 w-full">
          <img src={Logo} className='w-40 mb-3' />
          {isLogin ? (
            <>
              <span className="mb-3 text-4xl font-bold">Welcome back</span>
              <span className="font-light text-gray-400 mb-4">
                Welcome back! Please enter your details
              </span>
              <form onSubmit={signIn}>
                <div className="py-4">
                  <span className="mb-2 text-md">Email</span>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="py-4">
                  <span className="mb-2 text-md">Password</span>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                </div>
                <div className="flex justify-center w-full py-4">
                  <span className="font-bold text-md">Forgot password</span>
                </div>
                <button
                  className="w-full bg-teal-blue text-white p-2 rounded-lg mb-6 border hover:border-gray-300 hover:bg-dark-blue"
                  type='submit'
                >
                  Sign in
                </button>
              </form>
              <div className="text-center text-gray-400">
                Don't have an account?
                <button className="font-bold text-teal-blue" onClick={switchSection}> Sign up</button>
              </div>
            </>
          ) : (
            <>
              <span className="mb-3 text-4xl font-bold">New here?</span>
              <span className="font-light text-gray-400 mb-8">
                Sign up now and let's get started!
              </span>
              <form onSubmit={signUp}>
                <div className="py-2">
                  <span className="mb-2 text-md">Company Name</span>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    name="companyName"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="py-2">
                  <span className="mb-2 text-md">Company Type</span>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    name="companyType"
                    id="companyType"
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                  >
                    <option value="">Select Company Type</option>
                    <option value="Private">Private</option>
                    <option value="Startup">Startup</option>
                    <option value="Public">Public</option>
                    <option value="Non-Profit">Non-Profit</option>
                    <option value="Government">Government</option>
                  </select>
                </div>
                <div className="py-2">
                  <span className="mb-2 text-md">Username</span>
                  <div className='flex'>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-s-md placeholder:font-light placeholder:text-gray-500"
                      name="username"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="py-2">
                  <span className="mb-2 text-md">Email</span>
                  <div className='flex'>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-s-md placeholder:font-light placeholder:text-gray-500"
                      name="signupEmail"
                      id="signupEmail"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="py-2 pb-10">
                  <span className="mb-2 text-md">Password</span>
                  <input
                    type="password"
                    name="signupPassword"
                    id="signupPassword"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                </div>
                <button
                  className="w-full bg-teal-blue text-white p-2 rounded-lg mb-6 border hover:border-gray-300 hover:bg-dark-blue"
                  type='submit'
                >
                  Sign up
                </button>
                <div className="text-center text-gray-400">
                  Already have an account?
                  <button className="font-bold text-teal-blue" onClick={switchSection}> Log In</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Login;
