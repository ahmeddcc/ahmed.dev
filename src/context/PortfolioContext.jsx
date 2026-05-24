import { useReducer, useEffect } from 'react';
import { storageService } from '@/services/storageService';
import { PortfolioContext } from './contexts';

const initialState = {
  data: storageService.getData(),
  loading: false,
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
    const handleStorage = (e) => {
      if (e.key === 'portfolio_data') {
        const data = storageService.getData();
        dispatch({ type: 'LOAD', payload: data });
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
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
