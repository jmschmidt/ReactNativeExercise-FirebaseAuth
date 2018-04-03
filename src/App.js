import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = {
        loggedIn: null
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyC-PRGvawBeVk5evwlzsY3a6uz4lZtc6Y0',
            authDomain: 'auth-fea48.firebaseapp.com',
            databaseURL: 'https://auth-fea48.firebaseio.com',
            projectId: 'auth-fea48',
            storageBucket: 'auth-fea48.appspot.com',
            messagingSenderId: '439163769296'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true});
            } else {
                this.setState({ loggedIn: false});
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return (
                    <View style={styles.containerStyle}>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </View>
                );
            case false:
                return <LoginForm />
            default: 
                return (
                    <View style={styles.containerStyle}>
                        <Spinner />
                    </View>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        marginTop: 10,
    }
}

export default App;
