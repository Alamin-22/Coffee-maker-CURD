import { createContext, useState } from "react";
import PropTypes from 'prop-types'; // ES6
import {createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../Firebase/firebase.config";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading]= useState(true);


    // Register with Email
    const CreateUser=(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
        
    }


    // pass the value globally with CONTEXT
    const value = {
        user,
        CreateUser,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;