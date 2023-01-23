import { createContext, useContext, useReducer } from "react";

export const AppContext = createContext({});

export function useAppContext() {
  return useContext(AppContext);
}

const intialState = {
  pages: {
    title: "",
  },
  isMenu: false,
};

const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, pages: { title: action.payload } };
    case "SET_MENU":
      return { ...state, isMenu: action.payload };
    default:
      throw new Error();
  }
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, intialState);
  const appContextValue = [state, dispatch];

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
