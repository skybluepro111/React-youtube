import React from 'react'
import {Link} from 'react-router'
import Item from './item'
import UserRank from './userRank'
import {
  Tag,
  Row,
  Col,
  Grid,
  Panel,
  Button,
  PanelBody,
  PanelHeader,
  PanelLeft,
  PanelRight,
  LoremIpsum,
  InputGroup,
  FormControl,
  PanelContainer,
} from '@sketchpixy/rubix';
// Redux
import { connect } from 'react-redux'
import actions from '../../redux/actions'
import CONSTANTS from '../../../constants';


@connect((state) => state)
export default class extends React.Component {

  componentWillMount() {
    var { dispatch } = this.props;
    dispatch(actions.getAllPrets());
    this.state = { user: CONSTANTS.getUser() };
  }

  render() {
    var self = this;
    var { dispatch } = this.props;
    return (
       <PanelContainer plain collapseBottom controls={false}>
         <Panel horizontal>
          <Col md={8} xs={12}>
              <Row style={{ margin: '0' }}>
              {this.props.prets && this.props.prets.result && this.props.prets.result.length 
              ? this.props.prets.result.map(function (item, index) {
                {console.log("item", item)} 
              return (<div className='item' key={index}>
                  <Item item={item} user={self.state.user} dispatch={dispatch} index={index} />
                    </div>)
              }) : null}
            </Row>  
          </Col>
          <Col md={4} xs={12}>
              <UserRank dispatch={dispatch}/> 
          </Col>
        </Panel> 
      </PanelContainer>
    )
  }
}