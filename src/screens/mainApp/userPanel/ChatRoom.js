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

    useEffect(() => {
        setMessages([
            {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            avatar: 'https://placeimg.com/140/140/any',
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
            },
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
                        borderRadius: 0
                    },
                    left: {
                        backgroundColor: '#ffe4e1',
                        borderRadius: 0
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
                        _id: 1
                    }}
                    textInputStyle={{color: "#000"}}
                    scrollToBottom={true}
                    scrollToBottomComponent={scrollToBottom}
                    renderBubble={renderBubble}
                    showUserAvatar={true}
                    renderUsernameOnMessage={true}
                    renderAvatarOnTop={true}
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