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
        isLoading ? (
            <div className="loading">Loading...</div>
        ) : (
            user ? (
                <div>
                    <nav>
                        <h2><i className="fa-solid fa-chess"></i> Crazy Chess</h2>
                        <p>Welcome, {(user as any).name}!</p>
                        <button onClick={handleLogout}>Log Out</button>
                    </nav>
                    <Outlet 
                        context={{ 
                            user, 
                            isLoading, 
                            handleAddDummyCard, 
                            handleSetCards 
                        } satisfies ContextType} 
                    />
                </div>
            ) : (
                <div>
                    <nav>
                        <h2><i className="fa-solid fa-chess"></i> Crazy Chess</h2>
                        <p>You are not logged in! </p>
                        <button onClick={() => navigate("/login")}>Log In</button>
                    </nav>
                    <Outlet 
                        context={{ 
                            user, 
                            isLoading, 
                            handleAddDummyCard, 
                            handleSetCards 
                        } satisfies ContextType} 
                    />
                </div>
            )
        )
    );
    
}

export default AppContainer;

export function useUser() {
    return useOutletContext<ContextType>();
}
