import React from 'react';
import Video_list_item from './Video_list_item';

const Video_list = (props) => {
  const videoItems = props.videos.map(video => (<Video_list_item
    onVideoSelect={props.onVideoSelect}
    key={video.etag}
    video={video}
  />));

  return (
    <ul className="col-md-12 list-group video-list">
      {videoItems}
    </ul>
  );
};

export default Video_list;
