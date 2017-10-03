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
    $(ReactDOM.findDOMNode(this.users))
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]
    });
  }

  render() {
    var { user, onClick } = this.props;
    return <Table ref={(c) => this.users = c} className='display' cellSpacing='0' width='100%'>
        <thead>
        <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Time</th>
            <th>Prets</th>
        </tr>
        </thead>
        <tbody>
          {this.props.users.result.map(function(user, index) {
            return <tr key={index}>
              <td>{user._id}</td>
              <td>{user.role}</td>
              <td>{user.time}</td>
              <td>{user.prets}</td>
            </tr>;
          })}
        </tbody>
      </Table>
  }
}