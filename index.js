import React, {Component, Children} from 'react';
import {View, AppRegistry} from 'react-native';

let nid = 0;
const observes = [];

class StaticWrapper extends Component {
    static defaultProps = {
        shouldComponentUpdate: true
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.shouldComponentUpdate;
    }

    render() {
        const child = this.props.children;
        return (child === null || child === false) ? null : Children.only(child);
    }
}

AppRegistry.setWrapperComponentProvider(function () {
    return class extends Component {
        state = {reactElements: {}};

        componentWillMount() {
            observes.push(this.observe);
        }

        componentWillUnmount() {
            // remove
            observes.splice(observes.indexOf(this.observe) >>> 0, 1);
        }

        observe = (id, reactElement, mountedChange) => {
            this.setState(({reactElements}) => {
                reactElements[id] = reactElement;

                return {reactElements};
            });
            return () => this.setState(({reactElements}) => {
                delete reactElements[id];
                if (mountedChange) mountedChange();
                return {reactElements};
            })
        };

        render() {
            const {reactElements} = this.state;
            const elements = [];

            Object.keys(reactElements).forEach((key) => {
                elements.push(<StaticWrapper key={key}>{reactElements[key]}</StaticWrapper>)
            });
            return (
                <View style={{flex: 1, position: 'relative'}}>
                    <StaticWrapper shouldComponentUpdate={true}>
                        {this.props.children}
                    </StaticWrapper>
                    {elements}
                </View>
            );
        }
    }
});

export default class AppWrapper {
    constructor(reactElement) {
        const id = nid++;
        this.mounted = false;
        this.unSubScribe = () => null;
        this.subScribe = () => {
            this.mounted = true;
            return observes.forEach(observe => this.unSubScribe = observe(id, reactElement, () => this.mounted = false))
        };
    }
}
