import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'

const Content = () => {
  return (
    <View style={{height:"100%",width:"100%"}}>
        <View style={{height:"10%"}}>
        <Text style={{color:"#484848"}}>20 thang 4</Text>
        </View>
        <View style={{height:"10%"}}>
        <Text style={{color:"black",fontWeight:"bold",fontSize:15}} numberOfLines={1}>Lam dau viec A</Text>
        </View>
        <View style={{height:"10%",flexDirection:"row",justifyContent:"space-between"}}>
        <TouchableOpacity style={{backgroundColor:"#686868"}}>
            <Text style={{fontSize:10,padding:5}}>Cong viec</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"#686868"}}>
            <Text style={{fontSize:10,padding:5}}>Cong viec</Text>
        </TouchableOpacity>
        </View>
        <View style={{height:"70%"}}></View>
    </View>
  )
}

export default Content
