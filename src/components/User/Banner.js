import React from 'react';
import { Link } from 'react-router'
import {
  Icon,
  Image,
  Button,
  Row,
  Col
} from '@sketchpixy/rubix';

import CONSTANTS from '../../../constants.js';
const forums = CONSTANTS.forums;

import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';

// Lang
const flagMenuItems = [
  { name: 'English', flag: 'en', lang: 'en' },
  { name: 'Spanish', flag: 'es', lang: 'es' }
];

class FlagMenu extends React.Component {
  state = {
    selectedFlag: 'en'
  };

  handleSelect(event) {
    var flag = event.target.getAttribute("data");
    this.setState({ selectedFlag: flag }, () => {
      l20n.changeLocale(flag);
    });
  }

  render() {
    let menuItems = flagMenuItems.map(({name, flag}, i) => {
      return (
        <a key={i} onClick={this.handleSelect.bind(this)} className={this.state.selectedFlag === flag ? 'active' : ''}>
          <img src={`/imgs/flag/${flag}.png`} width='32' data={flag} height='32'/>
        </a>
      )
    });

    return (
      <div style={{marginTop: '20px',padding: '10%'}} className='languageSelector'>
        <p>
          <Entity className='name' entity='language'/> : 
          {menuItems}
        </p>
      </div>
    );
  }
}

export default class UserBanner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      follow: 'follow me',
      followActive: false,
      likeCount: 999,
      likeActive: false,
      likeTextStyle: 'fg-white'
    };
  }

  handleFollow() {
    this.setState({
      follow: 'followed',
      followActive: true
    });
  }
  handleLike() {
    this.setState({
      likeCount: 1000,
      likeActive: true,
      likeTextStyle: 'fg-orange75'
    });
  }
  wrapUrl(url) {
    return 'url(' + url + ')';
  }
  render() {
    var { props, wrapUrl } = this;
    var { user } = props;
    return (
      <div style={{height: 350, marginTop: -25, backgroundImage: wrapUrl(user && user.info.cover && user.info.cover != '' ? forums + user.info.cover: '/imgs/app/bg.jpg'), backgroundSize: 'cover', position: 'relative', marginBottom: 25, backgroundPosition: 'center'}}>
        <Row>
          <div className='social-cover' style={{overflow: 'scroll', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
          <Col md={5} xs={12} className='text-center'>
            <div className='social-desc' style={{marginTop: '25px'}}>
              <div>
                <ul className="simple-list">
                  <li><p><span>Acceso rápido</span></p></li>
                  <li>
                    <Row>
                      <Col xs={6}>
                        <div className='sidebar-header text-center'>Nuevo Pret</div>
                        <Link to={'wizard'}><span className="icon-feather-monitor rubix-icon" style={{fontSize: '100px'}}></span></Link>
                      </Col>
                      <Col xs={6}>
                        <div className='sidebar-header text-center' style={{marginBottom: '22px'}}>Nueva Expresión</div>
                        <Link to={'exps'}><span className="icon-ikons-speech-bubble-2 rubix-icon" style={{fontSize: '100px'}}></span></Link>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={2} xs={12} className='text-center'>
            <div className='social-avatar'>
              <Image src={user && user.info.picture && user.info.picture != '' ? forums + user.info.picture : '/imgs/app/avatars/avatar.jpg'} width='70%' style={{display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}} />
              <h4 className='fg-white text-center'>{user ? user.im.ref.username : null}</h4>
              <div style={{textAlign: 'center'}}><a href={forums + '/user/' + user.im.ref.slug + '/edit'} target='_blank'><Button bsStyle='orange75' className='remove-sm'>Perfil</Button></a></div>
            </div>
          </Col>
          <Col md={5} xs={12} className='text-center'>
            <div className='social-desc'>
              <div>
                <ul className="simple-list">
                  <li><FlagMenu/></li>
                  <li>
                    <Row>
                      <Col xs={6}>
                        <div className='sidebar-header text-center'>PRETS</div>
                        <div style={{marginLeft: -25, marginRight: -25, marginTop: 12.5, marginBottom: 12.5, textAlign: 'center', color: 'white', fontSize: '30px'}}> {this.props.user.im.prets.length}/3 </div>
                      </Col>
                      <Col xs={6}>
                        <div className='sidebar-header text-center'>MINUTOS</div>
                        <div style={{marginLeft: -25, marginRight: -25, marginTop: 12.5, marginBottom: 12.5, textAlign: 'center', color: 'white', fontSize: '30px'}}> {this.props.user.im.time}/30 </div>
                        <br/>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          </div>
        </Row>
      </div>
    );
  }
}
