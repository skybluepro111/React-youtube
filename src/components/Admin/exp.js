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
    $(ReactDOM.findDOMNode(this.exps))
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]
    });
  }

  delExp() {
    var { dispatch, user, exp, router } = this.props;
    vex.dialog.confirm({
      message: 'Are you absolutely sure you want to destroy the expression?',
      callback: (value) => {
        if (value) {
          dispatch(actions.removeExp(exp));
          dispatch(actions.getExps(user._id));
        }
        vex.dialog.alert(value ? 'Successfully destroyed the expression.' : 'Chicken.');
      }
    });
  }

  render() {
    var { user, onClick } = this.props;
    var self = this;
    return <Table ref={(c) => this.exps = c} className='display' cellSpacing='0' width='100%'>
        <thead>
        <tr>
            <th>Author</th>
            <th>From_lang</th>
            <th>From_exp</th>
            <th>To_lang</th>
            <th>To_exp</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {this.props.exps.result.map(function(exp, index) {
            return <tr key={index}>
              <td>{exp.author}</td>
              <td>{exp.expFrom.languaje}</td>
              <td>{exp.expFrom.exp}</td>
              <td>{exp.expTo.languaje}</td>
              <td>{exp.expTo.exp}</td>
              <td>
                  <Button className='icon-stroke-gap-icons-Delete pret-btn red' onlyOnHover onClick={self.delExp.bind(this)} title='Eliminar'></Button>
              </td>
            </tr>;
          })}
        </tbody>
      </Table>
  }
}