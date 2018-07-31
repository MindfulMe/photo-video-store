import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View, ScrollView} from 'react-native';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <ScrollView>
      <Container >
         <ImageBackground source={{ uri: 'https://i.imgur.com/4At2YjL.jpg' }} style={{ width: 'auto', height: '100%' }} />
     
        <Content padder style={{position: 'absolute'}}>
          <Header
            title="Bienvenido"
            content="Nos complace darle la bienvenida a la comunidad. Solo hay unas pocas preguntas y estarás en camino."
          />

          {error && <Messages message={error} />}

          <Form>
            <Item stackedLabel>
              <Label style={{color:'white'}}>Nombre de pila</Label>
              <Input onChangeText={v => this.handleChange('firstName', v)} />
            </Item>

            <Item stackedLabel>
              <Label style={{color:'white'}}>Apellido</Label>
              <Input onChangeText={v => this.handleChange('lastName', v)} />
            </Item>

            <Item stackedLabel>
              <Label style={{color:'white'}}>Email</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label style={{color:'white'}}>Contraseña</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item stackedLabel>
              <Label style={{color:'white'}}>Confirmar contraseña</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>

            <Spacer size={-20} />
            <Button block onPress={this.handleSubmit}>
              <Text style={{color:'white'}}>Regístrate</Text>
            </Button>
          
          </Form>
        </Content>
      </Container>
      </ScrollView>
    );
  }
}

export default SignUp;
