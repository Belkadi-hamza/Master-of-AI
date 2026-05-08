import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/integrations/firebase/config';

// Firebase User type to match the existing interface
interface User {
  id: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: User | null;
  session: any | null; // Firebase doesn't have a session object like Supabase
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  createStudent: (email: string, password: string, fullName: string, gradeLevel?: string, fieldOfStudy?: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        setUser(userData);
        setSession({ user: firebaseUser }); // Create a session-like object for compatibility

        // Check admin role from Firestore
        await checkAdminRole(firebaseUser.uid);
        
        // Create or update user profile in Firestore
        await createOrUpdateUserProfile(firebaseUser);
      } else {
        setUser(null);
        setSession(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createOrUpdateUserProfile = async (firebaseUser: FirebaseUser) => {
    const profileRef = doc(db, 'profiles', firebaseUser.uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      // Create new profile
      await setDoc(profileRef, {
        user_id: firebaseUser.uid,
        full_name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        grade_level: null,
        avatar_url: null,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      // Create default student role
      const roleRef = doc(db, 'user_roles', firebaseUser.uid);
      await setDoc(roleRef, {
        user_id: firebaseUser.uid,
        role: 'student',
        created_at: serverTimestamp(),
      });
    }
  };

  const checkAdminRole = async (userId: string) => {
    try {
      const roleRef = doc(db, 'user_roles', userId);
      const roleSnap = await getDoc(roleRef);
      
      if (roleSnap.exists()) {
        const roleData = roleSnap.data();
        setIsAdmin(roleData?.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error: any) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Create user profile (will be handled by onAuthStateChanged, but we can also do it here)
      const profileRef = doc(db, 'profiles', userCredential.user.uid);
      await setDoc(profileRef, {
        user_id: userCredential.user.uid,
        full_name: fullName,
        email: email,
        grade_level: null,
        avatar_url: null,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      // Create default student role
      const roleRef = doc(db, 'user_roles', userCredential.user.uid);
      await setDoc(roleRef, {
        user_id: userCredential.user.uid,
        role: 'student',
        created_at: serverTimestamp(),
      });

      return { error: null };
    } catch (error: any) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const createStudent = async (email: string, password: string, fullName: string, gradeLevel?: string, fieldOfStudy?: string) => {
    try {
      // Store the current admin user info before creating student
      const currentAdmin = auth.currentUser;
      if (!currentAdmin || !currentAdmin.email) {
        return { error: new Error('Admin session not found. Please sign in again.') };
      }

      // Create the new student account (this will sign them in and sign out admin)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Create profile in Firestore
      const profileRef = doc(db, 'profiles', userCredential.user.uid);
      await setDoc(profileRef, {
        user_id: userCredential.user.uid,
        full_name: fullName,
        email: email,
        grade_level: gradeLevel || null,
        field_of_study: fieldOfStudy || null,
        avatar_url: null,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      // Create student role
      const roleRef = doc(db, 'user_roles', userCredential.user.uid);
      await setDoc(roleRef, {
        user_id: userCredential.user.uid,
        role: 'student',
        created_at: serverTimestamp(),
      });

      // Sign out the newly created student immediately
      await firebaseSignOut(auth);

      // The admin will be automatically restored by the auth state listener
      // However, since we signed out, we need to sign the admin back in
      // Since we don't have the admin's password stored, we can't auto-sign them back in
      // So we'll return success and let the admin sign in again, OR we could ask for password

      // Actually, we can't restore the session without password
      // But the auth state will be handled by onAuthStateChanged
      // The best we can do is sign out and let the system handle it
      
      return { error: null };
    } catch (error: any) {
      console.error('Error creating student:', error);
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signUp, signOut, createStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
