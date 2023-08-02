import React, { createContext } from "react";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
interface AuthContextProps {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const AuthContext = createContext<AuthContextProps>({
  auth: false,
  setAuth: () => {},
  user: null,
  setUser: () => {},
});
function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
