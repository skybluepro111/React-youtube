import React from 'react';
import { Link } from 'react-router'
import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';
import {
  Row,
  Col,
  Grid,
} from '@sketchpixy/rubix';

export default class Footer extends React.Component {
  state = {
    version: 0
  };

  componentDidMount() {
    this.setState({
      version: document.body.getAttribute('data-version')
    });
  }

  render() {
    var year = new Date().getFullYear();
    return (
      <div id='footer-container' className={this.props.compress ? 'compress' : ''}>
        <Grid id='footer' className='text-center'>
          <Row>
            <Col xs={12}>
              <div>
                © {year} Interpretame Creative - v{this.state.version} - 
                <Link to='/about'>{<Entity entity='sidebarAbout'/>}</Link>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
