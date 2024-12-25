import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState, useEffect } from "react";

type AuthUserType = {
    id: string;
    name: string;
    email: string;
    password: string;
};

type AuthContextType = {
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
};

export const AuthContext = createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => { },
});

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (authUser) {
            localStorage.setItem("user", JSON.stringify(authUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [authUser]);

    return (
        <AuthContext.Provider
            value={{
                authUser,
                setAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};