/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';
const URL = 'https://interpretame.com'

const {
  FacebookShareButton,
//   GooglePlusShareButton,
//   LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
//   VKShareButton,
//   OKShareButton,
  // TelegramShareButton,
  // WhatsappShareButton,
  RedditShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
//   GooglePlusShareCount,
//   LinkedinShareCount,
  PinterestShareCount,
//   VKShareCount,
//   OKShareCount,
  RedditShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
// const GooglePlusIcon = generateShareIcon('google');
// const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
// const VKIcon = generateShareIcon('vk');
// const OKIcon = generateShareIcon('ok');
// const TelegramIcon = generateShareIcon('telegram');
// const WhatsappIcon = generateShareIcon('whatsapp');
const RedditIcon = generateShareIcon('reddit');

class Share extends Component {
  render() {
    const shareUrl = URL + this.props.url;
    const title = 'Doblame';

    return (
      <div className="social_container">
        <div className="social_network">
          <FacebookShareButton
            url={shareUrl}
            title={title + ' by ' + this.props.author}
            picture={URL + '/imgs/app/rank/doblame.png'}
            description={this.props.desc}
            className="social_share_button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <FacebookShareCount
            url={shareUrl}
            className="social_share_count">
            {count => count}
          </FacebookShareCount>
        </div>

        <div className="social_network">
          <TwitterShareButton
            url={shareUrl}
            title={title + ' by ' + this.props.author}
            via='dobla_me'
            hashtags={['doblame']}
            className="social_share_button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>

          <div className="social_share_count">
            &nbsp;
          </div>
        </div>

        <div className="social_network">
          <PinterestShareButton
            url={String(window.location)}
            windowWidth={660}
            windowHeight={460}
            media={URL + '/imgs/app/rank/doblame.png'}
            description={this.props.desc}
            className="social_share_button">
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <PinterestShareCount url={shareUrl}
            className="social_share_count" />
        </div>

        <div className="social_network">
          <RedditShareButton
            url={shareUrl}
            title={title + ' by ' + this.props.author}
            windowWidth={660}
            windowHeight={460}
            className="social_share_button">
            <RedditIcon
              size={32}
              round />
          </RedditShareButton>

          <RedditShareCount url={shareUrl}
            className="social_share_count" />
        </div>

        {/*<div className="social_network">
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="social_share_button">
            <TelegramIcon size={32} round />
          </TelegramShareButton>

          <div className="social_share_count">
            &nbsp;
          </div>
        </div>*/}

        {/*<div className="social_network">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="social_share_button">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <div className="social_share_count">
            &nbsp;
          </div>
        </div>*/}

        {/*<div className="social_network">
          <GooglePlusShareButton
            url={shareUrl}
            className="social_share_button">
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>

          <GooglePlusShareCount
            url={shareUrl}
            className="social_share_count">
            {count => count}
          </GooglePlusShareCount>
        </div>*/}

        {/*<div className="social_network">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
            className="social_share_button">
            <LinkedinIcon
              size={32}
              round />
          </LinkedinShareButton>

          <LinkedinShareCount
            url={shareUrl}
            className="social_share_count">
            {count => count}
          </LinkedinShareCount>
        </div>*/}
      </div>
    );
  }
}

export default Share;