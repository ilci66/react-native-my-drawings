/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Detailed: Drawing;
    // createdAt, title, shape, updatedAt, url, description, id
  Modal: undefined;
  NotFound: undefined;
};

export type Drawing = {  
  url:string;
  id:string|number;
  title: string;
  description: string;
  shape: string;
  objects: {type:string, id:string|number}[] | []
}

export type Drawings = Drawing[];

export type DrawingUrls = {caption:string, source:{uri:string}}[] | undefined

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Carousel: undefined;
  // Detailed: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
