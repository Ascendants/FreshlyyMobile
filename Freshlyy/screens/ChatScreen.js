import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { GiftedChat, InputToolbar, Bubble, Send  } from "react-native-gifted-chat";
import { database, auth } from "../utils/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Theme from "../constants/theme";
import { color } from "react-native-reanimated";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];    
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: Theme.tertiaryShade,
          borderRadius: 20,
          marginLeft: 15,
          marginRight: 15,
          // marginBottom:10,
        }}
      />
    );
  };

  function renderSend(props) {
    return (
        <Send
            {...props}
            containerStyle={{backgroundColor:null, justifyContent: 'center', marginRight:10}}
        >
                <Image source={require('../assets/send.png')} />
        </Send>
    );
}
function renderBubble(props) { 
  return ( 
  <Bubble {...props} 
  wrapperStyle={{
      left: {
        backgroundColor: Theme.tertiaryShade,
        maxWidth: "60%",
        marginTop: 10,
      },
      right: {
        backgroundColor: Theme.primary,
        maxWidth: "60%",
        marginTop: 10,
      }
    }} />
  )}

  return(
    <SafeAreaView style={{flex: 1}}>
      <Header back={true} />
    <GiftedChat 
      wrapInSafeArea={false}
      messages={messages}
      onSend={messages => onSend(messages)}
      renderInputToolbar={props => customtInputToolbar(props)}
      renderSend={renderSend}
      alwaysShowSend
      user={{
        _id:1,
      }}
      messagesContainerStyle={{
        backgroundColor:'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
      }}
      renderBubble={renderBubble}

    />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  }
}

)