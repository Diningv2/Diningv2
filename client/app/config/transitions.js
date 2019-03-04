export const myCustomTransitionFunction = (transitionInfo) => {
    const { progress, start, end } = transitionInfo;
    const scaleInterpolation = progress.interpolate({
      inputRange: [0, start, end, 1],
      outputRange: [0.8, 0.8, 1, 1],
    });
    return { transform: [{ scale: scaleInterpolation }] };
  }