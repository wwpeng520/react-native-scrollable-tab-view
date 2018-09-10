/**
 * textActiveStyle/textInActiveStyle:
 * 如果需要字体大小不同时，则不能和下划线同时使用，因为文字大小不同布局改变，下划线的位置也会改变
 */
const React = require('react');
import {
  View,
  Text,
  Easing,
  TouchableOpacity,
  Animated,
  StyleSheet
} from 'react-native';
const ONEPIXEL = 1 / PixelRatio.get();

export default class TabBarMid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.startAnimated = () => {
      this.state.lineWidth.setValue(0);
      this.state.lineLeft.setValue(0);
      Animated.parallel([
        Animated.timing(this.state.lineWidth, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
        }),
        Animated.timing(this.state.lineLeft, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
        }),
      ]).start(() => {});
    };
    this.state = {
      currentIndex: 0,
      lineWidth: new Animated.Value(0),
      lineLeft: new Animated.Value(0),
      prevWidth: 0,
      prevLeft: 0,
      nextWidth: 0,
      nextLeft: 0,
    };
    this.tabbarInfos = new Array(3);
  }
  componentDidMount() {
    const {
      goToPage,
      activeTab
    } = this.props;
    if (goToPage && activeTab instanceof Array && this.state.currentIndex !== activeTab) {
      this.startAnimated();
      this.setState((prevState, props) => ({
        prevLeft: prevState.nextLeft,
        prevWidth: prevState.nextWidth,
        nextLeft: this.tabbarInfos[activeTab].left,
        nextWidth: this.tabbarInfos[activeTab].width,
      }));
      this.setState({
        currentIndex: activeTab
      });
    }
  }
  componentDidUpdate() {
    const {
      goToPage,
      activeTab
    } = this.props;
    if (goToPage && activeTab instanceof Array && this.state.currentIndex !== activeTab) {
      goToPage(activeTab);
      this.startAnimated();
      this.setState((prevState, props) => ({
        prevLeft: prevState.nextLeft,
        prevWidth: prevState.nextWidth,
        nextLeft: this.tabbarInfos[activeTab].left,
        nextWidth: this.tabbarInfos[activeTab].width,
      }));
      this.setState({
        currentIndex: activeTab
      });
    }
  }
  render() {
    const {
      tabs,
      activeTab,
      goToPage,
      scrollValue,
      containerWidth,
      style,
      tabStyle,
      underlineStyle,
      textActiveStyle,
      textInActiveStyle,
    } = this.props;
    const tabbars = tabs;
    const lineLeft = this.state.lineLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.prevLeft, this.state.nextLeft],
    });
    const lineWidth = this.state.lineWidth.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.prevWidth, this.state.nextWidth],
    });
    const tabUnderlineStyle = {
      position: 'absolute',
      height: 1,
      backgroundColor: '#666',
      bottom: 0,
      width: lineWidth,
      left: lineLeft,
    };
    return (React.createElement(View, {
        style: [indicatorStyles.tabs, style]
      },
      tabbars.map((tab, index) => {
        const tabTextStyles = {
          color: activeTab === index ? '#333' : '#666',
          fontSize: 15,
          fontWeight: activeTab === index ? '600' : '400',
        };
        return (React.createElement(TouchableOpacity, {
            key: tab,
            onPress: () => {
              goToPage && goToPage(index);
              this.startAnimated();
              this.setState((prevState, props) => ({
                prevLeft: prevState.nextLeft,
                prevWidth: prevState.nextWidth,
                nextLeft: this.tabbarInfos[index].left,
                nextWidth: this.tabbarInfos[index].width,
                currentIndex: index,
              }));
            },
            style: [indicatorStyles.tab, tabStyle],
            onLayout: (e) => {
              console.log(e.nativeEvent.layout);
              const left = e.nativeEvent.layout.x;
              const width = e.nativeEvent.layout.width;
              this.tabbarInfos[index] = {
                left,
                width
              };
              if (index === 0) {
                this.setState({
                  prevLeft: left,
                  nextLeft: left,
                  prevWidth: width,
                  nextWidth: width,
                });
              }
            }
          },
          React.createElement(Text, {
            style: [tabTextStyles, activeTab === index ? textActiveStyle : textInActiveStyle]
          }, tab)));
      }),
      React.createElement(Animated.View, {
        style: [tabUnderlineStyle, underlineStyle]
      })));
  }
}

const indicatorStyles = StyleSheet.create({
  tabs: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
  },
  tab: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
});