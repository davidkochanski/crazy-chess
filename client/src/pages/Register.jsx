import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../config/api";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate(); // used to send the user to different pages.

    const {mutate: handleRegister, isError, isPending } = useMutation({
        mutationFn: register, // API call to the backend. Axios will create a client and handle sending HTTP requests.
        onSuccess: () => {
            navigate("/", { replace: true });
            // replace just means that you can't click "back" and come back to this page - it is replaced on the page stack. 
        }
    })

    // I'll make this nicer later
    return (
        <div style={{display: "flex", flexDirection: "column", color: "white"}}>
            {isError && <div>ERROR!</div>}

            name
            <input type="text" autoFocus id="name" value={name} onChange={(e) => {setName(e.target.value)}} />

            email
            <input type="email" autoFocus id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            password
            <input type="password" autoFocus value={password} onChange={(e) => {setPassword(e.target.value)}} />

            confirm the password.
            <input type="password" autoFocus value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} />

            {/* Email and password are sent to login mutation function, which sends it to axios client, which sends it to backend via an HTTP request. woo! */}
            <button type="submit" disabled={!email || !password} onClick={() => handleRegister( {email, password, name, confirmPassword } )}>Register</button>

            {isPending && <div>Loading...</div>}
        </div>
    );
};
export default Register;
