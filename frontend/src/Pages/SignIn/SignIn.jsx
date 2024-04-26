import React, { useContext, useState } from 'react'
import GenderBox from './GenderBox';
import { Link } from 'react-router-dom';
import useSignIn from '../../Hooks/useSignIn';
import Context from '../../Context/ContextApi';

const SignIn = () => {
  const [gender, setgender] = useState('');
  const { loading, signIn } = useSignIn();
  const [SignUpData, setSignUpData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    gender: gender,
  });
  const context = useContext(Context);
  const { setAuthToken } = context;
  // Handling the onChange

  const handleOnChange = (event) => {
    setSignUpData({ ...SignUpData, [event.target.name]: event.target.value });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      SignUpData.gender = gender;
      const response = await signIn(SignUpData.fullName, SignUpData.username, SignUpData.email, SignUpData.password, SignUpData.gender);
      if (response.error) {
        return new Error(response.error);
      }
      else {
        localStorage.setItem("token", response.jwt);
        setAuthToken(response.jwt);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
        <div className="w-full p-4 rounded-lg shadow-md bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
          <h1 className="text-center text-gray-100">Sign-In to Chat-App</h1>
          <form className="my-2">
            <label className="input input-bordered flex items-center gap-2 my-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" className="grow" name='fullName' value={SignUpData.fullName} onChange={handleOnChange} placeholder="Full name" />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" className="grow" name='username' value={SignUpData.username} onChange={handleOnChange} placeholder="Username" />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className="grow" name='email' value={SignUpData.email} onChange={handleOnChange} placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" className="grow" name='password' onChange={handleOnChange} value={SignUpData.password} />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-1 cursor-pointer">
              <GenderBox setgender={setgender} />
            </label>
            <Link to="/login" className="link text-sm hover:underline hover:text-blue-600 ms-1 inline-block">Already have a account ?</Link>
            <button disabled={loading} className="btn btn-block btn-sm mt-2" onClick={onSubmit}> {loading ? <span className='loading loading-spinner'></span> : 'Sign-In'} </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
