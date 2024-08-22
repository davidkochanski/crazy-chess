import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // used to send the user to different pages.

    const {mutate: handleSignIn, isError, isPending } = useMutation({
        mutationFn: login, // API call to the backend. Axios will create a client and handle sending HTTP requests.
        onSuccess: () => {
            navigate("/", { replace: true });
            // replace just means that you can't click "back" and come back to this page - it is replaced on the page stack. 
        }
    })

    // I'll make this nicer later
    return (
        <div style={{display: "flex", flexDirection: "column", color: "white"}}>
            {isError && <div>ERROR!</div>}

            email
            <input type="email" autoFocus id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            password
            <input type="password" autoFocus value={password} onChange={(e) => {setPassword(e.target.value)}} />

            {/* Email and password are sent to login mutation function, which sends it to axios client, which sends it to backend via an HTTP request. woo! */}
            <button type="submit" disabled={!email || !password} onClick={() => handleSignIn( {email, password } )}>Sign in</button>

            {isPending && <div>Loading...</div>}

            <Link to="/register">No acc? Sign up here</Link>
        </div>
    );
};
export default Login;
