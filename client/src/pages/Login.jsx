import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/api";
import "../Game.css";
import { validateEmail } from "../config/emailRegex";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // used to send the user to different pages.

    const { mutate: handleSignIn, isError, error, isPending } = useMutation({
        mutationFn: login, // API call to the backend. Axios will create a client and handle sending HTTP requests.
        onSuccess: () => {
            navigate("/", { replace: true });
            // replace just means that you can't click "back" and come back to this page - it is replaced on the page stack. 
        }
    })

    const isValidForm = () => {
        return email && validateEmail(email) && password && !isPending;
    }

    // I'll make this nicer later
    return (
        <div className="form-wrapper">
            <div className="form">
                <div className="form-header">
                    <h4>Welcome back! :)</h4>
                    <h2>Login to your account</h2>
                </div>

                <div className="form-content">
                    {isError && <div>Error: {error.message}</div>}

                    <h4 className="form-label">Email</h4>

                    <input type="email" autoFocus id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="example@mail.com" />

                    <h4 className="form-label">Password</h4>

                    <input type="password" autoFocus value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your password" onKeyDown={(e) => {if(e.key === "Enter" && isValidForm()) {handleSignIn( { email, password })}}} />

                    {/* Email and password are sent to login mutation function, which sends it to axios client, which sends it to backend via an HTTP request. woo! */}
                    <button type="submit" disabled={!isValidForm()} onClick={() => handleSignIn({ email, password })}>
                        {isPending ? <i class="fas fa-spinner fa-pulse"></i> : "Sign in"}

                    </button>

                    <h5 className="bottom-link">No acc? <Link to="/register">Register here</Link></h5>
                </div>

            </div>
        </div>
    );
};
export default Login;
