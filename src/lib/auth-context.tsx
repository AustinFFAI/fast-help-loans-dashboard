"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { BackendUser, getMe, provisionUser } from "./api";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  backendUser: BackendUser | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    inviteToken?: string,
  ) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);

  function isDeactivatedError(err: unknown): boolean {
    return err instanceof Error && /deactivated/i.test(err.message);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setBackendUser(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      try {
        // Try to fetch backend user; if not provisioned, provision now
        let me = null as BackendUser | null;
        try {
          me = await getMe(firebaseUser);
        } catch (err) {
          if (isDeactivatedError(err)) {
            await signOut(auth);
            setUser(null);
            setBackendUser(null);
            return;
          }
        }
        setBackendUser(me);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      backendUser,
      async signInWithEmail(email: string, password: string) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        try {
          const me = await getMe(cred.user);
          setBackendUser(me);
        } catch (err) {
          if (isDeactivatedError(err)) {
            await signOut(auth);
            setUser(null);
            setBackendUser(null);
            throw new Error(
              "Your account is deactivated. Contact an administrator.",
            );
          }
        }
      },
      async signInWithGoogle() {
        const cred = await signInWithPopup(auth, googleProvider);
        try {
          const me = await getMe(cred.user);
          setBackendUser(me);
        } catch (err) {
          if (isDeactivatedError(err)) {
            await signOut(auth);
            setUser(null);
            setBackendUser(null);
            throw new Error(
              "Your account is deactivated. Contact an administrator.",
            );
          }
          try {
            const me = await provisionUser(cred.user);
            setBackendUser(me);
          } catch (err2) {
            if (isDeactivatedError(err2)) {
              await signOut(auth);
              setUser(null);
              setBackendUser(null);
              throw new Error(
                "Your account is deactivated. Contact an administrator.",
              );
            }
            throw err2;
          }
        }
      },
      async signUpWithEmail(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        inviteToken?: string,
      ) {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const me = await provisionUser(cred.user, {
          given_name: firstName,
          family_name: lastName,
          contact_name: `${firstName} ${lastName}`,
          contact_email: email,
          invite: inviteToken ?? undefined,
        });
        setBackendUser(me);
      },
      async signOutUser() {
        await signOut(auth);
        setUser(null);
        setBackendUser(null);
      },
    }),
    [user, loading, backendUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
