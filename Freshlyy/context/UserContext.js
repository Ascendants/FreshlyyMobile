import React from 'react';

export const user = {
  fname: 'Haritha',
  lname: 'Hasathcharu',
  gender: 'M',
  dob: new Date('2000-05-09'),
  email: 'haritha@hasathcharu.com',
  nic: '200013555544',
  bAddress: 'A/31,Samurdhi Mw, Yodha Mw, Siddamulla. 10304',
  farmer: {
    occupation: 'Student',
    hasVehicle: true,
    maxDeliDistance: 3,
    deliveryCharge: 100,
    nicUrl: 'null',
    saleLocation: [
      {
        name: 'Home',
        latitude: 6.817222,
        longitude: 79.953802,
      },
    ],
  },
  customer: {},
  cart: [
    {
      pid: '',
      qty: '',
    },
    {
      pid: '',
      qty: '',
    },
  ],
  paymentMethods: [
    {
      CardId: 1,
      CardName: 'Sampath Card',
    },
    {
      CardId: 2,
      CardName: 'FriMi Card',
    },
  ],
};
export const UserContext = React.createContext({});
