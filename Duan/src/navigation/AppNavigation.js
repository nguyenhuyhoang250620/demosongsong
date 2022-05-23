import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack'
import AddList from '../screens/Note/AddList';
import Notification from '../screens/Notificattion/Notification';
import CustomHeader from '../components/CustomHeader/CustomHeader';
import CustomHederNote from '../components/CustomHeader/CustomHederNote';
import Test from '../screens/Note/test';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const AppNavigation = () => {
    
const MyTab =()=>{
    return(
        <Tab.Navigator initialRouteName='MyTab_Top'>
            <Tab.Screen name="MyTab_Top" component={MyTab_Top}/>
            <Tab.Screen name="Notification" component={Notification} />
        </Tab.Navigator>
    )
}

const MyTab_Top =()=>{

    return(
        <CustomHederNote/>
    )
}

const MyStack =()=>{
    return(
        <Stack.Navigator initialRouteName='MyTab' screenOptions={{headerShown:false}} >
            <Stack.Screen name='MyTab_Top' component={MyTab_Top}
                options={{
                    title: 'MyTab_Top',
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
            />
            <Stack.Screen name='AddList' component={AddList}
                options={{
                    title: 'AddList',
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                    headerTitle: props => <CustomHeader {...props} />,
                    headerLeft:null
                  }}
            />
            <Stack.Screen name='MyTab' component={MyTab} options={{headerShown:false}}/>
            <Stack.Screen name='test' component={Test}/>
        </Stack.Navigator>
    )
}
  return (
    <MyStack/>
  )
}
export default AppNavigation
