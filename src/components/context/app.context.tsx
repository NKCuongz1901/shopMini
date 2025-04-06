import { createContext, useContext, useState } from "react";


interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticate: (v: boolean) => void;

}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
    children: React.ReactNode
}

export const AppProvider = (props: TProps) => {
    const [isAuthenticated, setIsAuthenticate] = useState<boolean>(false);
    return (
        <CurrentAppContext.Provider value={{
            isAuthenticated, setIsAuthenticate
        }}>
            {props.children}
        </CurrentAppContext.Provider>
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