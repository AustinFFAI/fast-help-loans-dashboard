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
  sendPasswordResetEmail,
  confirmPasswordReset as firebaseConfirmPasswordReset,
  validatePassword,
  verifyPasswordResetCode,
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
  ) => Promise<void>;
  signOutUser: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  confirmPasswordReset: (oobCode: string, newPassword: string) => Promise<void>;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setBackendUser(null);
        setLoading(false);
        return;
      }

      console.log({ firebaseUser });
      try {
        // Try to fetch backend user; if not provisioned, provision now
        let me = null as BackendUser | null;
        try {
          me = await getMe(firebaseUser);
        } catch {
          me = await provisionUser(firebaseUser);
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
        } catch {
          const me = await provisionUser(cred.user);
          setBackendUser(me);
        }
      },
      async signInWithGoogle() {
        const cred = await signInWithPopup(auth, googleProvider);
        try {
          const me = await getMe(cred.user);
          setBackendUser(me);
        } catch {
          const me = await provisionUser(cred.user);
          setBackendUser(me);
        }
      },
      async signUpWithEmail(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
      ) {
        // Validate password against Firebase project's password policy
        const status = await validatePassword(auth, password);
        if (!status.isValid) {
          const unmet: string[] = [];
          if (status.meetsMinPasswordLength === false)
            unmet.push("minimum length");
          if (status.meetsMaxPasswordLength === false)
            unmet.push("maximum length");
          if (status.containsLowercaseLetter === false)
            unmet.push("lowercase letter");
          if (status.containsUppercaseLetter === false)
            unmet.push("uppercase letter");
          if (status.containsNumericCharacter === false) unmet.push("number");
          if (status.containsNonAlphanumericCharacter === false)
            unmet.push("symbol");

          const msg =
            unmet.length > 0
              ? `Password does not meet requirements: ${unmet.join(", ")}.`
              : "Password does not meet the project's password policy.";
          throw new Error(msg);
        }

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
        });
        setBackendUser(me);
      },
      async signOutUser() {
        await signOut(auth);
        setBackendUser(null);
      },
      async requestPasswordReset(email: string) {
        await sendPasswordResetEmail(auth, email);
      },
      async confirmPasswordReset(oobCode: string, newPassword: string) {
        await verifyPasswordResetCode(auth, oobCode);
        await firebaseConfirmPasswordReset(auth, oobCode, newPassword);
      },
    }),
    [user, loading, backendUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
