import React from 'react';
import CONSTANTS from '../../../constants';

import { Row } from '@sketchpixy/rubix';

class Iframe extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.url !== nextProps.url;
  }

  render() {
    return React.createElement('iframe', {
      ref: 'iframe',
      frameBorder: '0',
      src: this.props.url,
      style: this.props.style,
      height: this.props.height,
      width: this.props.width,
    });
  }
}

export default class extends React.Component {

  componentWillMount() {
    this.state = { user: CONSTANTS.getUser() };
  }

  componentDidMount() {
    $('#body, html').addClass('forums');
  }

  componentWillUnmount() {
    $('#body, html').removeClass('forums');
  }

  getUrl() {
    const type = this.props.type;
    let url;
    switch (type) {
        // case 'admin':
        //     url = CONSTANTS.forums + '/admin/';
        //     break;
        // case 'settings':
        //     url = CONSTANTS.forums + '/user/' + this.state.user.im.ref.slug;
        //     break;
      case 'form':
        url = 'https://docs.google.com/forms/d/e/1FAIpQLSej6dvAM6P0WCevqwmTTlz-8WeT6nDSfeCBsSy27dNhXEu9pg/viewform?embedded=true';
        break;
      default:
        url = CONSTANTS.forums;
        break;
    }
    return url;
  }

  render() {
    const iframeStyle = {
      position: 'relative',
      height: '1073px',
      width: '100%',
      overflow: 'auto',
      marginBottom: '-10px',
    };
    return (
      <Iframe
        url={this.getUrl()}
        width="100%"
        height="100%"
        style={iframeStyle}
      />
    );
  }
}
