import React, { Component } from "react"
import { withRouter } from 'react-router';
// YOUTUBE_API
import _ from "lodash"
import YTSearch from '../../modules/youtube_api'
import Search_bar from "../Video/Search_bar"
import Video_list from "../Video/Video_list"
import Video_detail from "../Video/Video_detail"
// Style
import { 
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  LoremIpsum,
  PanelHeader,
  PanelContainer,
  PanelLeft,
  PanelRight
} from '@sketchpixy/rubix';
//variable to hold the API Key
const API_KEY = 'AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc';
// import TAG
import { WithContext as ReactTags } from 'react-tag-input';
// Redux
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import CONSTANTS from '../../../constants';
import Script from 'react-load-script';

@connect((state) => state)
@withRouter
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      tags: [],
      selectedVideo: null,
      user: null,
      suggestions: ['Interpretame']
    };
  }

  componentWillMount() {
    var { dispatch } = this.props;
    var user = CONSTANTS.getUser();
    dispatch(actions.getPrets(user.im._id));
    this.setState({
        user: user
    })
  }

  componentDidMount() {
    var videoId = this.props.location.pathname.split('/').pop();
    var ref = (videoId != 'wizard') ? videoId : 'Steve Jobs Stanford'
    this.videoSearch(ref);
    var self = this;
    window.maxTime = this.state.user.im.time;
    window.reachMaxTime = function() {
      vex.dialog.alert('Sorry, ' + self.state.user.im.ref.username + ' Has alcanzado el límite de tiempo permitido');
    }
    window.setDuration = function(duration) {
        self.duration = duration;
    }
    window.setBlob = function(blob) {
        (blob) ? self.blob = blob : self.onEnd();
    }
  }

  // converts blob to base64
  blobToBase64(blob, cb) {
    var reader = new FileReader();
    reader.onload = function() {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      cb(base64);
    };
    reader.readAsDataURL(blob);
  };

  handleScriptLoad(status) {
    switch(status) {
      case 'Error':
        console.error('Error loading script');
        break;
    }
  }

  onEnd() {
    var $vex = vex.dialog.alert({ unsafeMessage: '<div> <img src="/imgs/app/loading.gif" width="40px"/> Espere mientras el archivo se sube a nuestros servidores... </div>'});
    var self = this;
    var { dispatch } = this.props;
    // Convert audio
    this.blobToBase64(this.blob, function(base64) { // encode
      var update = {blob: base64};
      // Send audio
      dispatch(actions.createPretAudio(self.state.user.im._id, update))
        .then(function() {
          // Create pret
          dispatch(actions.createPret(self.state.user.im._id, {
            video: self.state.selectedVideo,
            duration: self.duration,
            audio: self.props.audio.result[self.props.audio.result.length -1],
            tags: self.state.tags
          })).then(() => {
            $vex.close($vex.id);
            self.props.router.push('/prets');
          });
        }
      );
    })
  }

  // VIDEO
  videoSearch(searchTerm) {
    //youtube search
    YTSearch({key: API_KEY, term:searchTerm}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }

  changeVideo(video) {
    this.setState({
      selectedVideo: video
    });
  }

  // TAGS
  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  }
  
  handleAddition(tag) {
    let tags = this.state.tags;
    tags.push({
        id: tags.length + 1,
        text: tag.toLowerCase()
    });
    this.setState({tags: tags});
  }

  render() {
    const videoSearch = _.debounce( (term) => {this.videoSearch(term)},400)
  	return (<div>
      <PanelContainer>
        <h2 className="tip"> Mete alguna Tag </h2>
        <Col xs={12}>
            <ReactTags
                classNames={{
                    tag: 'margin_10 left-tag fg-hover-white bg-lightgray50 border-lightgray50 fg-text border-hover-darkgreen45 bg-hover-darkgreen45'
                }} 
                style={{textAlign: 'center'}}
                tags={this.state.tags}
                suggestions={this.state.suggestions}
                handleDelete={this.handleDelete.bind(this)}
                handleAddition={this.handleAddition.bind(this)}
            />
            <quote><i> (Pulsa intro para crear una tag) </i></quote>
        </Col>
    </PanelContainer>
    <PanelContainer>
        <h2 className="tip"> Selecciona un video </h2>
        <Col xs={12}>
            <Search_bar onSearchTermChange={videoSearch} />
            <Col md={7} className='video-detail-container'>
                <Video_detail video={this.state.selectedVideo}/>
            </Col>
            <Col md={5}>
                <Video_list
                onVideoSelect={selectedVideo => this.changeVideo(selectedVideo)}
                videos={this.state.videos}
                />
            </Col>
        </Col>
      </PanelContainer>
      <PanelContainer>
        <h2 className="tip"> Ponte los cascos y grábate dándolo todo </h2>
        <Col xs={12}>
          <div>
            <div className="form-horizontal">
              <div className="form-group">
                <div className="col-sm-6 control-label">
                    <span id="recording" className="text-danger hidden">
                        <strong>RECORDING</strong>
                    </span>&nbsp; 
                    <span id="time-display">00:00</span>
                  </div>
                <div className="col-sm-6">
                  <button id="record" className="btn btn-danger">RECORD</button>
                  <button id="cancel" className="btn btn-default hidden">CANCEL</button>
                </div>
                <div id='loading' style={{display: 'none'}}>
                  <img src='/imgs/app/loading.gif' width='40px'/> Creando audio...
                  <p id='percentage'></p>
                </div>
                <div id='warning' style={{display: 'none'}}>
                  <p style={{color: 'red'}}> Asegúrate de que has dado permisos al micrófono. Una vez lo hayas hecho, recarga la página </p>
                </div>
              </div>
            </div>
            <hr></hr>
            <h3>Recordings</h3>
            <div id="recording-list"></div>

            <Script
                url={"/js/audio/jquery.min.js"}
                onCreate={this.handleScriptLoad.bind(this,'Create')}
                onError={this.handleScriptLoad.bind(this,'Error')}
                onLoad={this.handleScriptLoad.bind(this,'Load')}
            />
            <Script
                url={"/js/audio/EncoderDemo.js"}
                onCreate={this.handleScriptLoad.bind(this,'Create')}
                onError={this.handleScriptLoad.bind(this,'Error')}
                onLoad={this.handleScriptLoad.bind(this,'Load')}
            />
          </div>
        </Col>
      </PanelContainer>
    </div>);
  }
}