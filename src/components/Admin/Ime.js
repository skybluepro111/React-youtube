import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import CONSTANTS from '../../../constants';

// Redux
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import {
  Row,
  Col,
  Nav,
  Tab,
  Icon,
  Grid,
  Panel,
  NavItem,
  MenuItem,
  PanelLeft,
  PanelBody,
  LoremIpsum,
  PanelRight,
  PanelHeader,
  PanelFooter,
  Table,
  NavDropdown,
  PanelContainer,
  PanelTabContainer,
} from '@sketchpixy/rubix';

import AExps from './exp';
import AUsers from './user';
import APrets from './pret';
import ATags from './tag';


@connect((state) => state)
export default class Gallery extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      activeTab: 'users'
    };
  }

  componentWillMount() {
    var { dispatch } = this.props;
    var user = CONSTANTS.getUser();
    dispatch(actions.getTags());
    dispatch(actions.getUsers());
    dispatch(actions.getAllPrets());
    dispatch(actions.getAllExps());
    this.state = { user: user };
  }

  componentWillUnmount() {
    var { dispatch } = this.props;
    dispatch(actions.getPrets(this.state.user.im._id));
    dispatch(actions.getExps(this.state.user.im._id));
  }

  handleActiveState(eventKey) {
    this.setState({
      activeTab: eventKey
    });
  }

  getItemProps(eventKey) {
    return {
      eventKey,
      active: this.state.activeTab === eventKey
    };
  }

  render() {
    return (<div style={{padding: '1%'}}>
    <PanelTabContainer id='panel-body-header-tab-footer' defaultActiveKey="home">
        <Panel>
          <PanelHeader className='bg-purple fg-white' style={{ display: 'block' }}>
            <Grid>
              <Row>
              <Col xs={12}>
                <h4>Admin Panel</h4>
              </Col>
              </Row>
            </Grid>
            <Nav bsStyle="tabs" className='plain' onSelect={this.handleActiveState.bind(this)}>
              <NavItem eventKey="users">
                <Icon bundle='fontello' glyph='home'/> Users
              </NavItem>
              <NavItem eventKey="prets">
                <Icon bundle='fontello' glyph='home'/> Prets
              </NavItem>
              <NavItem eventKey="exps">
                <Icon bundle='fontello' glyph='home'/> Exps
              </NavItem>
              <NavItem eventKey="tags">
                <Icon bundle='fontello' glyph='home'/> Tags
              </NavItem>
            </Nav>
          </PanelHeader>
          <PanelBody>
            <Grid>
              <Row>
                <Col xs={12}>
                  <Tab.Content style={{overflow: 'scroll'}}>
                    <Tab.Pane eventKey="users">
                      {this.props.users && this.props.users.result && this.props.users.result.length ? <AUsers users={this.props.users}/> : null}
                    </Tab.Pane>

                    <Tab.Pane eventKey="tags">
                      {this.props.tags && this.props.tags.result && this.props.tags.result.length ? <ATags tags={this.props.tags}/> : null}
                    </Tab.Pane>

                    <Tab.Pane eventKey="prets">
                      {this.props.prets && this.props.prets.result && this.props.prets.result.length ? <APrets prets={this.props.prets}/> : null}
                    </Tab.Pane>

                    <Tab.Pane eventKey="exps">
                      {this.props.exps && this.props.exps.result && this.props.exps.result.length ? <AExps exps={this.props.exps}/> : null}
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelTabContainer>
      </div>
    );
  }
}
