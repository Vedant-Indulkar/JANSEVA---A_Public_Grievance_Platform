import { createContext, useReducer } from 'react'

export const ComplaintsContext = createContext()

export const complaintsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMPLAINTS':
      return {
        complaints: action.payload 
      };
    case 'CREATE_WORKOUT':
      return { 
        complaints: [action.payload, ...state.complaints] 
      };
    default:
      return state;
  }
};


export const ComplaintsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(complaintsReducer, { 
      complaints: null
    })
    
    return (
      <ComplaintsContext.Provider value={{ ...state, dispatch }}>
        { children }
      </ComplaintsContext.Provider>
    )
  }