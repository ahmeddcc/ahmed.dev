import { createContext, useContext, useReducer, useEffect } from 'react';
import { storageService } from '@/services/storageService';

const PortfolioContext = createContext(null);

const initialState = {
  data: null,
  loading: true,
};

function portfolioReducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, data: action.payload, loading: false };
    case 'UPDATE_SECTION':
      return {
        ...state,
        data: { ...state.data, [action.section]: action.payload },
      };
    default:
      return state;
  }
}

export function PortfolioProvider({ children }) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  useEffect(() => {
    const data = storageService.getData();
    dispatch({ type: 'LOAD', payload: data });
  }, []);

  const updateSection = (section, value) => {
    dispatch({ type: 'UPDATE_SECTION', section, payload: value });
    storageService.updateSection(section, value);
  };

  const reload = () => {
    const data = storageService.getData();
    dispatch({ type: 'LOAD', payload: data });
  };

  return (
    <PortfolioContext.Provider value={{ ...state, updateSection, reload }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used inside PortfolioProvider');
  return ctx;
}
