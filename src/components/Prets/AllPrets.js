import React from 'react';
import { Link } from 'react-router';
import CONSTANTS from '../../../constants';

// Redux
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import {
  Row,
  Col,
  Icon,
  Grid,
  Panel,
  Image,
  Table,
  Button,
  PanelBody,
  PanelHeader,
  PanelContainer,
} from '@sketchpixy/rubix';

import Prets from './Pret';

@connect((state) => state)
export default class Gallery extends React.Component {

  componentWillMount() {
    var { dispatch } = this.props;
    var user = CONSTANTS.getUser();
    dispatch(actions.getPrets(user.im._id));
    this.state = { user: user };
  }

  onClick() {
    var VIDEOS = this.props.prets.result.map((pret) => {
      if (!pret) return {};
      return {
        title: pret.video.title,
        subtitle: pret.video.desc,
        type: 'text/html',
        youtube: pret.video.id,
        poster: pret.video.thumb
      }
    });
    // Initialize the Gallery as video carousel:
    blueimp.Gallery(VIDEOS, {
      container: '#blueimp-gallery',
      carousel: true
    })
  }

  renderPrets() {
    var _this = this;
    var { prets } = this.props;
    var { result } = prets;
    if (!result) return null;
    return result.map(function(pret, index) {
      return <Col key={pret._id} md={4} collapseRight className='gallery-item'>
          <Prets pret={pret} index={index} user={_this.state.user} onClick={_this.onClick.bind(_this)} />
        </Col>;
    });
  }

  render() {
    return (<div>
      <legend className='info'> Recuerda, dispones de un máximo de <b>tres prets</b> y de <b>treinta minutos</b> en total. </legend>
      <Row className='gallery-view'>
        {this.renderPrets()}
      </Row>
      {(this.props && this.props.prets && this.props.prets.result && this.props.prets.result.length <= 2) ? <Row style={{textAlign: 'center'}}>
        <Link to={'wizard'}>
          <Button bsStyle='orange75' className='btn-material add'/>
        </Link>
      </Row> : null}
      </div>
    );
  }
}
