import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCx4oohXi6uKe84dQsPjksqa3kWa6JEOK4',
  authDomain: 'freshlyyimagestore.firebaseapp.com',
  projectId: 'freshlyyimagestore',
  storageBucket: 'freshlyyimagestore.appspot.com',
  messagingSenderId: '575461909176',
  appId: '1:575461909176:web:27df3be08664ab63224a4d',
};

const app = initializeApp(firebaseConfig);
export const FreshlyyImageStore = getStorage(app);
