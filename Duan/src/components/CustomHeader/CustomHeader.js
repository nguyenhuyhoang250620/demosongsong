import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomIcon from '../CutomIconButton/CustomIcon';

const CustomHeader = () => {
const navigation = useNavigation()
  return (
    <SafeAreaView style={{flex:1,flexDirection:"row",backgroundColor:"#fffbf8"}}>
        <View style={{height:"100%",width:"60%",justifyContent:"center",alignItems:"flex-start"}}>
            <CustomIcon
                name='arrow-back-outline'
                onPress={()=>{
                navigation.goBack()
                }}
            />
        </View>
        <View style={{width:"40%",flexDirection:"row",justifyContent:"space-between"}}> 
        <CustomIcon
            name='attach-outline'
        />
        <CustomIcon
            name='notifications-outline'
        />
        <CustomIcon
            name='archive-outline'
        />
        </View>
    </SafeAreaView>
  )
}

export default CustomHeader