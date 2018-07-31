import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, H3 } from 'native-base';

const Error = ({ title, content }) => (
  <Container>
    <Content>
      <H3>{title}</H3>
      <Text>{content}</Text>
    </Content>
  </Container>
);

Error.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Error.defaultProps = {
  title: 'Uh oh',
  content: 'No tienes tanta suerte hoy :() - error',
};

export default Error;
