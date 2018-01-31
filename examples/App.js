import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import AppWrapper from 'react-native-root-wrapper';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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
        console.log(appWrapper)
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
