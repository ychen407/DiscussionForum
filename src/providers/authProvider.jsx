import React from 'react'

const AuthContext = React.createContext();
const useAuth = () => React.useContext(AuthContext) ; 

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const reducer = (state,action) =>{
    switch(action.type){
        case "LOGIN":
            localStorage.setItem("user",JSON.stringify(action.payload.user)) 
            localStorage.setItem("token",JSON.stringify(action.payload.token))
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case "LOGOUT":
            localStorage.clear();
            return{
                ...state,
                isAuthenticated: false,
                user: null,
                token: null
            }; 
        default:
            return state;   
    }
}

function AuthProvider(props){
    const [state,dispatch] = React.useReducer(reducer,initialState)
    return(
        <AuthContext.Provider value={{state,dispatch}} {...props}/>
    )
    
}
export {useAuth , AuthProvider};