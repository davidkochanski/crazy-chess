import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";
import { logout } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/queryClient";

const AppContainer = () => {
    const { user, isLoading } = useAuth();

    const navigate = useNavigate(); // used to send the user to different pages.

    const {mutate: handleLogout } = useMutation({
        mutationFn: logout,
        // onSettled instead of onSuccess, since logout it GET and we just want to do something when it's done GET-ing
        onSettled: () => {
            queryClient.clear(); // clear cached things about the user. complete reset
            // btw, this queryClient was originally in a jsx file, but it was moved so that it can be imported and one singular query instance exists for the whole file.
            navigate("/login", { replace: true });
        }
    })

    return (
        isLoading ? <div>Loading...</div> : 
        
        (user ? <div>Welcome, {user.name}!. <button onClick={handleLogout}>Log Out</button> <Outlet /> </div> // the Outlet renders the child of the route. in Game.tsx, that is the Board component.

            : <Navigate to="/login" replace state={{ redirectUrl: window.location.pathname }} />
        )
    )
}

export default AppContainer