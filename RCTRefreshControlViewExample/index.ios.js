/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  ListView,
  Text,
  NavigatorIOS,
} = React;

var { RefreshableListViewIOS } = require('react-native-refresh-control-view');

var RCTRefreshViewExample = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let rowCount = 30;
        let rows = [];
        for (var i = 0; i < rowCount; i++) {
            rows.push('row '+i);
        }
        return {
            dataSource: ds.cloneWithRows(rows),
        };
    },
    onRefresh() {
        return new Promise((resolve,reject) => {
            setTimeout(resolve, 500); // simulate fetching data
        });
    },
    render() {
        return (
            <View style={styles.container}>
            <RefreshableListViewIOS
            contentContainerStyle={styles.contentContainer}
            dataSource={this.state.dataSource}
            onRefresh={this.onRefresh}
            renderRow={(rowData) => <View style={styles.row}><Text style={styles.text}>{rowData}</Text></View>}
            />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    contentContainer: {
        backgroundColor: '#F5FCFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#e3e0e0'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    text: {
        fontSize: 18,
    }
});

let navigator = React.createClass({
    render() {
        return (
            <NavigatorIOS initialRoute={{
                title: 'React Native Refreshable List View',
                component: RCTRefreshViewExample
            }}
            style={styles.wrapper}
            />
        )
    }
})

AppRegistry.registerComponent('RCTRefreshViewExample', () => navigator);
