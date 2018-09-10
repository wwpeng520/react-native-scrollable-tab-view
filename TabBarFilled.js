const React = require('react');
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    PixelRatio
} from 'react-native';
const ONEPIXEL = 1 / PixelRatio.get();

export default class TabBarFilled extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        };
    }
    componentDidMount() {
        const {
            goToPage,
            activeTab
        } = this.props;
        if (goToPage && activeTab instanceof Array && this.state.currentIndex !== activeTab) {
            goToPage(activeTab);
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
        const numberOfTabs = tabbars.length;
        const translateX = scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, containerWidth / numberOfTabs],
        });
        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            height: 1,
            backgroundColor: '#555',
            bottom: 0,
            transform: [{
                translateX
            }],
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
                            this.setState({
                                currentIndex: index
                            });
                        },
                        style: indicatorStyles.tab
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
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        justifyContent: 'center',
        // borderWidth: ONEPIXEL,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});