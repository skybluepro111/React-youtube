import React from 'react';
import { withRouter } from 'react-router';
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
import ReactAudioPlayer from 'react-audio-player';

import CONSTANTS from '../../../constants.js';
const forums = CONSTANTS.forums;

// Redux
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import actions from '../../redux/actions';

@withRouter
@connect((state) => state)
export default class extends React.Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.prets))
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]
    });
  }

  delPret() {
    var { dispatch, user, pret, router } = this.props;
    vex.dialog.confirm({
      message: 'Are you absolutely sure you want to destroy the pret?',
      callback: (value) => {
        if (value) {
          dispatch(actions.removePret({ 
            userId: user._id, 
            id: pret._id,
            audioId: pret.audio 
          }));
          dispatch(actions.getPrets(user._id));
        }
        vex.dialog.alert(value ? 'Successfully destroyed the pret.' : 'Chicken.');
      }
    });
  }

  infoPret() {
    this.props.router.push(`/pret/info/${this.props.index}`);
  }

  render() {
    var { user, onClick } = this.props;
    var self = this;
    return <Table ref={(c) => this.prets = c} className='display' cellSpacing='0' width='100%'>
        <thead>
        <tr>
            <th>Author</th>
            <th>Video_id</th>
            <th>Audio</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {this.props.prets.result.map(function(pret, index) {
            return <tr key={index}>
              <td>{pret.author ? pret.author : 'No auth'}</td>
              <td>{pret.video.id ? <a href={'https://www.youtube.com/watch?v=' + pret.video.id}>{pret.video.id}</a> : 'Deleted' }</td>
              <td>
                  <div className='audio'>
                      <ReactAudioPlayer
                          src={'/audios/' + pret.audio}
                          type="audio/mpeg"
                      />
                  </div>
              </td>
              <td> 
                  <Button className='icon-fontello-info-circled-1 pret-btn green' onlyOnHover onClick={self.infoPret.bind(this)} title='Info'></Button>
                  <Button className='icon-stroke-gap-icons-Delete pret-btn red' onlyOnHover onClick={self.delPret.bind(this)} title='Eliminar'></Button>
              </td>
            </tr>;
          })}
        </tbody>
      </Table>
  }
}