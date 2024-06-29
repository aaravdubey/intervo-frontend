import { useState } from 'react'
// import LoginImage from "../assets/Images/login.jpg"
import { useNavigate } from 'react-router-dom';

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
      navigate('/home');
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

  return <>
    <div className={visible ? "fade-in flex items-center justify-center min-h-screen bg-gradient opacity-0" : "fade-out flex items-center justify-center min-h-screen bg-slate-100"} >
      <img src={Pattern} className="absolute z-0 object-cover w-full h-full opacity-20" />
      <div
        className="relative flex flex-col m-6 p-5 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 text-gray-700"
      >
        
          <div className="flex flex-col justify-center  p-8 md:p-14">
            <img src={Logo} className='w-40 mb-3' />
            <span className="mb-3 text-4xl font-bold">Welcome </span>
            <span className="font-light text-gray-400 mb-4">
             Please enter your details
            </span>
            <form>
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
              <div className="flex justify-center bg-blue-800 rounded-2xl mt-11 w-full py-4">
                <button className="font-bold text-white  text-md">LOGIN</button>
              </div>
             
            </form>
          
          </div> :

          
        


      </div>
    </div>
  </>
}

export default Login;