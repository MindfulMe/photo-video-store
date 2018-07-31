import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View } from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import { Image} from 'react-native';
class UpdateProfile extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: props.member.firstName || '',
      lastName: props.member.lastName || '',
      email: props.member.email || '',
      password: '',
      password2: '',
      changeEmail: false,
      changePassword: false,
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
      .then(() => console.log('Profile Updated'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error, success } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container >
        <Image source={{uri: 'https://i.imgur.com/4At2YjL.jpg'}}style={{ width: '100%', height: '100%' , }}  />
        <Content padder style={{position:'absolute'}}>
          <Header
            title="Actualizar mi perfil"
            content="¡Gracias por mantener su cuenta actualizada!"
          />

          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Form>
            <Item stackedLabel>
              <Label style={{color:'white'}}>Nombre de pila</Label>
              <Input
                value={this.state.firstName}
                onChangeText={v => this.handleChange('firstName', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label style={{color:'white'}}>Apellido</Label>
              <Input
                value={this.state.lastName}
                onChangeText={v => this.handleChange('lastName', v)}
              />
            </Item>

            <ListItem style={{backgroundColor:'#602946'}}>
              <CheckBox
                checked={this.state.changeEmail}
                onPress={() => this.handleChange('changeEmail', !this.state.changeEmail)}
              />
              <Body>
                <Text style={{color:'white'}}>Cambiar Email</Text>
              </Body>
            </ListItem>

            {this.state.changeEmail &&
              <Item stackedLabel>
                <Label style={{color:'#602946'}}>Email</Label>
                <Input
                  autoCapitalize="none"
                  value={this.state.email}
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}
                />
              </Item>
            }

            <ListItem style={{backgroundColor:'#602946'}}>
              <CheckBox
                checked={this.state.changePassword}
                onPress={() => this.handleChange('changePassword', !this.state.changePassword)}
              />
              <Body>
                <Text style={{color:'white'}}>Cambiar contraseña</Text>
              </Body>
            </ListItem>

            {this.state.changePassword &&
              <View padder>
                <Item stackedLabel>
                  <Label style={{color:'white'}}>Contraseña</Label>
                  <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
                </Item>

                <Item stackedLabel last>
                  <Label style={{color:'white'}}>Confirmar contraseña</Label>
                  <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
                </Item>
              </View>
            }

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text style={{color:'white'}}>Actualización del perfil</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default UpdateProfile;
