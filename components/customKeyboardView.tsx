import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'

const ios = Platform.OS === 'ios'
export default function CustomKeyboardView({children, inChat}: any) {
  let kavConfig = {};
  let scrollViewConfig = {};
  if (inChat) {
    kavConfig = {
      keyboardVerticalOffset: 90
    };
    scrollViewConfig = {
      contentContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end'
      }
    }
  }
  return (
    <KeyboardAvoidingView behavior={ios ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: 'white' }} {...kavConfig} collapsable={false} >
        {/* <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
        keyboardShouldPersistTaps='always'
        bounces={false}> */}
            {children}
        {/* </ScrollView> */}
    </KeyboardAvoidingView>
  )
}