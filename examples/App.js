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

class CModal1 extends Component {
    render() {
        return (
            <View style={styles.cModal}>
                <Text>CModal</Text>
            </View>
        )
    }
}

class CModal2 extends Component {
    render() {
        return (
            <View style={[styles.cModal, {top: 80}]}>
                <Text>CModal2222222</Text>
            </View>
        )
    }
}

const cModal1 = new AppWrapper(<CModal1 />);

const SCModal = {
    instance: null,
    show: () => {
        if (!this.instance) {
            (new AppWrapper(<CModal2 ref={r => this.instance = r}/>)).subScribe()
        }
    },
    close: () => {}
}

export default class App extends Component {

    show = () => {
        if (cModal1.mounted) {
            cModal1.unSubScribe()
        } else {
            cModal1.subScribe()
        }
    };

    show2 = () => {
        SCModal.show()
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title={'insert a component'} onPress={this.show}/>
                <Button title={'insert second component'} onPress={this.show2}/>
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
