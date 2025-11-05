import { UserProvider } from "./UserContext";

export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
        {children}
    </UserProvider>
  );
};