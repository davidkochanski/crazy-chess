import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../config/api";
import "../Game.css";
import { validateEmail } from "../config/emailRegex";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate(); // used to send the user to different pages.

    const { mutate: handleRegister, error, isError, isPending } = useMutation({
        mutationFn: register, // API call to the backend. Axios will create a client and handle sending HTTP requests.
        onSuccess: () => {
            navigate("/", { replace: true });
            // replace just means that you can't click "back" and come back to this page - it is replaced on the page stack. 
        }
    })

    const isValidForm = () => {
        return email && validateEmail(email) && password && password.length >= 8 && password === confirmPassword && !isPending;
    }

    // I'll make this nicer later
    return (
        <div className="form-wrapper">
            <div className="form">
                <div className="form-header">
                    <h4>Welcome :)</h4>
                    <h2>Register Your Account</h2>
                </div>

                <div className="form-content">
                    {isError && <div className="form-error">Error: {error.message}</div>}

                    <h4 className="form-label">Username</h4>

                    <input type="text" autoFocus id="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="David" />

                    <h4 className="form-label">Email</h4>

                    <input type="email" autoFocus id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="example@mail.com" />

                    <h4 className="form-label">Password</h4>

                    <input type="password" autoFocus value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Type Your Password" />

                    <h5>Must be at least 8 characters long.</h5>

                    <h4 className="form-label">Confirm Password</h4>

                    <input type="password" autoFocus value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm Your Password" onKeyDown={(e) => {if(e.key === "Enter" && isValidForm()) {handleRegister({ email, password, name, confirmPassword })}}}/>

                    {/* Email and password are sent to login mutation function, which sends it to axios client, which sends it to backend via an HTTP request. woo! */}
                    <button type="submit" disabled={!isValidForm()} onClick={() => handleRegister({ email, password, name, confirmPassword })}>Register</button>

                    <h5 className="bottom-link">Already have an account? <Link to="/login">Log in here</Link></h5>
                </div>

            </div>
        </div>
    );
};
export default Register;
