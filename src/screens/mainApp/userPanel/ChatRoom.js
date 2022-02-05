import React, { useCallback, useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions, 
    TextInput
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import ChatRoomHeader from "./utils/chatRoomHeader";


export default function ChatRoom({route,navigation}){

    const name = route.params;
    const [messages, setMessages] = useState([]);
    console.log(messages);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: name,
                    avatar: 'https://placeimg.com/140/140/any',
                },
            }
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    const scrollToBottom =()=>(
        <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#ffe4e1',
                        borderRadius: 5
                    },
                    left: {
                        backgroundColor: '#ffe4e1',
                        borderRadius: 5,
                    },
                }}
                textStyle={{
                right: {
                    color: '#000',
                },
                left: {
                    color: '#000',
                },
                }}
            />
        );
    };
    const renderInputToolbar =()=>(
        <View style={styles.toolbar}></View>
    );
    const renderComposer =()=>(
        <View style={styles.composer}></View>
    )

    return(
        <View style={styles.container}>
            <ChatRoomHeader 
                name={name}
                back={()=>navigation.goBack()}
            />
            <View style={styles.body}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                        avatar : require("../../../assets/logo.jpg")
                    }}
                    textInputStyle={{color: "#000"}}
                    scrollToBottom={true}
                    scrollToBottomComponent={scrollToBottom}
                    renderBubble={renderBubble}
                    showUserAvatar
                    // renderUsernameOnMessage
                    renderAvatarOnTop
                    // renderMessage={renderMessage}
                    // renderComposer={renderComposer}
                    // renderInputToolbar={renderInputToolbar}
                    // minInputToolbarHeight={60}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#ffe4e1"
    },
    body: {
        backgroundColor:"#fff",
        flex: 1,
        marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    toolbar: {
        height: 60,
        backgroundColor: "#aaa"
    },
    composer: {
        
    }
})


// [
//     {
//         "_id": "d345143f-47c0-4898-9a5c-783f4016527d", 
//         "createdAt": 2022-02-01T06:17:28.988Z, 
//         "text": "Hi", 
//         "user": {
//             "_id": 1
//         }
//     }, 
//     {
//         "_id": 1, 
//         "createdAt": 2022-02-01T06:17:20.275Z, 
//         "text": "Hello developer", 
//         "user": {
//             "_id": 2, 
//             "avatar": "https://placeimg.com/140/140/any", 
//             "name": "React Native"
//         }
//     }
// ]