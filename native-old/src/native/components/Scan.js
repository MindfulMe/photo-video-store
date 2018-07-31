import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

const ScanView = ({
  error,
  scans,
  scanId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Scans from all scans
  let scan = null;
  if (scanId && scans) {
    scan = scans.find(item => parseInt(item.id, 10) === parseInt(scanId, 10));
  }

  // Scans not found
  if (!scan) return <Error content={ErrorMessages.scan404} />;

  // Build Ingredients listing
  const ingredients = scan.ingredients.map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  // Build Method listing
  const method = scan.method.map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  return (
    <Container>
      <Content padder>
        <Image source={{ uri: scan.image }} style={{ height: 100, width: null, flex: 1 }} />

        <Spacer size={25} />
        <H3>{scan.title}</H3>
        <Text>by {scan.author}</Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>About this scan</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{scan.body}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Ingredients</Text>
          </CardItem>
          <CardItem>
            <Content>
              <List>
                {ingredients}
              </List>
            </Content>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Method</Text>
          </CardItem>
          <CardItem>
            <List>
              {method}
            </List>
          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

ScanView.propTypes = {
  error: PropTypes.string,
  scanId: PropTypes.string.isRequired,
  scans: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ScanView.defaultProps = {
  error: null,
};

export default ScanView;
