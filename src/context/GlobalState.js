import React, { children, createContext, useReducer, useEffect, useState } from "react"
import AppReducer from './AppReducer';

//initial state
const initialState = {
    transactions: [
        // { id: 1, text:'Flower', amount: -20 },
        // { id: 2, text:'Salary', amount: 300 },
        // { id: 3, text:'Book', amount: -10 },
        // { id: 4, text:'Camera', amount: 150 }
    ]
}

// Create Context
export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [initialRender,setInitialRender] = useState(true);

    useEffect(()=>{
        if (initialRender) {
            try {
                let persistedTransactions = localStorage.getItem('transactions');
                if (persistedTransactions) persistedTransactions = JSON.parse(persistedTransactions); //converts into JS objects
                else persistedTransactions = [];

                dispatch({type : 'SET_TRANSACTIONS', payload : persistedTransactions}); 
                setInitialRender(false);
            }catch(err) {
                console.log(err)
            }
        }
        else {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
        }
    }, [state])

    //initial load (1st time run of useEffect) this case initial Render
    //now runs on every state change // 


    // ""
    //useState
    //6-7 varab
    //global store : 
    //components 
    

//Actions
function deleteTransaction(id) {
    dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
    });
}

function addTransaction(transaction) {
    dispatch({
        type: 'ADD_TRANSACTION',
        payload: transaction
    })
    
}

return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction
}}>
    {children}
</GlobalContext.Provider>);
}

    


