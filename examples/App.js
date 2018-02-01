import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    Animated
} from 'react-native';
import AppWrapper from 'react-native-root-wrapper';

const {height, width} = Dimensions.get('window');

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
    state = {visibility: false, text: '123'};
    animation = new Animated.Value(0);

    componentDidMount() {
        this.show({text: '124124'})
    }

    show = ({text = '555', duration = 300, toValue = 1}) => {
        this.setState({visibility: true, text}, () => {
            Animated.timing(this.animation, {
                toValue,
                duration,
                useNativeDriver: true
            }).start(() => {
                if (!toValue) {
                    this.setState({visibility: false})
                }
            })
        })
    };

    close = () => {
       if(this.state.visibility) {
           this.show({text: '', toValue: 0})
       }
    };

    render() {
        const {visibility} = this.state;
        const translateY = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, parseInt(height / 2)]
        });

        return visibility
            ? (
                <Animated.View style={[styles.cModal, {top: 80, transform: [{translateY}]}]}>
                    <Text>CModal2222222</Text>
                    <Text>{this.state.text}</Text>
                </Animated.View>
            )
            : null
    }
}

const cModal1 = new AppWrapper(<CModal1/>);

const SCModal = {
    instance: null,
    show: () => {
        if (!this.instance) {
            (new AppWrapper(<CModal2 ref={re => (this.instance = re)}/>)).subScribe()
        } else {
            this.instance.show({})
        }
    },
    close: () => {
        // console.log(this.instance)
        if (this.instance) {
            this.instance.close()
        }

    }
};


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

    close2 = () => {
        SCModal.close()
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title={'insert a component'} onPress={this.show}/>
                <Button title={'insert second component'} onPress={this.show2}/>
                <Button title={'Restore'} onPress={this.close2}/>
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
