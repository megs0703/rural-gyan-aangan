import { useAuth } from '@/contexts/AuthContext';
import SignIn from '@/pages/SignIn';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;