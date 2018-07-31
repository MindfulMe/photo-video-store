import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, List, ListItem, Body, Left, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';
import LinearGradient from 'react-native-linear-gradient';
import { Image, View} from 'react-native';
// const yourPicture = require('./images/logoeco.jpg');
const Profile = ({ member, logout }) => (

  <Container >
     <Image source={{uri: 'https://i.imgur.com/4At2YjL.jpg'}}style={{ width: '100%', height: '100%' , }}  />
      
    <Content style={{position:'absolute'}}>
      <List>
        {(member && member.email) ?
          <View>
            <Content padder>
              <Header 
                title={`Hola ${member.firstName},`}
                content={`Usted está conectado actualmente como ${member.email}`}
              />             
            </Content>

            <ListItem onPress={Actions.updateProfile} icon style={{backgroundColor: ''}}>
              <Left>
                <Icon name="person-add" style={{color:'white'}}/>
              </Left>
              <Body>
                <Text style={{color:'white'}}>Actualizar mi perfil</Text>
                </Body>
            </ListItem>
            <ListItem onPress={logout} icon style={{backgroundColor: ''}}>
              <Left>
                <Icon name="power" style={{color:'white'}}/>
              </Left>
              <Body>
                <Text style={{color:'white'}}>Cerrar sesión</Text>
              </Body>
            </ListItem>
          </View>
        :
          <View>
            <Content padder>
            
              <Header
                title="Hola,"
                content="Por favor inicie sesión para obtener acceso adicional"
              />
            
            </Content>

            <ListItem onPress={Actions.login} icon style={{backgroundColor: ''}}>
              <Left>
                <Icon name="power" style={{color:'white'}}/>
              </Left>
              <Body>
                <Text style={{color:'white'}}>Iniciar sesión</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.signUp} icon style={{backgroundColor: ''}}>
              <Left>
                <Icon name="add-circle" style={{color:'white'}}/>
              </Left>
              <Body>
                <Text style={{color:'white'}}>Regístrate</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.forgotPassword} icon style={{backgroundColor: ''}}>
              <Left>
                <Icon name="help-buoy" style={{color:'white'}}/>
              </Left>
              <Body>
                <Text style={{color:'white'}}>Se te olvidó tu contraseña</Text>
              </Body>
            </ListItem>
          </View>
        }
      </List>
    </Content>

  </Container>
 
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
