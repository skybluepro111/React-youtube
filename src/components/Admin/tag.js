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
    $(ReactDOM.findDOMNode(this.tags))
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]
    });
  }

  delTag() {
    var { dispatch, user, tag, router } = this.props;
    vex.dialog.confirm({
      message: 'Are you absolutely sure you want to destroy the tag?',
      callback: (value) => {
        if (value) {
          dispatch(actions.removeTag(tag));
          dispatch(actions.getTags(user._id));
        }
        vex.dialog.alert(value ? 'Successfully destroyed the tag.' : 'Chicken.');
      }
    });
  }

  render() {
    var { user, onClick } = this.props;
    var self = this;
    return <Table ref={(c) => this.tags = c} className='display' cellSpacing='0' width='100%'>
        <thead>
        <tr>
            <th>Name</th>
            <th>Volume</th>
            <th>Videos</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {this.props.tags.result.map(function(tag, index) {
            return <tr key={index}>
              <td>{tag.label}</td>
              <td>{tag.volume}</td>
              <td>{tag.videos.map(function(item, indexV) {
                return <a key={indexV} href={"https://www.youtube.com/watch?v=" + item} target='_blank'><b key={index}>{item}</b></a>;
              })}
              </td>
              <td>
                  <Button className='icon-stroke-gap-icons-Delete pret-btn red' onlyOnHover onClick={self.delTag.bind(this)} title='Eliminar'></Button>
              </td>
            </tr>;
          })}
        </tbody>
      </Table>
  }
}