import React from 'react';
import { Animated } from 'react-native';
import { TabBarBottom } from 'react-navigation';

const TAB_BAR_OFFSET = -60;

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(0),
    };
  }

  

  render() {
    return (
        <TabBarBottom {...this.props} style={[styles.container, { bottom: this.state.offset }]}/>
    );
  }
}

const styles = {
  container: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 8,
  },
};