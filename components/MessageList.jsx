import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({messages, currentUser, scrollViewRef, onScroll, loading}) {
  print(messages[0])
    return (
    <FlatList
    ref={scrollViewRef} 
    data={messages}
    keyExtractor={(item, index) => index.toString()}
    renderItem={
        ({item, index}) => <MessageItem message={item} index={index} currentUser={currentUser} />
    }
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={{paddingTop: 10}}
    onEndReached={() => onScroll(true)} 
    inverted={true}
    bounces={true}
    ListFooterComponent={loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
    />
  )
}