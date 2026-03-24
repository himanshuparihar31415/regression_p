import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SignalContextType {
  isSignalDetected: boolean;
  setIsSignalDetected: (value: boolean) => void;
}

const SignalContext = createContext<SignalContextType | undefined>(undefined);

export const SignalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignalDetected, setIsSignalDetected] = useState(false);

  return (
    <SignalContext.Provider value={{ isSignalDetected, setIsSignalDetected }}>
      {children}
    </SignalContext.Provider>
  );
};

export const useSignal = () => {
  const context = useContext(SignalContext);
  if (context === undefined) {
    throw new Error('useSignal must be used within a SignalProvider');
  }
  return context;
};
