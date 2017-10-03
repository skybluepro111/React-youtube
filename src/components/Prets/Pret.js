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
  Modal,
  Button,
  PanelBody,
  PanelHeader,
  PanelContainer,
} from '@sketchpixy/rubix';
import ReactAudioPlayer from 'react-audio-player';

import CONSTANTS from '../../../constants.js';
const forums = CONSTANTS.forums;

import Select from 'react-select';

// Redux
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class ModalSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showModal: false, 
      to: null, 
      picture: ''
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  filterUsersList() {
    var a = this.props.userList.map(function (item) {
      return {
        value: item._id,
        label: item.ref ? item.ref.slug : 'NA',
        pic: item.ref.pic
      } 
    });
    return a;
  }

  setTo(val) {
    this.setState({to: val.value})
    this.setState({picture: val.pic})
    console.log("VAL", val)
  }

  sendChallenge() {
    console.log('sending challenge to', this.state.to);
    this.props.afterUserSelect(this.state.to);
    this.close();
  }

  sendFeedback() {
    console.log('sending feedback to', this.state.to, this.state.picture);
    this.props.afterUserSelected(this.state.to, true, this.state.picture);
    this.close();
  }

  render() {
    var self = this;
    if (!this.props.userList || !this.props.userList.length) return null;
    return (
      <Modal show={this.state.showModal} onHide={this.close.bind(this)} bsSize={this.props.size}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.type === 0 ? 'Challenge: Send To': 'Feedback: Send to'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.userList.length ? <Select name="form-field-name" value={self.state.to} options={self.filterUsersList()} onChange={self.setTo.bind(this)}/> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close.bind(this)} bsStyle='danger'>Close</Button>
          <Button onClick={this.props.type === 0 ? this.sendChallenge.bind(this) : this.sendFeedback.bind(this)} bsStyle='primary'>Send</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

@withRouter
@connect((state) => state)
export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
     color: ['blue','purple', 'orange', 'red', 'black', 'green', 'brown', 'pink', 'cyan', 'gray', 'gray'],
     isDisable: false,
     checked: true,
     completed: props.pret.challenge.completed ? true: false,
     pendingFlag: false ,
     pic: ''
    };
  }

  componentWillMount() {
    var { dispatch } = this.props;
    dispatch(actions.getUsers());
  }

  infoPret() {
    this.props.router.push(`/pret/info/${this.props.index}`);
  }
  evalPret() {
    var { dispatch, user, pret, router } = this.props;
    pret.feedback.evalFlag = true;
    dispatch(actions.updatePret(pret)); 
   this.props.router.push(`/pret/eval/${this.props.index}`);
  }
  newPret() {
    var { dispatch, user, pret, router } = this.props;
    pret.challenge.acceptFlag = true;
    dispatch(actions.updatePret(pret));
    this.props.router.push(`/wizard/${this.props.pret.video.id}`);
   }
  feedbackModal() {
    // this.setState({pendingFlag: true})
    this.smallFeedbackModal.open();
  }
  challengeModal() {
    this.smallChallengeModal.open();
  }
  destroyPlanet() {
    vex.dialog.confirm({
      message: 'Are you absolutely sure you want to destroy the alien planet?',
      callback: (value) => {
        vex.dialog.alert(value ? 'Successfully destroyed the planet.' : 'Chicken.');
      }
    });
  }
  delPret() {
    var { dispatch, user, pret, router } = this.props;
    vex.dialog.confirm({
      message: 'Are you absolutely sure you want to destroy the pret?',
      callback: (value) => {
        if (value) {
          dispatch(actions.removePret({ 
            user_id: user.im._id,
            pret: pret 
          }));
          dispatch(actions.getPrets(user.im._id));
        }
        vex.dialog.alert(value ? 'Successfully destroyed the pret.' : 'Chicken.');
      }
    });
  }
  publishPret() {
    var { dispatch, user, pret, router } = this.props;
    if (!pret.publish) pret.publish = true;
    else pret.publish = false;
    dispatch(actions.updatePret(pret));
    if (pret.publish) router.push(`/ranking`);
  }
  
  challengePret(userId) {
    var { dispatch, user, pret, router } = this.props;
    pret.challenge.to = userId;
    pret.challenge.new = true;
    pret.challenge.completed = true;
    pret.feedback.picture = user.info.picture
    dispatch(actions.updatePret(pret));
  }

  feedbackPret(userId, flag, pic) {
    var { dispatch, user, pret, router } = this.props;
    // pret.feedback.pendingFlag = true;
    this.setState({pendingFlag: flag})
    this.setState({pic: pic})
    pret.feedback.to = userId;
    pret.feedback.new = true;
    pret.feedback.completed = true;
    pret.feedback.picture = user.info.picture;
    dispatch(actions.updatePret(pret));
  }

  setFlag() {
    // this.setState({pendingflag: true})
  }

  render() {
    var { pret, onClick, user, users, dispatch } = this.props;
     console.log("USER", user)
     console.log("users", users)
     console.log("pret", pret, this.state.checked)
     console.log("pendingFlag", this.state. pendingFlag)
    var isDisable = false;
     pret.feedbacks.map((feedback) => {
       if (feedback.author._id === user.im._id){
         isDisable = true;
       }
     })
                  
    return (
      pret.challenge.acceptFlag ? <div></div>
     : <PanelContainer>
        
        <Panel>
          <PanelHeader>
             <Grid className={pret.author === user.im._id ? 'gallery-item original' : pret.feedback.completed ? 'gallery-item feedback': 'gallery-item challenge'}>  
              <Row>
                <Col md={12} style={{padding: 12.5}}>
                  <div className='gallery-1 gallery-item-link' onClick={onClick}>
                    <Image responsive src={`https://img.youtube.com/vi/${pret.video.id}/default.jpg`} alt={pret.title} width='200' height='150'/>
                    <div className='black-wrapper text-center'>
                      <Table style={{height: '100%', width: '100%'}}>
                        <tbody>
                          <tr>
                            <td>
                              <Icon glyph='icon-outlined-magnifier-plus icon-3x' />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <div className='text-center'>
                    <h4 className='fg-darkgrayishblue75'>{pret.video.title}</h4>

                    <div className='audio'>
                      {pret.author === user.im._id ?
                      <img src={user && user.info.picture && user.info.picture != '' ? forums + user.info.picture : '/imgs/app/avatars/avatar.jpg'} width='30' height='30' style={{verticalAlign: 'top', position: 'relative'}} />
                      : <img src={pret.feedback.picture && pret.feedback.picture != '' ? forums + pret.feedback.picture : '/imgs/app/avatars/avatar.jpg'} width='30' height='30' style={{verticalAlign: 'top', position: 'relative'}} />}
                      <ReactAudioPlayer
                        src={'/audios/' + pret.audio}
                        type="audio/mpeg"
                      />
                    </div>
                    {this.state.completed && pret.author !== user.im._id ?
                         <div className='audio' >
                            <img src={user.info.picture && user.info.picture != '' ? forums + pret.feedback.picture : '/imgs/app/avatars/avatar.jpg'} width='30' height='30' style={{verticalAlign: 'top', position: 'relative'}} />  
                           <button className='rubix-timeline-icon  fg-white rubix-icon mark-banner bg-blue' onClick={this.newPret.bind(this)}>Accept Challenge</button> </div>
                    :pret.feedbacks.map((feedback, index) =>{
                     return ( 
                         <div className='audio' key = {index}>
                            <img src={feedback.author && feedback.author.pic && feedback.author.pic != '' ? forums + feedback.author.pic : '/imgs/app/avatars/avatar.jpg'} width='30' height='30' style={{verticalAlign: 'top', position: 'relative'}} />  
                            {feedback.mark && <span className='rubix-timeline-icon  fg-white rubix-icon mark-banner' style = {{backgroundColor: this.state.color[index]}}>{feedback.mark}/5</span>}
                             {/* {pret.feedback.evalFlag && null}
                             {(!pret.feedback.evalFlag && !feedback.mark && isDisable && this.state.pendingFlag) && <span className='rubix-timeline-icon  fg-white rubix-icon mark-banner' style = {{backgroundColor: this.state.color[index]}}>Pending...</span> }
                             {(!pret.feedback.evalFlag && !feedback.mark && !isDisable) && <button className='rubix-timeline-icon  fg-white rubix-icon mark-banner' style = {{backgroundColor: this.state.color[index]}} onClick={this.evalPret.bind(this)}>Evalu</button>} */}

                          </div>) 
                   })}
                       {pret.feedback.evalFlag && pret.feedback.mark && null}
                       { (this.state.pendingFlag && pret.author === user.im._id && !pret.feedback.evalFlag && !pret.feedback.mark) &&
                        <div className='audio' >
                            <img src={user.info.picture && user.info.picture != '' ? forums + this.state.pic : '/imgs/app/avatars/avatar.jpg'} width='30' height='30' style={{verticalAlign: 'top', position: 'relative'}} />  <span className='rubix-timeline-icon  fg-white rubix-icon bg-blue mark-banner'>Pending...</span>
                         </div>  }  
                         { (!this.state.pendingFlag && pret.author !== user.im._id && !pret.feedback.evalFlag && !pret.feedback.mark && !this.state.completed) &&
                         <div className='audio'> 
                          <img src={user.info.picture && user.info.picture != '' ? forums + user.info.picture : '/imgs/app/avatars/avatar.jpg'} width='30' height='30' style={{verticalAlign: 'top', position: 'relative'}} />
                            <button className='rubix-timeline-icon  fg-white rubix-icon mark-banner bg-pink'  onClick={this.evalPret.bind(this)}>Evaluar</button>
                         </div>}                 
                    <Button className='icon-fontello-info-circled-1 pret-btn green' onlyOnHover onClick={this.infoPret.bind(this)} title='Info'></Button>
                    { isDisable ?<Button className='icon-ikons-notepad-ok pret-btn purple' onlyOnHover title='Evaluar' disabled></Button>
                    :<Button className='icon-ikons-notepad-ok pret-btn purple' onlyOnHover title='Evaluar' onClick={this.evalPret.bind(this)}></Button>
                    }
                    <Button className='icon-feather-shuffle pret-btn blue' onlyOnHover  onClick={this.challengeModal.bind(this)} title='Retar'></Button>
                    <Button className='icon-fontello-network-1 pret-btn blue' onlyOnHover onClick={this.feedbackModal.bind(this)} title='Feedback'></Button>
                    <Button className='icon-stroke-gap-icons-Delete pret-btn red' onlyOnHover onClick={this.delPret.bind(this)} title='Eliminar'></Button>
                    <Button className={'icon-fontello-flag-checkered pret-btn green' + (pret.publish ? ' checked': '')} onlyOnHover onClick={this.publishPret.bind(this)} title='Publish'></Button>
                  </div>
                </Col>
              </Row>
            </Grid>
          </PanelHeader>
        </Panel>
        <ModalSize size='small' type={0} userList={users.result} afterUserSelect={this.challengePret.bind(this)} ref={(c) => this.smallChallengeModal = c} />
        <ModalSize size='small' type={1} userList={users.result} pret={pret} afterUserSelected={this.feedbackPret.bind(this)} dispatch={dispatch} ref={(c) => this.smallFeedbackModal = c} />
      </PanelContainer>
    );
  }
}