import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import WordCloud from './Wordcloud/WordCloud';
import CONSTANTS from '../../../constants';

import {
  Row,
  Col,
  Grid,
  Panel,
  Alert,
  PanelBody,
  PanelContainer,
  Button,
  //
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  //
} from '@sketchpixy/rubix';

class TagForm extends React.Component {

  createTag(e) {
    let { dispatch } = this.props;
    var res = [];
    var video_id = (ReactDOM.findDOMNode(this.video_id)).value;
    var vQuery = '?v=';
    if (video_id.indexOf(vQuery) > -1) video_id = video_id.split(vQuery)[1];
    (ReactDOM.findDOMNode(this.tag_list)).value.split(',').map(function(val, index) {
      res.push({text: val.trim()});
    })
    dispatch(actions.createTag({
      video_id: video_id,
      tag_list: res
    }));
  }

  render() {
    return (
      <div className="container-fluid" id='newTag'>
        <Form horizontal onSubmit={this.createTag.bind(this)}>
          <FormGroup>
              <Grid>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <InputGroup className="dropdown-limit">
                        <FormControl type='text' placeholder='Video id' ref={(input) => this.video_id = input} autoFocus />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <InputGroup className="dropdown-limit">
                        <FormControl type='text' placeholder='Tag List (separate via comma)' ref={(input) => this.tag_list = input} />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <br className='visible-xs' />
                    <Button type='submit' bsStyle='blue' block onlyOnHover>Create Tag</Button>
                  </Col>
                </Row>
              </Grid>            
          </FormGroup>
        </Form>
      </div>
    );
  }
}


@connect((state) => state)
export default class AllExps extends React.Component {

  static fetchData(store) {
    return store.dispatch(actions.getTags());
  }

  componentWillMount() {
    this.state = { user: CONSTANTS.getUser() };
  }

  render() {
    return (<div>
      {this.state.user.im.role === 1 ? <PanelContainer><TagForm dispatch={this.props.dispatch}/></PanelContainer> : null }
      <WordCloud
        dispatch={this.props.dispatch}
        topics={this.props.tags.result}
      />
      </div>
    );
  }
}
