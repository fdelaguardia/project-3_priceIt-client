import { useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/authService";
import { LoadingContext } from "./loading.context";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const { setIsLoading, setUser, setMessage } = useContext(LoadingContext)

    const navigate = useNavigate();

    const authenticateUser = () => {
        const token = localStorage.getItem("authToken");

        setIsLoading(true)

        if( token ){
            get("/auth/verify")
                .then((results) => {
                    console.log("Are we logged in ?", results.data)
                    setUser(results.data)
                })
                .catch((err) => {
                    localStorage.clear();
                    setIsLoading(false)
                    setMessage(err.message)
                    console.log(err.message)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            localStorage.clear()
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.clear()
        setMessage("You are logged out.")
        console.log("We are logged out.")
        setUser(null);
        navigate('/')
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ authenticateUser, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }