import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//import { auth } from '../utils/firebase';

export default function () {
  const auth = getAuth();

  const [initializing, setInitializing] = useState(true);
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
    return subscribeFromAuthStateChanged;
  }, []);
  return { user, initializing };
}
