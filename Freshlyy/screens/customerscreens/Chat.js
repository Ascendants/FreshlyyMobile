import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, View, Image } from 'react-native';
import { H4, H3, Pr } from '../../components/Texts';
import Theme from '../../constants/theme';
import { auth, database } from '../../utils/firebase';
export default function Chat({ navigation, route }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = database
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data();
          const message = {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
              _id: data.user._id,
              name: data.user.name,
            },
          };
          return message;
        });
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);
  const handleSend = (newMessages) => {
    const message = newMessages[0];
    database.collection('messages').add({
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      },
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      }}
    />
  );
}
