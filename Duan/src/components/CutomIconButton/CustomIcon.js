import React from 'react'
import {View,Text,SafeAreaView,TextInput,TouchableOpacity,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

Icon.loadFont();
const CustomIcon = (props) => {
  return (
    <TouchableOpacity
        style={styles.container}
        onPress={props.onPress}>
        <Icon
        style={{paddingHorizontal:10}}
        name={props.name}
        size={22}
        />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    }
})

export default CustomIcon
