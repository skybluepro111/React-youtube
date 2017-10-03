import React from 'react';

export class Avatar extends React.Component {
  render() {
    const dimension = this.props.dimension || 40;
    return (
      <div className="inbox-avatar">
        <img src={this.props.src} width={dimension} height={dimension} />
        <div className="inbox-avatar-name">
          <div className="fg-darkgrayishblue75" style={{ top: 0 }}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
