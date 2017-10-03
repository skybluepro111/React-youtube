import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import actions from '../../redux/actions';
import Exps from './Exps';
import CONSTANTS from '../../../constants';

import {
  Row,
  Col,
  Grid,
  Panel,
  Alert,
  PanelBody,
  PanelContainer,
  Button
} from '@sketchpixy/rubix';

@connect((state) => state)
export default class AllExps extends React.Component {

  componentWillMount() {
    var { dispatch } = this.props;
    var user = CONSTANTS.getUser();
    dispatch(actions.getExps(user.im._id));
    this.state = { user: user };
  }

  renderExps() {
    let { exps, dispatch } = this.props;
    let { result } = exps;
    var self = this;
    return <Exps rows={result} user={self.state.user} dispatch={dispatch} actions={actions} />;
  }

  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 0, paddingBottom: 25}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Tu lista de Expresiones:</h3>
                  {this.renderExps()}
                </Col>
              </Row>
              {this.props.exps && this.props.exps.result && this.props.exps.result.length ? <Row style={{textAlign: 'center'}}>
                <Link to={'exercises'}>
                  <Button bsStyle='orange75' className='btn-material train'>Ejercítate</Button>
                </Link>
              </Row> : null }
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}
