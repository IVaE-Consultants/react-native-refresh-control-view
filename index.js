var React = require('react-native');
var {
  ListView,
  ScrollView,
  findNodeHandle,
  NativeModules,
} = React;

var RCTRefreshControl = NativeModules.RefreshControlViewManager;
var {
  DeviceEventEmitter
} = React;


const LISTVIEW = 'ListView';

let listeners = {
    onRefresh: []
};

var subscription = DeviceEventEmitter.addListener('didBeginRefreshing', (reactTag) => listeners.onRefresh[reactTag]());

var RefreshControl = {
    create: function(nodeHandle, onRefresh) {
        RCTRefreshControl.create(nodeHandle, {}, (error) => {
            if(error) {
                throw error;
            }
            listeners.onRefresh[nodeHandle] = onRefresh;
        });
    },
    endRefreshing: function(nodeHandle) {
        RCTRefreshControl.endRefreshing(nodeHandle);
    }
};

let RefreshableListViewIOS = React.createClass({
    propTypes: {
        onRefresh: React.PropTypes.func.isRequired,
        endRefreshingOnError: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            endRefreshingOnError: true
        };
    },
    getInitialState() {
        return {};
    },
    endRefreshing() {
        RefreshControl.endRefreshing(findNodeHandle(this.refs[LISTVIEW]));
    },
    componentDidMount() {
        let {endRefreshingOnError} = this.props;
        let onRefresh = () => {
            this.props.onRefresh()
            .then(() => {
                this.endRefreshing();
            })
            .catch((error) => {
                if(endRefreshingOnError) {
                    this.endRefreshing();
                }
            });
        };
        RefreshControl.create(findNodeHandle(this.refs[LISTVIEW]), onRefresh);
    },
    render() {
        return <ListView ref={LISTVIEW} {...this.props} />
    },
});

module.exports = {RefreshableListViewIOS};

