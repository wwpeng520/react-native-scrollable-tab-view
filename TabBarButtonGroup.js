const React = require('react');
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    PixelRatio
} from 'react-native';

const ONEPIXEL = 1 / PixelRatio.get();

export default class TabBarButtonGroup extends React.PureComponent {
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
            style
        } = this.props;
        return (React.createElement(View, {
                style: [indicatorStyles.tabs, style]
            },
            tabs.map((tab, i) => {
                let borderLeftWidth, borderRightWidth;
                if (i === 0) {
                    borderLeftWidth = ONEPIXEL * 2;
                    borderRightWidth = 0;
                } else if (i === tabs.length - 1) {
                    borderLeftWidth = 0;
                    borderRightWidth = ONEPIXEL * 2;
                } else {
                    borderLeftWidth = i === 1 ? ONEPIXEL * 2 : 0;
                    borderRightWidth = ONEPIXEL * 2;
                }
                const tabStyles = {
                    borderTopLeftRadius: i === 0 ? 10 : 0,
                    borderBottomLeftRadius: i === 0 ? 10 : 0,
                    borderTopRightRadius: i === tabs.length - 1 ? 10 : 0,
                    borderBottomRightRadius: i === tabs.length - 1 ? 10 : 0,
                    backgroundColor: activeTab === i ? '#4f5669' : 'transparent',
                    borderRightWidth: borderRightWidth,
                    borderLeftWidth: borderLeftWidth,
                };
                const tabTextStyles = {
                    color: activeTab === i ? '#fff' : '#4f5669',
                    fontSize: 12,
                };
                return (React.createElement(TouchableOpacity, {
                        key: tab,
                        onPress: () => this.props.goToPage(i),
                        style: [indicatorStyles.tab, tabStyles]
                    },
                    React.createElement(Text, {
                        style: [tabTextStyles]
                    }, tab)));
            })));
    }
}

const indicatorStyles = StyleSheet.create({
    tabs: {
        height: 40,
        flexDirection: 'row',
        borderWidth: 0,
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        borderBottomWidth: ONEPIXEL,
        borderBottomColor: '#ccc',
    },
    tab: {
        minWidth: 50,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 6,
        paddingRight: 6,
        borderWidth: 2 * ONEPIXEL,
        overflow: 'hidden',
    },
});