import React,{useState,useEffect,useRef} from 'react'
import {
  Modal,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
  Animated,
  Image,
  Dimensions,
  Pressable
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
Icon.loadFont();
import CustomIcon from '../../components/CutomIconButton/CustomIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import PushNotification from "react-native-push-notification";
import DateTimePicker from '@react-native-community/datetimepicker';
const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const AddList = ({navigation,route}) => {

  
 
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [img,setImg] = useState()
  const [modal,setModal] = useState(false)
  const [date, setDate] = useState(new Date(Date.now()));
  const [show,setShow] = useState(false)
  const [id,setId] = useState()

  const id_ed=route.params
  const title_ed = route.params
  const content_ed = route.params
  const img_ed = route.params

  
  const [todo,setTodo] = useState([])


  
  useEffect(()=>{ 
    console.log(id_ed)
    if(title_ed||content_ed||img_ed){
      let title=title_ed.item.title
      let content=content_ed.item.content
      let img=img_ed.item.img
      setTitle(title)
      setContent(content)
      setImg(img)
    }
  },[])
  useEffect(()=>{
    getTodo();
  },[])
  useEffect(()=>{
    saveTodo(todo);
  },[todo])

  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate)
    setShow(false)
  };
  
  const opensetTime =()=>{
    setModal(true)
  }

  

  const handleNoti=()=>{
    setTimeout(() => {
      PushNotification.localNotification({
        channelId:"test-channel",
        title:"hoang",
        message:"huy",
      })
    },5000);
    setModal(!modal)
  }
  


  // const deteletodo = (todoID)=>{
  //   const newtodo = todo.filter(item=>item.id != todoID);
  //   setTodo(newtodo)
  // }

  const toggle= useRef(new Animated.Value(0)).current
  // const selectIMG = ()=>{
  //   Animated.timing(toggle,{
  //     toValue:1,
  //     duration:200,
  //     useNativeDriver:false
  //   }).start();
  // }
  
  const hidetab = ()=>{
    toggle.setValue(0)
  }

  const AddTitle =()=>{
    if (title_ed||content_ed||img_ed) { 
      const s = todo.splice(1,1,{
        title:title,
        content:content,
        img:img
      })
      saveTodo(todo)
        
        navigation.navigate('MyTab')
      // console.log("hoang")
    } else {
      const newtodo = {
        id:Math.random(),
        img:img,
        title:title,
        content:content,
      }
      setId(newtodo.id)
      setTodo([...todo,newtodo])
      setTitle('')
      setContent('')
      setImg()
      navigation.navigate('MyTab')
    }  
  }
  const saveTodo = async todolist=>{
    try {
      const stringfytodo = JSON.stringify(todolist);
      await AsyncStorage.setItem('todolist',stringfytodo);
      // console.log(stringfytodo)
    } catch (error) {
      console.log(error)
    }
  }

  const getTodo = async ()=>{
    try {
      const todos = await AsyncStorage.getItem('todolist')
      if(todos != null){
        setTodo(JSON.parse(todos))
      }
      // console.log(todo)
    } catch (error) {
      console.log(error)   
    }
  }
  //mở máy ảnh
  const openlibrary = ()=>{
    const options = {
        maxWidth :2000,
        maxHeight :2000,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
      launchImageLibrary(options,res => {
          if(res.didCancel){
              console.log('huy bo chon anh')
          }else if(res.errorCode){
              console.log("loi anh",res.errorCode)
          }else{
              const source = {uri:res.assets[0].uri};
              console.log(source.uri)
              setImg(source.uri)
              hidetab()
          }
      })
  }
  
  

  // const getTodo = async ()=>{
  //   try {
  //     const todos = await AsyncStorage.getItem('todolist')
  //     if(todos != null){
  //       setTodo(JSON.parse(todos))
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   console.log(todo)
  // }
  



  return (
      <HideKeyboard>
        <View style={{flex:1,backgroundColor:"#fffbf8"}}>
            <SafeAreaView style={{flex:1,position:"absolute",top:20,width:"100%"}}>
                <View style={{flexDirection:"row",width:"100%"}}>
                  <View style={{width:"80%",justifyContent:"center",alignItems:"flex-start"}}>
                    <CustomIcon
                      name='arrow-back-outline'
                      onPress={()=>{
                        AddTitle()
                      }}
                    />
                  </View>
                  <View style={{width:"20%",flexDirection:"row",justifyContent:"center"}}> 
                    <CustomIcon
                      name='attach-outline'
                    />
                    <CustomIcon
                      name='notifications-outline'
                      onPress={()=>{
                        opensetTime()
                      }}
                    />
                  </View>
                  <Modal
                      animationType='fade'
                      transparent={true}
                      visible={modal}
                      onRequestClose={()=>{
                        setModal(!modal)
                      }}
                    >
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor: 'rgba(0,0,0,0.3)'}}>
                      <View style={{height:"40%",width:"75%",backgroundColor:"#f1e8e1",justifyContent:"center",borderRadius:15}}>
                        <View style={{height:"20%",borderRadius:15,justifyContent:"center"}}>
                          <Text adjustsFontSizeToFit style={{fontSize:22,padding:10,fontWeight:"400"}}>Thêm lời nhắc nhở</Text>
                        </View>
                        <View style={{height:"60%",paddingHorizontal:10}}>
                          <Pressable  style={{flexDirection:"row",borderBottomWidth:1,padding:15,justifyContent:"space-between"}}>
                            <Text>{String(date.getDate())} tháng {String(date.getMonth()+1)}  </Text>
                            <Icon
                              name='caret-down-outline'
                              size={22}
                            />
                          </Pressable>
                          <Pressable  
                            onPress={()=>{setShow(true)}}
                          style={{flexDirection:"row",borderBottomWidth:1,padding:15,justifyContent:"space-between"}}>
                            <Text>{date.getHours()}:{date.getMinutes()}</Text>
                            <Icon
                              name='caret-down-outline'
                              size={22}
                            />
                          </Pressable>
                          {show && (
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={date}
                              mode='time'
                              is24Hour={true}
                              onChange={onChange}
                            />
                          )}
                          <Pressable  style={{flexDirection:"row",borderBottomWidth:1,padding:15,justifyContent:"space-between"}}>
                            <Text>Không lặp lại</Text>
                            <Icon
                              name='caret-down-outline'
                              size={22}
                            />
                          </Pressable>
                        </View>
                        <View style={{height:"20%",flexDirection:"row",justifyContent:"flex-end",padding:15}}>
                          <Pressable onPress={()=>{setModal(!modal),setShow(false)}} style={{justifyContent:"center",paddingHorizontal:10}}>
                            <Text style={{color:"#d0b39a",fontSize:16,fontWeight:"600"}}>Hủy</Text>
                          </Pressable>
                          <Pressable 
                          onPress={()=>{handleNoti()}}
                          style={{
                            height:30,
                            width:60,
                            backgroundColor:"#8f4e18",
                            justifyContent:"center",
                            paddingHorizontal:10,
                            alignItems:"center",
                            borderRadius:15
                            }}>
                            <Text style={{color:"#d0b39a",fontSize:16,fontWeight:"600"}}>Lưu</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </View>
            </SafeAreaView>
            <View style={{flex:1,position:"absolute",top:90,width:"100%"}}>  
                  {
                    img&&
                    <Image
                      source={{uri:img}}
                      style={{width:"100%",height:200}}
                      resizeMode="cover"
                    />
                  }
                  <TextInput
                    style={{fontSize:25,flex:1,padding:15}}
                    placeholder='Tiêu đề'
                    placeholderTextColor="#dcd8d5"
                    autoFocus={true}
                    value={title}
                    onChangeText={(text)=>{
                      setTitle(text)
                    }}
                  />
                  <TextInput
                    style={{fontSize:15,color:"black",padding:15}}
                    placeholder='Ghi chú'
                    placeholderTextColor="#dcd8d5"
                    multiline={true}
                    numberOfLines={1}
                    value={content}
                    onChangeText={(text)=>setContent(text)}
                  />
                </View>
            <KeyboardAvoidingView style={{flex:1,position:"absolute",bottom:0}} behavior={Platform.OS === 'ios' ? 'padding' : null}
              keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}  
            >
              <View style={{flex:0.8,flexDirection:"row",padding:10}}>
                <View style={{width:"70%",flexDirection:"row",justifyContent:"space-between"}}>
                  <CustomIcon
                    name='image-outline'
                    onPress={()=>{
                      openlibrary()
                      Keyboard.dismiss()
                    }}
                  />
                  <CustomIcon
                    name='color-palette-outline'
                  />
                  <View style={{justifyContent:"center"}}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{fontSize:12}}>
                        Đã chỉnh sửa ngày 28 thg 4
                    </Text>
                  </View>
                </View>
                <View style={{width:"30%",alignItems:"flex-end",justifyContent:"center"}}>
                  <CustomIcon
                    name='ellipsis-vertical-outline'
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
        </View>
      </HideKeyboard>
  )
}

export default AddList
