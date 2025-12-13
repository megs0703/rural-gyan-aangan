import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth as firebaseAuth, db as firebaseDb } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged as onFirebaseAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string, name?: string, role?: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const useFirebase = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  useEffect(() => {
    if (useFirebase) {
      const unsub = onFirebaseAuthStateChanged(firebaseAuth, async (fbUser) => {
        if (!fbUser) {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        // Read role from Firestore users collection
        try{
          const ref = doc(firebaseDb, 'users', fbUser.uid);
          const snap = await getDoc(ref);
          const data = snap.exists() ? (snap.data() as any) : null;
          const newUser: User = {
            id: fbUser.uid,
            name: data?.name || fbUser.email?.split('@')[0] || fbUser.uid,
            email: fbUser.email || '',
            role: (data?.role as User['role']) || 'student'
          };
          setUser(newUser);
          setIsAuthenticated(true);
          try{ localStorage.setItem('user', JSON.stringify(newUser)) }catch(e){}
        }catch(err){
          console.error('Error fetching user role', err);
          setUser(null);
          setIsAuthenticated(false);
        }
      });

      return () => unsub();
    }

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signIn = async (email: string, password: string, name?: string, role?: string): Promise<boolean> => {
    if (useFirebase) {
      try{
        const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const uid = cred.user.uid;
        const ref = doc(firebaseDb, 'users', uid);
        const snap = await getDoc(ref);
        const data = snap.exists() ? (snap.data() as any) : null;
        const newUser: User = {
          id: uid,
          name: data?.name || name || email.split('@')[0],
          email,
          role: (data?.role as User['role']) || (role as User['role']) || 'student'
        };
        setUser(newUser);
        setIsAuthenticated(true);
        try{ localStorage.setItem('user', JSON.stringify(newUser)) }catch(e){}
        return true;
      }catch(err){
        console.error('Firebase signIn error', err);
        return false;
      }
    }

    // Fallback: local mock sign-in
    const newUser: User = {
      id: Date.now().toString(),
      name: name || email.split('@')[0],
      email,
      role: (role as User['role']) || 'student'
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const signOut = async () => {
    if (useFirebase) {
      try{ await firebaseSignOut(firebaseAuth) }catch(e){console.error(e)}
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};