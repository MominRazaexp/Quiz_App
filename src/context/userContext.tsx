"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserContextInterface } from "@/Interface/interface";

const UserContext = createContext<UserContextInterface | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>(``);

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextInterface => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
