import { useState, useEffect, useMemo } from 'react'
// import LoginImage from "../assets/Images/login.jpg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE = 'http://localhost:3000';
import Logo from "../assets/logo.png";
import Pattern from "../assets/pattern.png";
import { TiTick } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useDropzone } from 'react-dropzone';
import { FaFileAlt } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [email1, setEmail1] = useState('');
  const [otp, setOtp] = useState('');
  const [password1, setPassword1] = useState('');
  const [exp, setExp] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const [isLogin, setIslogin] = useState(true);
  const [visible, setVisible] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

  const [isSent, setIsSent] = useState(0);
  const [isVerified, setIsVerified] = useState(0);

  const switchSection = () => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
      setIslogin(!isLogin);
    }, 250);
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`http://localhost:3000/interviewer/login`, { email: email1, password: password1 });

      console.log(data);
      if (data.status == 200) {
        Cookies.set('token', data.data.token, { expires: 1 });
        Cookies.set('name', data.data.interviewer.name, { expires: 1 });
        Cookies.set('email', data.data.interviewer.email, { expires: 1 });

        // localStorage.setItem('token', data.data.token);
        // localStorage.setItem('name', data.data.interviewer.name);
        // localStorage.setItem('email', data.data.interviewer.email);
        navigate('/');
      }
    } catch (error) {
      if (error.response.status === 400) toast("Invalid credentials", { type: 'error' });
      // console.log(error);
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
    setIsSent(1);
    const response = await axios.post(`http://localhost:3000/interviewer/sendOtp`, { email, name });
    console.log(response.data);
    if (response.status === 200) setIsSent(2);
    else setIsSent(0);
    // const token = response.data;
    // return token;
  }
  async function verifyOTP() {
    try {
      setIsVerified(1);
      const response = await axios.post(`http://localhost:3000/interviewer/verifyOtp`, { email, otp });
      console.log(response.data);
      setIsVerified(2);
    } catch (error) {
      if (error.response.status === 400) setIsVerified(4);
    }
  }

  async function register(e) {
    e.preventDefault();
    if (isVerified == 2) {
      const data = await axios.post(`http://localhost:3000/interviewer/register`, { name, email, password, exp, timeFrom: fromTime, timeTo: toTime, domains: tags, days: selectedDays });

      console.log(data);
      if (data.status == 201) {
        // localStorage.setItem('token', data.data.token);
        // localStorage.setItem('username', data.data.username);
        toast("Account created successfully", { type: 'success' });
        switchSection();
      }
    }
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
    console.log(selectedDays);
  };

  useEffect(() => {
    let token = Cookies.get('token');
    if (token) navigate("/");
  }, []);

  const [noVideo, setNoVideo] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/*': [],         // Accept all image types
      'application/pdf': [], // Accept PDF files
      'application/msword': [], // Accept DOC files
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [], // Accept DOCX files
    }
  });

  let classes = useMemo(() => (
    'upload-box' +
    (isFocused ? ' focused-style' : '') +
    (isDragAccept ? ' accept-style' : '') +
    (isDragReject ? ' reject-style' : '')
  ), [isFocused, isDragAccept, isDragReject]);

  async function handleUpload(e) {
    e.preventDefault();
    console.log(acceptedFiles);

    if (acceptedFiles.length == 0) setNoVideo(true);
    else {
      setNoVideo(false);
      const formData = new FormData();
      const fileName = `${localStorage.getItem('email')}_${title}_${Date.now()}.mp4`; // Include video name in the filename
      formData.append('video', acceptedFiles[0], fileName);
      // formData.append('video', acceptedFiles[0]);
      formData.append('title', title);
      formData.append('desc', desc);
      formData.append('fileName', fileName);
      formData.append('name', localStorage.getItem('name'));

      const response = await axios.post("http://localhost:3000/video/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // console.log(response.data);

      if (response.status == 201) {
        setTitle('');
        setDesc('');

        setIsSuccess(true);
        // setTimeout(() => {
        //   setIsSuccess(false);
        //   navigate('/myvideos ');

        // }, 2000);

      }
    }
  }

  return <>
    <div className={visible ? "fade-in flex items-center justify-center min-h-screen bg-gradient opacity-0 relative" : "fade-out flex items-center justify-center min-h-screen bg-slate-100 relative"} >
      <ToastContainer />
      <img src={Pattern} className="absolute z-0 object-cover w-full h-full opacity-20" />
      <div
        className="w-full md:w-fit relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 text-gray-700"
      >
        {isLogin ?
          <div className="flex flex-col justify-center p-8 md:p-14">
            <img src={Logo} className='w-40 mb-3' />
            <span className="mb-3 text-4xl font-bold">Welcome back</span>
            <span className="font-light text-gray-400 mb-4">
              Welcom back! Please enter your details
            </span>
            <form onSubmit={signIn}>
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
                className="w-96 bg-teal-blue text-white p-2 rounded-lg mb-6 border "
                type='submit'
              >
                Sign in
              </button>
            </form>
            <div className="text-center text-gray-400">
              Dont have an account?
              <button className="font-bold text-teal-blue" onClick={switchSection}> Sign up</button>
            </div>
          </div> :

          <form onSubmit={register} className="md:w-[65vw] lg:w-[50vw] flex flex-col justify-center p-8 md:p-14">
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
                {isSent == 2 && <TiTick className='text-primary-blue' />}
                {isSent == 2 ? <div className='flex gap-5'><p className={`text-primary-blue text-xs`} onClick={sendOTP}>OTP sent</p>
                  <button className={`text-dark-blue text-xs`} onClick={sendOTP}>Resend OTP</button>
                </div> :
                  isSent == 1 ? <p className={`text-dark-blue text-xs`} onClick={sendOTP}>Sending...</p> :
                    <button className={`text-dark-blue text-xs`} onClick={sendOTP}>Send OTP</button>
                }
              </div>
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">OTP</span>
              <input
                type="number"
                max={999999}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="domain"
                id="domain"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="012345 "
              />
              <div className="flex justify-end mt-2">
                {isVerified == 2 && <TiTick className='text-primary-blue' />}
                {isVerified == 2 ? <button className={`text-primary-blue text-xs`} onClick={verifyOTP}>Email verfied</button> :
                  isVerified == 1 ? <p className={`text-dark-blue text-xs`} onClick={verifyOTP}>Verifying...</p> :
                    isVerified == 4 ? <button className={`text-red-500 text-xs`} onClick={verifyOTP}>Invalid OTP, Verify again?</button> :
                      <button className={`text-dark-blue text-xs`} onClick={verifyOTP}>Verify Email</button>
                }
              </div>
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Domain Expertise</span>
              <div className='flex'>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-s-md placeholder:font-light placeholder:text-gray-500"
                  name="domains"
                  id="domains"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ex: React, NodeJs, Python, etc."
                />
                <button type='button' className='bg-teal-blue text-white w-10 rounded-e-md' onClick={addTag}>+</button>
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
            <div className="py-2 mt-2">
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
            <div className="py-2 mt-2">
              <span className="mb-2 text-md">Day Availibility</span>
              <div className="flex flex-wrap justify-between gap-3 py-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className={`cursor-pointer w-12 text-center py-2.5 rounded-full border ${selectedDays.includes(day) ? 'bg-teal-blue text-white border-lightbg-teal-blue' : 'bg-gray-100 text-black'}`}
                    onClick={() => toggleDay(day)}
                  >
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>
            </div>
            <div className="py-2 mt-10">
              <span className="mb-10 text-md">Time Availibility</span>
              <div className='flex gap-3'>
                <div className='flex items-end w-full gap-3'>
                  <span>from</span>
                  <input
                    type="time"
                    name="timeFrom"
                    id="timeFrom"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                  />
                </div>
                <div className='flex items-end w-full gap-3'>
                  <span>to</span>
                  <input
                    type="time"
                    name="timeTo"
                    id="timeTo"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="py-2 pb-10 mt-10">
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
            <span className="mb-2 text-md">Document of Proof (Offer Letter/ Employment Contract/ Company ID Card/ Employment Verification Letter)</span>
            <div {...getRootProps({ className: classes })}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the document here ...</p> :
                  noVideo ?
                    <p className="red-alert">Select a document to upload! Drag & drop a document here, or click to select a document</p> :
                    <p>Drag & drop a document here, or click to select a document</p>
              }
            </div>

            {acceptedFiles.map(file => <div className="card" key={file.path}>
              <div className="card-body d-flex justify-content-between align-items-center mb-12">
                <div className="flex items-center gap-1 ">
                  {/* <img src={FileIcon} /> */}
                  <FaFileAlt className='text-xl' />
                  <h6 className="card-title text-sm">{file.path}</h6>
                </div>
                <h6 className="card-text text-sm">size: {(file.size / (1024 * 1024)).toFixed(2)} mb</h6>
              </div>
            </div>
            )}
            <button
              className="w-full bg-teal-blue text-white p-2 rounded-lg mb-6 border "
              type='submit'
            >
              Sign up
            </button>
            <div className="text-center text-gray-400">
              Dont have an account?
              <button className="font-bold text-teal-blue" type='button' onClick={switchSection}> Log In</button>
            </div>
          </form>
        }


      </div>
    </div>
  </>
}

export default Login;