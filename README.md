# react-native-refresh-control-view
Implementation of a UIRefreshControl wrapped inside UIScrollView in React Native
based on Hiroyuki Yoshifuji's [react-native-refresh-control](https://github.com/hrk-ys/react-native-refresh-control).

## Usage

```javascript
var { RefreshableListViewIOS } = require('react-native-refresh-control-view');
…
    onRefresh() {
        return new Promise((resolve,reject) => {
        …
        });
    },
    render() {
        return(
            <RefreshableListViewIOS
                dataSource={this.state.dataSource}
                onRefresh={this.onRefresh}
                renderRow={this.renderRow}
            />
        );
    }
```
