import { UserProvider } from "./UserContext";
import { TranscribeProvider } from './TranscribeContext'

export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <TranscribeProvider>
        {children}
      </TranscribeProvider>
    </UserProvider>
  );
};