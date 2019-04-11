import React, { Component } from 'react';
import Search from './components/Search';
import Login from './components/Login';
import Result from './components/Result';
import Details from './components/Details';
import Camera from './components/CameraScreen';
import Add from './components/Add';
import About from './components/About';
import Tutorial from './components/Tutorial';
import SideBar from './components/SideBar';
import Bulletins from './components/Bulletins';
import TestingComponent from './components/TestingComponent'

import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator } from "react-navigation";


const MainAppStack = createStackNavigator(
  {
    Search: Search,
    Login: Login,
    Result: Result,
    Details: Details,
    Add: Add,
    Bulletins:Bulletins,
    About: About,
    TestingComponent: TestingComponent,
    Tutorial: Tutorial,
  },
  {
<<<<<<< HEAD
    initialRouteName: "Result", //temporarily - will/should be 'Login'
=======
    initialRouteName: "Login", //temporarily - will/should be 'Login'
>>>>>>> 3e9b9c84802a5d0ccef079c81b6fead12e62845c
    defaultNavigationOptions: {
      backgroundColor:"#0D2847",
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerStyle: {
        backgroundColor: "#0D2847",
        elevation: 0,
      },
    },
  }
);

export default createAppContainer(MainAppStack);

