import { useQuery } from "@tanstack/react-query";
import { getUser } from "../config/api";
import { useState, useEffect } from "react";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const { data: user, ...rest } = useQuery({
        queryKey: [AUTH],
        queryFn: getUser,
        staleTime: Infinity,
        enabled: isAuthenticated,  // Only fetch user data if authenticated
        ...opts,
    });

    return {
        user,
        isAuthenticated,
        ...rest,
    };
};


export default useAuth;