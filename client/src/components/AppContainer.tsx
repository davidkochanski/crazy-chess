import { Outlet, useOutletContext } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/queryClient";

// type ContextType = {
//     user: UserType | null;
//     isLoading: boolean;
// }

type ContextType = {
    user: any;
    isLoading: boolean;
}

const AppContainer = () => {
    const { user, isLoading } = useAuth();

    const navigate = useNavigate(); // used to send the user to different pages.

    const { mutate: handleLogout } = useMutation({
        mutationFn: logout,
        // onSettled instead of onSuccess, since logout it GET and we just want to do something when it's done GET-ing
        onSettled: () => {
            queryClient.clear(); // clear cached things about the user. complete reset
            // navigate("/login", { replace: true });
        }
    });

    return (
        isLoading ? <div>Loading...</div> :
            (user ? <div>Welcome, {(user as any).name}!. <button onClick={handleLogout}>Log Out</button> <Outlet context={{ user, isLoading } satisfies ContextType} /> </div>
                : <div>You are not logged in! <button onClick={() => { navigate("/login") }}>Log In</button> <Outlet context={{ user, isLoading } satisfies ContextType} /> </div>
            )
    );

    
}

export default AppContainer;

export function useUser() {
    return useOutletContext<ContextType>();
}
