import React, { useState, useEffect } from 'react';
import { GiftedChat, InputToolbar, Bubble, Send } from 'react-native-gifted-chat';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H4, H3, Pr } from '../../components/Texts';
import Theme from '../../constants/theme';
import { auth, database } from '../../utils/firebase';
import Header from '../../components/Header';
import ENV from '../../constants/env';
import { id } from 'date-fns/locale';


export default function Chat({ navigation, route }) {
  const [messages, setMessages] = useState([]);

  const farmerId = route?.params?.farmerId;
  const farmerName = route?.params?.farmerName;
  const farmerImage = route?.params?.farmerImg;

  const [uid, setUid] = useState('');
  const [farmerEmail, setFarmerEmail] = useState('');
  const [farmerLname, setFarmerLname] = useState('');

  async function handleChatData() {
    try {
      const response = await fetch(`${ENV.backend}/customer/get-chatDetails/${farmerId}`, {
        method: 'GET',
        headers: {
          Authorization: route.params.auth,
        },
      });

      const res = await response.json();
      // console.log(res.farmerEmail);
      setFarmerEmail(res.farmerEmail);
      setFarmerLname(res.farmerLname);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  React.useEffect(() => {
    handleChatData();
    // const fetchUid = async () => {
    //   try {
    //     const email = farmerEmail;
    //     console.log(email);
    //     const userRecord = await auth.getUserByEmail(email);
    //     console.log(userRecord);
    //     // setUid(userRecord.uid);
    //   } catch (error) {
    //     console.log('Error fetching UID:', error);
    //   }
    // };
    // fetchUid();
  }, []);


  // console.log(uid);
  // console.log(auth.currentUser.uid)

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

  const handleSend = async (newMessages) => {
    const message = newMessages[0];

    // Create a new chat conversation and add it to the chat list
    await createChatConversation(auth.currentUser.uid, '5RUHzOhfe9TlI3u3JudAZXPxzZV2');

    // Add the message to the 'messages' collection
    database.collection('messages').add({
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      },
    });
  };

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: Theme.tertiaryShade,
          borderRadius: 20,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 20,
        }}
      />
    );
  };

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
    )
  }

  function renderSend(props) {
    return (
      <Send
        {...props}
        containerStyle={{ backgroundColor: null, justifyContent: 'center', marginRight: 10 }}
      >
        <Image source={require('../../assets/send-message.png')} style={styles.send} />
      </Send>
    );
  }

  const createChatConversation = async (user1Id, user2Id) => {
    // Create a new document in the "messages" collection
    const messageRef = await database.collection('messages').add({
      text: '', // You can set an initial empty message or any default value
      user: {
        _id: user1Id,
        name: null, // Set the user's name if necessary
      },
    });

    // Create a new document in the "chatList" collection
    await database.collection('chatList').doc(messageRef.id).set({
      users: [user1Id, user2Id],
      // Add any other chat-related information if needed
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header navigation={navigation} back={true} />
        <View style={styles.farmerInfor}>
          <Image
            source={{ uri: farmerImage }}
            style={styles.farmerImage}
          />
          <H4 style={styles.farmerName}>{farmerName} {farmerLname}</H4>
        </View>
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
            _id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
          }}
          renderInputToolbar={props => customtInputToolbar(props)}
          messagesContainerStyle={{
            marginTop: 60,
            marginBottom: 50,
            paddingBottom: 80,
            backgroundColor: 'white',
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
          }}
          renderBubble={renderBubble}
          renderSend={renderSend}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    height: '100%',
    fontFamily: 'Poppins',
    backgroundColor: '#10AB6820',
  },
  send: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: Theme.primary,
  },
  farmerInfor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  farmerName: {
    marginLeft: 20,
    // marginTop: 20, 
    color: Theme.textColor,
    // alignSelf: 'center' 
  },
  farmerImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    // marginRight: 10,
    borderRadius: 15,
  },
});