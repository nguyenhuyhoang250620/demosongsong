import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

Icon.loadFont();

const CutomButton = (props) => {
  return (
    <Pressable style={{flex:1}} onPress={props.onPress}>
       <View style={[styles.container,{padding:15,flexDirection:"row"}]}>
            <View style={{width:"20%"}}>
                <Icon
                    name={props.name}
                    size={props.size}
                    color={props.color}
                />
            </View>
            <View style={{width:"80%"}}>
                <Text>
                    {props.name_cpn}
                </Text>
            </View>
      </View>
    </Pressable>
  )
}

export default CutomButton

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    }
})