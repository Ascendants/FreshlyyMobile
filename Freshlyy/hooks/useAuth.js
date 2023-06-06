import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
//import { auth } from '../utils/firebase';

export function useAuth() {
  const auth = getAuth();
  const [initializing,setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const subscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in,
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
      setInitializing(false);
    });
    console.log(user.email);
    return subscribeFromAuthStateChanged;
  }, []);
  return { user, initializing };
}
