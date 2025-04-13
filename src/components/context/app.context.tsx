import { getMe } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticate: (v: boolean) => void;
    user: IUser | null;
    setUser: (v: IUser | null) => void;
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;

}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
    children: React.ReactNode
}

export const AppProvider = (props: TProps) => {
    const [isAuthenticated, setIsAuthenticate] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);


    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("access_token");
            const refreshToken = localStorage.getItem("refresh_token");
            if (!accessToken && !refreshToken) {
                setIsAppLoading(false);
                return;
            }
            try {
                await sleep(1500);
                const res = await getMe();

                if (res && res.success && res.data?.user) {
                    setUser(res.data.user);
                    setIsAuthenticate(true);
                } else {
                    setIsAuthenticate(false);
                    setUser(null);
                }
            } catch (error) {
                setIsAuthenticate(false);
                setUser(null);
                console.error("Error fetching user:", error);
            } finally {
                setIsAppLoading(false);
            }
        };
        fetchUser();
    }, [])


    return (
        <>
            {isAppLoading === false ?
                <CurrentAppContext.Provider value={{
                    isAuthenticated, setIsAuthenticate, user, setUser, isAppLoading, setIsAppLoading
                }}>
                    {props.children}
                </CurrentAppContext.Provider>
                :
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <PacmanLoader
                        size={40}
                        color="#36d6b4"
                    />
                </div>

            }

        </>

    )

}

export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);
    if (!currentAppContext) {
        throw new Error(
            "currentAppContext has to be used within <CurrentUserContext.Provider>"
        );
    }
    return currentAppContext;

}