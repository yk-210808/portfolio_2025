import { MvProvider } from "./MvProvider";

const ProviderTree = ({ children }: { children: React.ReactNode }) => {
  return (
    <MvProvider>
      {children}
    </MvProvider>
  );
};

export default ProviderTree;