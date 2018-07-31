import React, { Component } from 'react';
import { connect } from 'react-redux';


class ScanListing extends Component {
  render = () => {
    const { Layout, match } = this.props;

    return (<Layout />
    );
  }
}

export default connect()(ScanListing);
