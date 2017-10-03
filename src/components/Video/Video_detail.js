import React from 'react';

const Video_detail = ({ video }) => {
  // check before we render video into Video_detail
  if (!video) {
    return (<div>Loading...</div>);
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-detail col-md-12">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url} />
      </div>

      <div className="details">
        <div className="video-title">{video.snippet.title}</div>
        <div className="video-desc">{video.snippet.description}</div>
      </div>
    </div>
  );
};

export default Video_detail;
