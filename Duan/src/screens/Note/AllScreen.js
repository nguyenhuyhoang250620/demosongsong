import React,{useRef,useEffect,useState} from 'react';
import {
  View,
  StyleSheet,
  Text, 
  StatusBar,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomIcon from '../../components/CutomIconButton/CustomIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasonryList from '@react-native-seoul/masonry-list';



Icon.loadFont();



const AllFoder = () => {
  const [listdata,setListdata] = useState([])
  const [id,setId] = useState()
  const isFocused = useIsFocused();


  const toggle= useRef(new Animated.Value(0)).current
  const navigation = useNavigation();

 
  useEffect(()=>{
    getTodo();
    // deteletodo();
  },[isFocused])


  
 

  //lấy dữ liệu trong AsyncStorage
  const getTodo = async ()=>{
    try {
      const todos = await AsyncStorage.getItem('todolist')
      console.log(todos)
      if(todos != null){
        setListdata(JSON.parse(todos))
      }

    } catch (error) {
      console.log(error)
      
    }
  }

  const EditNote=(item)=>{
    navigation.navigate("AddList",{
      item:item
    })
  }
  //xoá content
  const deteletodo = async(todoID)=>{
    try {
        await AsyncStorage.removeItem('todolist')
        const newtodo = data.filter(item=>item.id != todoID);
        setListdata(newtodo)
    } catch (e) {
      
    }
    hidetab()
  }
  
 

 

  const hidetab = ()=>{
    toggle.setValue(0)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.item]}
      onLongPress={()=>{
        Animated.timing(toggle,{
          toValue:55,
          duration:300,
          useNativeDriver:false
        }).start();
        setId(item.id)
      }}
      onPress={()=>{
        EditNote(item)
      }}
    >
        <Image
          source={{uri:item.img}}
          style={{height:item.img?120:0,width:"100%",borderTopLeftRadius:15,borderTopRightRadius:15}}
          resizeMode="cover"
        />    
      <View style={{borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
        <Text numberOfLines={1} style={{fontSize:20,color:"black",fontWeight:"bold",padding:10}}>{item.title}</Text>
        <Text  style={{fontSize:15,color:"black",padding:10}}>{item.content}</Text>
      </View>

      
      
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <MasonryList
        data={listdata}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
      
      <View style={{height:"10%",backgroundColor:"#fffbf8",justifyContent:"center"}}>
          <View style={styles.bntAdd}>
            <TouchableOpacity style={{height:58,width:58,backgroundColor:"#f2e8e6",borderRadius:18,justifyContent:"center",alignItems:"center"}}
               onPress={()=>navigation.navigate('AddList')}
            >
              <Text adjustsFontSizeToFit style={{fontSize:32}}>+</Text>
            </TouchableOpacity>
          </View>
      </View>

     
      
      <Animated.View style={{height:toggle,width:"100%",backgroundColor:"#f6ecea",flexDirection:"row",position:"absolute"}}>
          <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
            <CustomIcon
              name='close-outline'

              onPress={hidetab}
            />
            <CustomIcon
              name='trash-bin-outline'
              onPress={()=>{
                deteletodo(id)
              }}
            />
          </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:"#fffbf8",
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").width * 1
    
  },
  item: {
    backgroundColor: '#fffbf8',
    marginVertical: 8,
    marginHorizontal: 10,
    width:"90%",
    borderWidth:1,
    borderColor:"#e9e5e3",
    borderRadius:15,
  },
  title: {
    fontSize: 15,
    fontWeight:"bold",
    padding:20
  },
 flatList: {
    width: '100%',
    height: '90%',
 },
 viewRow: {
    flexDirection: 'row',
 },
 image: {
    width: '100%',
    resizeMode: 'cover',
 },
 bntAdd:{
   height:70,
   width:70,
   backgroundColor:"#fffbf8",
   position:"absolute",
   right:30,
   bottom:40,
   borderRadius:20,
   justifyContent:"center",
   alignItems:"center",
 }
});

export default AllFoder;