import { Animated, Easing } from 'react-native';

/** Transition configuration for the StackNavigator
 * Slides the views to the left on page transition
 */
const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
  
        const thisSceneIndex = scene.index
        const width = layout.initWidth
  
        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        })
  
        return { transform: [{ translateX }] }
      },
    }
  }

  export default transitionConfig;