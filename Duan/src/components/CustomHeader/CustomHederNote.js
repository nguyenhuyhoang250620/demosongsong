import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import PagerView from 'react-native-pager-view';
import AllScreen from '../../screens/Note/AllScreen';
import ForderScreen from '../../screens/Note/ForderScreen'

const CustomHederNote = () => {
  return (
    <View style={{flex:1,backgroundColor:"#fffbf8"}}>
        <SafeAreaView style={{flex:1,flexDirection:"row"}}>
        <View style={styles.containertxt_top}>
            <View style={{borderBottomWidth:2}}>
            <Text adjustsFontSizeToFit style={[styles.txt_top,]}>Tất cả</Text>
            </View>
        </View>
        <View style={styles.containertxt_top}>
            <Text adjustsFontSizeToFit style={styles.txt_top}>Thư mục</Text>
        </View>
        </SafeAreaView>
        <PagerView style={{flex:9}} initialPage={0}>
            <View key="1">
                <AllScreen/>
            </View>
            <View key="2">
                <ForderScreen/>
            </View>
        </PagerView>
    </View>
  )
}
const styles = StyleSheet.create({
    containertxt_top:{
        width:"50%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fffbf8"
    },
    txt_top:{
        fontSize:22,
        padding:5,
        paddingHorizontal:10,
        
        
    }
})

export default CustomHederNote
