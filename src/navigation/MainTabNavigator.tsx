import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import DailyLogScreen from '../screens/DailyLogScreen';
import CalendarScreen from '../screens/CalendarScreen';
import LadderProgressScreen from '../screens/LadderProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { theme } from '../theme/theme';

export type MainTabParamList = {
  DashboardTab: undefined;
  DailyLog: undefined;
  Calendar: undefined;
  Ladder: undefined;
  Settings: undefined;
};

export type DashboardStackParamList = {
  Dashboard: undefined;
  History: undefined;
  DailyLog: { date?: string };
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
      }}
    >
      <DashboardStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: '🥛 Milk Ladder Tracker' }}
      />
      <DashboardStack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: 'Log History' }}
      />
      <DashboardStack.Screen
        name="DailyLog"
        component={DailyLogScreen}
        options={{ title: 'Daily Log' }}
      />
    </DashboardStack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'DashboardTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'DailyLog') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Ladder') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        headerShown: false,
      })}
    >
      <Tab.Screen name="DashboardTab" component={DashboardStackNavigator} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="DailyLog" component={DailyLogScreen} options={{ title: 'Daily Log', headerShown: true, headerStyle: { backgroundColor: theme.colors.primary }, headerTintColor: theme.colors.white }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendar', headerShown: true, headerStyle: { backgroundColor: theme.colors.primary }, headerTintColor: theme.colors.white }} />
      <Tab.Screen name="Ladder" component={LadderProgressScreen} options={{ title: 'My Ladder', headerShown: true, headerStyle: { backgroundColor: theme.colors.primary }, headerTintColor: theme.colors.white }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings', headerShown: true, headerStyle: { backgroundColor: theme.colors.primary }, headerTintColor: theme.colors.white }} />
    </Tab.Navigator>
  );
}
