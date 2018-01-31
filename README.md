# react-native-root-wrapper

## Installation

```bash
npm install react-native-root-wrapper --save
```

## Examples
```jsx
import AppWrapper from 'react-native-root-wrapper';

class CModal extends Component {
    render() {
        return (
            <View style={styles.cModal}>
                <Text>CModal</Text>
            </View>
        )
    }
}

const appWrapper = new AppWrapper(<CModal />);

export default class App extends Component {

    show = () => {
        if (appWrapper.mounted) {
            appWrapper.unSubScribe()
        } else {
            appWrapper.subScribe()
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title={'insert a component'} onPress={this.show}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cModal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 72,
        width: 72,
        backgroundColor: '#398dee'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
```