import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View} from 'react-native';
import { Container, Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

export default class Login extends React.Component {
  
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
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
      .then(() => Actions.tabbar())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (


      <Container >
        <ImageBackground source={{ uri: 'https://i.imgur.com/4At2YjL.jpg' }} style={{ width: 'auto', height: '100%' }} />
     
        <Content padder style={{position: 'absolute'}}>
               <Header
            title="Dar una buena acogida"
            content="Por favor, use su correo electrónico y contraseña para iniciar sesión."
          />
          {error && <Messages message={error} />}

          <Form>
            <Item stackedLabel>
              <Label style={{color:'white'}}>Correo electrónico</Label>
              <Input
                autoCapitalize="none"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label style={{color:'white'}}>Contraseña</Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text style={{color:'white'}}>Iniciar sesión</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
