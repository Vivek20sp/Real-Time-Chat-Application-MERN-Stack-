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
        try {
            const response = await login(loginComponents.username, loginComponents.email, loginComponents.password);
            localStorage.setItem('token', response.jwt);
            setAuthToken(response.jwt);
        } catch (error) {
            // Handle login error (e.g., display error message to the user)
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
                <div className="w-full p-4 rounded-lg shadow-md bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
                    <h1 className="text-center text-gray-100">Login to Chat-App</h1>
                    <form className="my-2">
                        {/* Form inputs */}
                        <button disabled={loading} className="btn btn-block btn-sm mt-2" onClick={(e) => onSubmit(e)}>
                            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
