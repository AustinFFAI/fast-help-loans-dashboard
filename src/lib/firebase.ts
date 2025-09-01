"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

console.log({ firebaseConfig });

let appInstance: ReturnType<typeof getApp> | undefined;
let authInstance: ReturnType<typeof getAuth> | undefined;
let googleProviderInstance: GoogleAuthProvider | undefined;

function ensureClient(): boolean {
  return typeof window !== "undefined";
}

export function getFirebaseApp() {
  if (!ensureClient()) return undefined;
  if (!appInstance) {
    appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return appInstance;
}

export function getFirebaseAuth() {
  if (!ensureClient()) return undefined;
  if (!authInstance) {
    const app = getFirebaseApp();
    if (!app) return undefined;
    authInstance = getAuth(app);
    setPersistence(authInstance, browserLocalPersistence).catch(() => {});
  }
  return authInstance;
}

export function getGoogleProvider() {
  if (!ensureClient()) return undefined;
  if (!googleProviderInstance) {
    googleProviderInstance = new GoogleAuthProvider();
  }
  return googleProviderInstance;
}
