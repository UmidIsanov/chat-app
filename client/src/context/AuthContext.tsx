import { createContext, useState, ReactNode, FC, useCallback } from "react";

interface User {
  name: string;
}

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  registerInfo: RegisterInfo;
  updateRegisterInfo: (info: RegisterInfo) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    name: "",
    email: "",
    password: "",
  });

  console.log("REGISTER INFO:", registerInfo);
  const updateRegisterInfo = useCallback((info: RegisterInfo) => {
    setRegisterInfo(info);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
