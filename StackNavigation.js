import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from './Screen/Login';
import { Home } from './Screen/Home';
import { Signup } from './Screen/Signup';
import { StartingPage } from './Screen/StartingPage'; 
import { UserSelection } from './Screen/UserSelection';
import { CreateProfileScreen } from './Screen/CreateProfileScreen';
import { InterestScreen } from './Screen/InterestScreen';
import {RegisterWorker} from "./Screen/RegisterWorker";
import { HiredWorkers } from './Screen/HiredWorkers';
import {WorkersList} from "./Screen/WorkersList";
import { WorkerProfile } from './Screen/WorkerProfile';
import {HireForm} from "./Screen/HireForm";
import {ComplaintScreen} from "./Screen/ComplaintScreen";
import {LaborProfile} from "./Screen/LaborProfile";






const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartingPage'>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name='StartingPage' component={StartingPage} options={{ headerShown: false }} />
        <Stack.Screen name='UserSelection' component={UserSelection} options={{ headerShown: false }} />
        <Stack.Screen name='CreateProfileScreen' component={CreateProfileScreen} options={{ headerShown: false }} />
       
        <Stack.Screen name='InterestScreen' component={InterestScreen} options={{ headerShown: false }} />
       <Stack.Screen name='RegisterWorker' component={RegisterWorker} options={{ headerShown: false }} />
       <Stack.Screen name='HiredWorkers' component={HiredWorkers} options={{ headerShown: false }} />
       <Stack.Screen name='WorkersList' component={WorkersList} options={{ headerShown: false }} />
       <Stack.Screen name='WorkerProfile' component={WorkerProfile} options={{ headerShown: false }} />
       <Stack.Screen name='HireForm' component={HireForm} options={{ headerShown: false }} />
       <Stack.Screen name='ComplaintScreen' component={ComplaintScreen} options={{ headerShown: false }} />
       <Stack.Screen name='LaborProfile' component={LaborProfile} options={{ headerShown: false }} />
       
      
     
 
       
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
