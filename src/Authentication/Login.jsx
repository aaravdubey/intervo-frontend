import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../assets/logo.png";
import Pattern from "../assets/pattern.png";

const API_BASE = 'https://unishare-backend-six.vercel.app/';

const Login = () => {
  const navigate = useNavigate();

  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/candidate/signin`, { email: email1, password: password1 });
      if (response.data.valid) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        toast.success('Login successful! Redirecting to home page...');
        setTimeout(() => {
          navigate('/home');
        }, 2000); // Redirect after 2 seconds
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className={visible ? "fade-in flex items-center justify-center min-h-screen bg-gradient opacity-0" : "fade-out flex items-center justify-center min-h-screen bg-slate-100"}>
      <img src={Pattern} className="absolute z-0 object-cover w-full h-full opacity-20" />
      <div className="relative flex flex-col m-6 p-5 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 text-gray-700">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <img src={Logo} className='w-40 mb-3' />
          <span className="mb-3 text-4xl font-bold">Welcome </span>
          <span className="font-light text-gray-400 mb-4">Please enter your details</span>
          <form onSubmit={signIn}>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 hover:border-blue-600 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email1"
                id="email1"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass1"
                id="pass1"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="w-full p-2 border border-gray-300 hover:border-blue-600 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            {errorMessage && ( // Conditionally render error message
              <div className="text-red-500 mb-4">
                {errorMessage}
              </div>
            )}
            <div>
              <button
                className="w-full bg-teal-blue text-white p-2 rounded-lg mb-6 border hover:border-gray-300 hover:bg-dark-blue my-4"
                type='submit'
              >LOGIN</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render toast messages */}
    </div>
  );
};

export default Login;
