import React from 'react';
import useAuth from '../hooks/useAuth';
import UserStack from './userStack';
import AuthStack from './authStack';

export default function () {
  const { user, initializing } = useAuth();
  if (initializing) return null;
  return user?.emailVerified ? <UserStack /> : <AuthStack />;
}

