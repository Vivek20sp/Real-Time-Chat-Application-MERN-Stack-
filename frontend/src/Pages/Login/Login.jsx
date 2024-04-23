import React, { useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";
import Context from '../../Context/ContextApi';

const Login = () => {
    const [loginComponents, setloginComponents] = useState({
        username: '',
        email: '',
        password: '',
    });
    const { loading, login } = useLogin();
    const context = useContext(Context);
    const { setAuthToken } = context;

    const handleOnChange = useCallback((event) => {
        setloginComponents({ ...loginComponents, [event.target.name]: event.target.value });
    }, [loginComponents]);

    const onSubmit = async (event) => {
        event.preventDefault();
        let response;
        try {
            response = await login(loginComponents.username, loginComponents.email, loginComponents.password);
            localStorage.setItem('token', response.jwt);
            setAuthToken(response.jwt);
        } catch (error) {
            // Handle login error (e.g., display error message to the user)
            console.log(error.message);
            console.log(response);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
                <div className="w-full p-4 rounded-lg shadow-md bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
                    <h1 className="text-center text-gray-100">Login to Chat-App</h1>
                    <form className="my-2">
                        <label className="input input-bordered flex items-center gap-2 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input type="text" className="grow" name='username' value={loginComponents.username} onChange={handleOnChange} placeholder="Username" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input type="text" className="grow" name="email" value={loginComponents.email} onChange={handleOnChange} placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" name="password" value={loginComponents.password} onChange={handleOnChange} />
                        </label>
                        <Link to="/signin" className="link text-sm hover:underline hover:text-blue-600 ms-1 inline-block">Don't have a account ?</Link>
                        <button disabled={loading} className="btn btn-block btn-sm mt-2" onClick={(e) => onSubmit(e)}>
                            {
                                loading ? <span className="loading loading-spinner"></span> : 'login'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
