import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import firebase from 'firebase';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  onButtonPress() {
    const { email, password } = this.state;

    console.log('cliked');

    this.setState({
      error: ''
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(() => {
            this.setState({ error: 'Authentication Failed' });
          });
      });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            label="Email"
            placeholder="user@gmail.com"
          />
        </CardSection>

        <CardSection>
          <Input
            value={this.state.Password}
            onChangeText={password => this.setState({ password })}
            label="Password"
            placeholder="password"
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Log In</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#FF0000'
  }
};

export default LoginForm;
