import React , {createContext,useContext,useReducer} from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children}) => (
    /* setup data layer*/
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

/*pull info from data layer*/
export const useStateValue = () => useContext(StateContext);