import React from 'react';
import useAuth from '../hooks/useAuth';
import UserStack from './userStack';
import AuthStack from './authStack';
import { auth } from '../utils/firebase';

export default function () {
  const { user, initializing } = useAuth();
  if (initializing) return null;
  if (!user) return <AuthStack />;
  if (!user?.emailVerified)
    return <AuthStack to={'Email Verification'} userData={user} />;
  return <UserStack user={user} />;
}
