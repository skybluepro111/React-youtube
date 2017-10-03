import React from 'react';
import { Link, withRouter } from 'react-router';
import {
  Tag,
  Row,
  Col,
  Grid,
  Panel,
  Button,
  PanelBody,
  PanelLeft,
  PanelRight,
  LoremIpsum,
  InputGroup,
  FormControl,
  PanelContainer,
} from '@sketchpixy/rubix';

// Redux
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class Tags extends React.Component {
  renderTags() {
    return this.props.tags.map((tag, index) => {
        return <Link to={'/discover/' + tag.label} key={index}><div className="left-tag fg-hover-white bg-lightgray50 border-lightgray50 fg-text border-hover-darkgreen45 bg-hover-darkgreen45">{tag.label}</div></Link>
    })
  }
  render() {
    return (
        <Grid>
            <Row>
                <Col xs={12} className='text-center' style={{height: '500px', overflow: 'auto'}}>
                    <div>
                        <div className='text-uppercase blog-sidebar-heading'>
                            <small>Tags</small>
                        </div>
                        {this.renderTags()}
                    </div>
                </Col>
            </Row>
        </Grid>
    );
  }
}

@connect((state) => state)
export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            tags: []
        }
    }
  componentWillMount() {
      this.props.dispatch(actions.getTags());
  }
  render() {
    return (
        <Grid>
            <Col xs={12} collapseRight>
                <PanelContainer controls={false}>
                    <PanelBody style={{paddingBottom: 12.5}}>
                        {this.props.tags && this.props.tags.result ? <Tags tags={this.props.tags.result}/> : null }
                        <hr/>
                    </PanelBody>
                </PanelContainer>
            </Col>
        </Grid>
    );
  }
}
