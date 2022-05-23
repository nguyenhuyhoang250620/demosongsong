import * as React from 'react';
import { useState } from 'react';
import { 
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
  SafeAreaView,
  SectionList,
  StyleSheet
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Avatar, Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderComponent from '../Notificattion/component/Header';
import styles from '../../style/styles';
import data from './component/data';







export default function Notificattion() {
  const [listData, setListData] = useState(data);
  let row = [];
  let prevOpenedRow;
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [checkdel,setCheckdel] = React.useState()

  const completeTodos=(todoID)=>{
    const newtodo = listData.map(item=>{
      if(item.id==todoID){
        return{...item,seen:true}
      }
      return item;
    });
    setListData(newtodo)
  }
  const deleteItem = ({ item, index }) => {
    setCheckdel(item.id)
    fadeOut()
    let a = listData;
    setTimeout(() => { 
      a.splice(index, 1);
      setListData([...a]);
      fadeAnim.setValue(1)
    }, 500);
  };
  
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver:false
    }).start();
  }
  /**
   *
   */
  const renderItem = ({ item, index }, onClick) => {
    if (item.header) {
      return(
        <View>
          <Text style={{fontWeight:"700",fontSize:17}}>{item.name}</Text>
        </View>
      )
    } else if(!item.header) {
      const closeRow = (index) => {
        console.log('closerow');
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
          prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
      };
      const LeftSwipeActions = () => { 
        return (
          <View
            style={{
              backgroundColor: '#E6E6FA',
              justifyContent: 'center',
              marginVertical: 12,
              width:"100%",
              borderRadius:10,
          
            }}>
            <Icon
              style={{
                paddingHorizontal: 10,
                fontWeight: '600',
                paddingHorizontal: 30,
                paddingVertical: 20,
              }}
              name="checkmark-outline"
              size={24}
              color="black"
            />
          </View>
        );
      };
      const renderRightActions = (progress, dragX, onClick) => {
        return (
          <Animated.View
          style={{
            backgroundColor: '#E6E6FA',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 12,
            width:"30%",
            borderRadius:10,
            opacity:fadeAnim
          }}>
              <TouchableOpacity onPress={()=>{ 
                Alert.alert(
                  "Thông báo",
                  "Bạn có chắc muốn xoá",
                  [
                    {
                      text: "Huỷ",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "Xoá",onPress:()=>{onClick(item.id)}}
                  ]
                );}}>
                <Icon
                  style={{
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                  }}
                  name="trash-outline"
                  size={24}
                  color="red"
                />
                <Text style={{position:"absolute",top:50,right:30,color:"red",fontWeight:"600"}}>Xoá</Text>
              </TouchableOpacity>
          </Animated.View>
        );
      };
      
      return (
        <Swipeable
          onSwipeableClose={(direction)=>{
            if(direction==="left"){
              completeTodos(item.id)
            }
          }}
          leftThreshold={800}
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          renderLeftActions={LeftSwipeActions}
          onSwipeableOpen={() => closeRow(index)}
          ref={(ref) => (row[index] = ref)}
          rightOpenValue={-100}>
              <Animated.View
                style={[styles.containerItem,{width:item.id===checkdel?fadeAnim.interpolate({
                  inputRange:[0,1],
                  outputRange:["0%","100%"]
                }):"100%",opacity:item.id===checkdel?fadeAnim:1}]}
                activeOpacity={0.6}>
                <View style={[styles.mainItem,{ backgroundColor:item?.seen?"white":"#aae3f6"}]}>
                  <View style={styles.inforItemLeft}>
                    <View style={styles.avatar}>
                      <Avatar
                        rounded
                        source={{
                          uri:item.avatar.avatar,
                        }}
                        size={60}
                      />
                      <Badge
                        badgeStyle={{height: 20,width:30}}
                        status={item.avatar.status}
                        rounded
                        value={item.avatar.Badge}
                        containerStyle={{
                          position: 'absolute',
                          bottom: 0,
                          left: 45,
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.inforItemRight}>
                    <View>
                      <Text numberOfLines={1} style={styles.txtContentNotification}>
                        <Text numberOfLines={1}>{item.name} </Text>
                        <Text numberOfLines={1} style={{fontWeight: '300'}}>{item.notification}</Text>
                      </Text>
                    </View>
                    <View>
                      <Text numberOfLines={1} style={styles.txtcreateAtNotification}>
                        {item.createAt}
                      </Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
        </Swipeable>  
      );
    }     
  };

  

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex:1}}/> 
      <HeaderComponent height={"10%"}/>
      <FlatList
        style={{height:"90%"}}
        data={listData}
        renderItem={(v) =>
          renderItem(v, () => {
            console.log('Pressed', v);
            deleteItem(v);
          })
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
      </FlatList>
    </View>
  );
}