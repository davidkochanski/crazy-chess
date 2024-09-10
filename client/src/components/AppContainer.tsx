import { Outlet, useOutletContext } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout, addDummyCard, setCards } from "../config/api";
import { useNavigate } from "react-router-dom";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import queryClient from "../config/queryClient";
import { AxiosResponse } from "axios";

type ContextType = {
    user: any;
    isLoading: boolean;
    handleAddDummyCard: UseMutateFunction<AxiosResponse<any, any>, Error, any, unknown> // ts voodoo magic
    handleSetCards: UseMutateFunction<AxiosResponse<any, any>, Error, any, unknown> // ts voodoo magic
}

const AppContainer = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    const { mutate: handleLogout } = useMutation({
        mutationFn: logout,
        onSettled: () => {
            queryClient.clear();
        }
    });

    const { mutate: handleAddDummyCard } = useMutation({
        mutationFn: addDummyCard,
        onSuccess: (data) => {
            console.log("Card added successfully", data);
        },
        onError: (error) => {
            console.error("Failed", error);
        }
    });

    const { mutate: handleSetCards } = useMutation({
        mutationFn: setCards,
        onSuccess: (data) => {
            console.log("Cards set successfully", data);
        },
        onError: (error) => {
            console.error("Failed", error);
        }
    });

    return (
        isLoading ? <div>Loading...</div> :
            (user ? <div>Welcome, {(user as any).name}! <button onClick={handleLogout}>Log Out</button> <Outlet context={{ user, isLoading, handleAddDummyCard, handleSetCards  } satisfies ContextType} /> </div>
                : <div>You are not logged in! <button onClick={() => { navigate("/login") }}>Log In</button> <Outlet context={{ user, isLoading, handleAddDummyCard, handleSetCards } satisfies ContextType} /> </div>
            )
    );
}

export default AppContainer;

export function useUser() {
    return useOutletContext<ContextType>();
}
