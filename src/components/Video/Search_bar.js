import React, { Component } from 'react';

export default class Search_bar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: 'interpreting' };
  }
  render() {
    return (
      <div className="search-bar">
        <label>Search Video:&nbsp;&nbsp;</label>
        <input
          className="search-term"
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}
