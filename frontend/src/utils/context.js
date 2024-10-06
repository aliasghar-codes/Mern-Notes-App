import { createContext, useContext } from "react";

export const userContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: {},
    setUser: () => {}
});

export const UserContextProvider = userContext.Provider;

export default function useUserContext() {
    return useContext(userContext);
}
