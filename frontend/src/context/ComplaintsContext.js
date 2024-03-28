import { createContext, useReducer } from 'react';

export const ComplaintsContext = createContext();

export const complaintsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMPLAINTS':
      return {
        ...state, // It's a good practice to spread the previous state
        complaints: action.payload,
      };
    case 'CREATE_WORKOUT':
      // Ensure complaints is an array before trying to spread it
      const updatedComplaints = state.complaints ? [action.payload, ...state.complaints] : [action.payload];
      return { 
        ...state, // Spread the previous state
        complaints: updatedComplaints,
      };
    default:
      return state;
  }
};

export const ComplaintsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(complaintsReducer, { 
      complaints: [] // Initialize complaints as an empty array instead of null
    });
    
    return (
      <ComplaintsContext.Provider value={{ ...state, dispatch }}>
        {children}
      </ComplaintsContext.Provider>
    );
};
