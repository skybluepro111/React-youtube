import React from 'react';
import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Panel, PanelBody, MenuItem, PanelHeader, 
  PanelContainer, PanelLeft, PanelRight, SidebarBtn, 
  Dispatcher, NavDropdown, NavDropdownHover, Navbar, 
  Nav, NavItem, Badge, Button, Icon, Radio
} from '@sketchpixy/rubix';
import { Avatar } from '../User/Avatar';
import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import CONSTANTS from '../../../constants.js';
const forums = CONSTANTS.forums;

class SidebarItem extends React.Component {
  render() {
    var target = this.props.self ? '_self' : '_blank';
    var bg = this.props.bg ? this.props.bg : 'transparent';
    return (this.props.href) ? <li style={{height:45, background: bg}} className="sidebar-nav-item">
      <a target={target} href={this.props.href}>
        <span className={this.props.icon}/>
        <Entity className='name' entity={this.props.entity}/> 
      </a>
    </li> : <li className='hidden'/>;
  }
}

@withRouter
@connect((state) => state)
class ApplicationSidebar extends React.Component {

  handleChange(e) {
    this._nav.search(e.target.value);
  }

  render() {
    var user = this.props.user;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <FormControl type='text' placeholder='Search...' onChange={this.handleChange.bind(this)} className='sidebar-search' style={{border: 'none', background: 'none', margin: '10px 0 0 0', borderBottom: '1px solid #666', color: 'white'}} />
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>
                  { /** Pages Section */ }
                  <div className='sidebar-header'>SECTIONS</div>
                  <SidebarItem
                    href= {forums}
                    icon='icon-fontello-group'
                    entity='sidebarForum'/>
                  <SidebarNavItem glyph='icon-stroke-gap-icons-Medal' name='Ranking' href='/ranking'/>
                  <SidebarNavItem glyph='icon-ikons-home' name={<Entity entity='sidebarDash'/>} href='/dashboard'/>
                  <SidebarNavItem glyph='icon-simple-line-icons-fire' name={<Entity entity='sidebarDiscovery'/>} href='/discover'/>

                  <SidebarNavItem glyph='icon-feather-monitor' name={this.props.prets && this.props.prets.result ? <span>Prets<Label className='bg-danger fg-white'>{this.props.prets.result.length}</Label></span>: 'Prets'}>
                    <SidebarNav>
                      <SidebarNavItem glyph='icon-outlined-loudspeaker' href='/prets' name={<Entity entity='sidebarPrets'/>}/>
                      <SidebarNavItem glyph='icon-simple-line-icons-magic-wand' href='/wizard' name={<Entity entity='sidebarNewPret'/>}/>
                    </SidebarNav>
                  </SidebarNavItem>
                  <SidebarNavItem glyph='icon-outlined-dialogue-think' href='/infer' name={<Entity entity='sidebarInfer'/>}/>

                  <SidebarNavItem glyph='icon-ikons-speech-bubble-2' href='/exps' name={<Entity entity='sidebarExps'/>} />

                  { /** User Section */ }
                  {/*<div className='sidebar-header'>USER SECTIONS</div>
                  { (user.im.role === 1) ? <SidebarNavItem glyph='icon-ikons-lock' name='Admin'>
                    <SidebarNav>
                      <SidebarNavItem glyph='icon-simple-line-icons-layers float-right-rtl' name='Interpretame' href='/admin'/>
                      <SidebarItem
                        href= {forums + '/admin'}
                        icon='icon-fontello-beaker-1'
                        entity='sidebarForumAdmin'/>
                    </SidebarNav>
                  </SidebarNavItem> : <li className='hidden'/>}*/}
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

@withRouter
export default class SidebarContainer extends React.Component {

  componentWillMount() {
    this.state = { user: CONSTANTS.getUser() };
  }

  render() {
    var user = this.state.user;
    return (
      <div id='sidebar' className={this.props.compress ? 'compress' : ''}>
        <div id='logo-section'>
          <img src={this.props.compress ? '/imgs/icon.png' : '/imgs/logo.png'} style={{ height:'42px'}}/>
        </div> 
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={2}>
                <a href={forums + '/user/' + user.im.ref.slug} target='_blank' style={{display:'block'}}> 
                  <img src={user && user.info.picture && user.info.picture != '' ? forums + user.info.picture : '/imgs/app/avatars/avatar.jpg'} width='40' height='40' />
                </a>
              </Col>
              <Col xs={8} id='avatar-col'>
                <a href={forums + '/user/' + user.im.ref.slug} target='_blank' style={{display:'block', color: 'aliceblue'}}> 
                  <div style={{top: 23, fontSize: 23, lineHeight: 1, position: 'relative'}}>
                    {user ? user.im.ref.username : null}
                  </div>
                  <div style={{top: 23, fontSize: 10, lineHeight: 1, position: 'relative'}}>
                    {user ? user.im.ref.email : null}
                  </div>
                </a>
              </Col>
              <Col xs={2} style={{float: 'right'}}>
                <a href='/logout' alt='logout' style={{color: 'beige'}}>
                  <span className='icon-ikons-login'/> 
                </a>
              </Col>
            </Row>
          </Grid>
        </div>
        <div id='sidebar_container'>
          <Sidebar>
            <ApplicationSidebar user={ user }/>
          </Sidebar>
        </div>
      </div>
    );
  }
}
