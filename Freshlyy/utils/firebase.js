import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyBiMF12vtgUGyUlxgY-sq5Rqn5ama1WFR4',
  authDomain: 'freshlyy-437ac.firebaseapp.com',
  projectId: 'freshlyy-437ac',
  storageBucket: 'freshlyy-437ac.appspot.com',
  messagingSenderId: '940915596506',
  appId: '1:940915596506:web:84b0cf3b8f5d962e2e19e3',
};

const app = initializeApp(firebaseConfig);
export const FreshlyyImageStore = getStorage(app);
