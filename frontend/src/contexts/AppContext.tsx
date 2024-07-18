import React, { useContext, useState } from "react";
import { useQuery } from "react-query";

import { validateToken } from "../api/myUserApiClient";

type Props = {
  children: React.ReactNode;
};

type AppContext = {
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: Props) => {
  const { isError } = useQuery("validateToken", validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
