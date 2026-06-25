"use client";

import { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isLoaderFinished: boolean;
  setIsLoaderFinished: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoaderFinished: false,
  setIsLoaderFinished: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoaderFinished, setIsLoaderFinished }}>
      {children}
    </LoadingContext.Provider>
  );
}