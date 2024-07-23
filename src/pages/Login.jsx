import { useState } from 'react'
// import LoginImage from "../assets/Images/login.jpg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE = 'http://localhost:3000';
import Logo from "../assets/logo.png";
import Pattern from "../assets/pattern.png";

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');
  const [exp, setExp] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const [isLogin, setIslogin] = useState(true);
  const [visible, setVisible] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

  const switchSection = () => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
      setIslogin(!isLogin);
    }, 250);
  };

  const signUp = async () => {
    const data = await axios.post(`${API_BASE}/account/signup`, { name, anonymousName, email, password });

    console.log(data);
    if (data.status == 201) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('username', data.data.username);
      localStorage.setItem('anonymousName', data.data.anonymousName);
      localStorage.setItem('mhiResponse', data.data.mhiResponse);
      localStorage.setItem('isMhiAsked', false);
      navigate('/home');
    }
  }
  const signIn = async (e) => {
    e.preventDefault();
    const data = await axios.post(`${API_BASE}/account/signin`, { email1, password1 });

    console.log(data);
    if (data.status == 200) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('username', data.data.username);
      localStorage.setItem('anonymousName', data.data.anonymousName);
      localStorage.setItem('mhiResponse', data.data.mhiResponse);
      localStorage.setItem('isMhiAsked', false);
      if (data.data.mhiResponse.indexOf('') == -1)
        localStorage.setItem('isMhiAsked', true);
      navigate('/');
    }
  }

  const addTag = (e) => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  async function sendOTP() {
    const response = await axios.post(`http://localhost:3000/interviewer/sendOtp`, {email, name});
    console.log(response.data);
    // const token = response.data;
    // return token;
  }

  return <>
    <div className={visible ? "fade-in flex items-center justify-center min-h-screen bg-gradient opacity-0" : "fade-out flex items-center justify-center min-h-screen bg-slate-100"} >
      <img src={Pattern} className="absolute z-0 object-cover w-full h-full opacity-20" />
      <div
        className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 text-gray-700"
      >
        {isLogin ?
          <div className="flex flex-col justify-center p-8 md:p-14">
            <img src={Logo} className='w-40 mb-3' />
            <span className="mb-3 text-4xl font-bold">Welcome back</span>
            <span className="font-light text-gray-400 mb-4">
              Welcom back! Please enter your details
            </span>
            <form>
              <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email1"
                  id="email1"
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                  required
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
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="flex justify-center w-full py-4">
                <span className="font-bold text-md">Forgot password</span>
              </div>
              <button
                className="w-96 bg-teal-blue text-white p-2 rounded-lg mb-6 border hover:border-gray-300 hover:bg-dark-blue"
                type='submit'
                onClick={(e) => navigate("/")}
              >
                Sign in
              </button>
            </form>
            <div className="text-center text-gray-400">
              Dont have an account?
              <button className="font-bold text-teal-blue" onClick={switchSection}> Sign up</button>
            </div>
          </div> :

          <form className="w-[50vw] flex flex-col justify-center p-8 md:p-14">
            <img src={Logo} className='w-40 mb-3' />
            <span className="mb-3 text-4xl font-bold">New here?</span>
            <span className="font-light text-gray-400 mb-8">
              Sign up now and lets get started!
            </span>
            <div className="py-2">
              <span className="mb-2 text-md">Name</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="py-2 flex flex-col">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="flex justify-end mt-2">
                <button className="text-xs" onClick={sendOTP}>Send OTP</button>
              </div>
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Domain Expertise</span>
              <div className='flex'>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-s-md placeholder:font-light placeholder:text-gray-500"
                  name="domain"
                  id="domain"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ex: React, NodeJs, Python, etc."
                />
                <button className='bg-teal-blue text-white w-10 rounded-e-md' onClick={addTag}>+</button>
              </div>
            </div>
            <div>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  style={{
                    display: 'inline-block',
                    padding: '5px 10px',
                    margin: '5px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '20px',
                  }}
                >
                  {tag}
                  <span
                    className='ml-2 cursor-pointer text-primary-blue'
                    onClick={() => handleRemoveTag(index)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Experience (In Months)</span>
              <input
                type="number"
                name="experience"
                id="experience"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                required
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Time Availibility</span>
              <div className='flex gap-3'>
                <div className='flex items-end w-full gap-3'>
                  <span className='text-gray-400'>from</span>
                  <input
                    type="time"
                    name="fromtime"
                    id="fromtime"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                  />
                </div>
                <div className='flex items-end w-full gap-3'>
                  <span className='text-gray-400'>to</span>
                  <input
                    type="time"
                    name="totime"
                    id="totime"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="py-2 pb-10">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                required
              />
            </div>
            <button
              className="w-full bg-teal-blue text-white p-2 rounded-lg mb-6 border hover:border-gray-300 hover:bg-dark-blue"
              onClick={signUp}
              type='submit'
            >
              Sign up
            </button>
            <div className="text-center text-gray-400">
              Dont have an account?
              <button className="font-bold text-teal-blue" onClick={switchSection}> Log In</button>
            </div>
          </form>
        }


      </div>
    </div>
  </>
}

export default Login;