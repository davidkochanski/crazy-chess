import { useQuery } from "@tanstack/react-query";
import { getUser } from "../config/api";
import { useState, useEffect } from "react";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
    const { data: user, ...rest } = useQuery({
        queryKey: [AUTH],
        queryFn: getUser,
        staleTime: Infinity,
        ...opts,
    });

    return {
        user,
        ...rest,
    };
};


export default useAuth;