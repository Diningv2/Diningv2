import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import posed from "react-native-pose";
import { colors } from "../config/styles";


const AnimatedSlideUp = posed.View({
    enter: { 
        y: 0,
        transition: {
            ease: 'easeOut'
        }
     },
    exit: { y: 100 },
})

const Highlight = posed.View({
  active: { scale: 1.25, opacity: 1 },
  inactive: { scale: 1, opacity: 0.5 }
});

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 58,
    elevation: 2,
    alignItems: "center",
    padding: 10
  },
  button: { flex: 1 },
  highlight: { 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center" 
  }
});

// Bottom Tabs Component
const TabBar = props => {
  const {
    onTabPress,
    navigation,
    style
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  const renderIcon = (route) => {
      const routeName = route.key;
      const tabSize = 25;

      switch (routeName) {
          case 'Allergens':
            return (
                <Ionicons color={colors.secondary} name="md-person" size={tabSize} />
            )
          case 'DiningHalls':
            return (
                <MaterialCommunityIcons color={colors.secondary} name="food" size={tabSize} />
            )
          case 'Favorites':
            return (
                <MaterialIcons color={colors.secondary} name="favorite" size={tabSize} />
            )

      }
  }

  return (
    <AnimatedSlideUp pose='enter' initialPose='exit'>
    <View style={{...tabStyles.container, ...style}}>

      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={tabStyles.button}
            onPress={() => { onTabPress({ route }) }}
          >
            <Highlight
              pose={isRouteActive ? "active" : "inactive"}
              style={tabStyles.highlight}
            >
              {renderIcon(route, isRouteActive)}
            </Highlight>
          </TouchableOpacity>
        );
      })}
    </View>
    </AnimatedSlideUp>
  );
};

export default TabBar;