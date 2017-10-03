import React from 'react'
import {Link} from 'react-router'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import Share from './share'
import actions from '../../redux/actions'
import withUserAgent from 'react-useragent'
import ReactStars from 'react-stars'

import { PanelContainer } from '@sketchpixy/rubix';

const youtubeUrl = 'https://www.youtube.com/embed/';
var audio;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/* Steps to verify vote 
* - check if user already voted
* - if has voted check if is pos or neg
* - if is same vote again, do nothing
* - if not, replace existing vote ON BACKEND
*/

// Since this component is simple and static, there's no parent container for it.
class Item extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      oldVote: null
    }
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.mute();
  }

  _onPlay(event) {
    if (!this.opts.mobile) {
      if (!audio) {
        audio = document.createElement('audio');
        audio.src = '/audios/' + this.opts.audio
      }
      audio.play();
    }
  }

  _onPause(event) {
    audio.pause();
  }

  _onEnd(event) {
    audio.currentTime = 0;
  }

  componentWillUnmount() {
    if (audio) {
      audio.pause();
      audio = null;
    }
  }

  isUserOldVote(props) {
    var selectedProps = props ? props : this.props;
    var rank = selectedProps.item.rank
    var result = false;
    if (!rank) return result;
    if (!selectedProps.user) return result;
    var userId = selectedProps.user.id;
    for(var i = 0; i < rank.length; i++){
      if(rank[i].user === userId) {
        result = rank[i].pos ? 'pos' : 'neg';
        break;
      }
    };
    return result;
  }

  _rank(type) {
    if (!this.props.user 
    || this.props.user.id == this.props.item.author._id ) return;
    this.props.dispatch(actions.rankPret({
      pret: this.props.item, 
      rank : {
        user: this.props.user.id, 
        pos: type
      }
    }));
  }

  getVotes(posVotes) {
    var rank = this.props.item.rank
    if (!rank) return 0;
    var pos = 0;
    var neg =  0;
    for(var i = 0; i < rank.length; i++) {
      if (rank[i].pos) pos++;
      if (!rank[i].pos) neg++; 
    };
    return posVotes ? pos : neg;
  }

  componentDidMount() {
    this.setState({
      oldVote: this.props.user ? this.isUserOldVote() : this.state.newVote
    });
  }

  componentWillUpdate(nextProps, nextState) {
    var oldVote = this.isUserOldVote(nextProps);
    if (oldVote != this.state.oldVote) nextState.oldVote = oldVote;
  }

  render () {
    var item = this.props.item
    const opts = {
      width: '100%',
      height: this.props.full ? '320px' : 'auto',
      mobile: this.props.ua.mobile,
      audio: item.audio,
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        start: item.start,
        end: item.end
      }
    };
    var col = this.props.full ? 'col-md-12' : 'col-md-6';
    var subCol = this.props.full ? 'col-md-6' : 'col-md-12';
    if (!this.props.user) console.log('no user')
    return (
    item.publish == true ?  
    <PanelContainer>
      <div className='row'>
        <div className={col}>
          {this.props.full ? <YouTube
            videoId={item.video.id}
            opts={opts}
            onReady={this._onReady}
            onPlay={this._onPlay}
            onPause={this._onPause}
            onEnd={this._onEnd}
          /> : <Link to={'/item/' + item._id}>
            <div className='thumb' style={{background: 'url('+ item.video.thumb + ') 0% 50% / cover'}}>
              <div className='vail'>
                <img src='http://www.pngmart.com/files/3/YouTube-Play-Button-PNG-Image.png' width='45' className='play' style={{marginTop: '40px'}}/>
              </div>
            </div>
          </Link>}
          {this.props.ua.mobile ? <audio controls> <source src={'/audios/' + item.audio} type="audio/mpeg"/></audio> : null}
           <Share url={'/item/' + item._id} desc={item.video.title} author={item.author.name}/> 
        </div>
        <div className={col + ' row'}>
          <div className={subCol} style={{textAlign: 'center'}}>
            <div className='legend'> Published {item.date} by <Link to={'/user/' + item.author._id}>@{item.author.name} </Link></div>
            <h3><Link to={'/item/' + item._id}>{item.video.title}</Link> </h3>
            <div className='row'>
              {item.tags && item.tags.map(function (item, index) {
                return (<span className='tagItem' key={index}> {item.text} </span>)
              })}
            </div>
          </div>
          <div className={subCol + ' row'} style={{margin: '10px 0px'}}>
              <ReactStars
                value={item.mark}
                size={24}
                onClick={this.onClick.bind(this)}
              />
              <Link to={`/pret/eval/${this.props.index}`}> Evaluar </Link>
              {item.comments && item.comments.length ? <div className='legend'> <Link to={'/item/' + item._id}> Say something: {item.comments.length} </Link></div> : null}
          </div>
        </div>
      </div>
    </PanelContainer>
    : <div></div>
    )
  }
};

Item.propTypes = {
  item: PropTypes.object.isRequired
}

export default withUserAgent(Item)
