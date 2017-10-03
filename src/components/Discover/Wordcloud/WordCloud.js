import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import actions from '../../../redux/actions';

/**
 * Import Elements
 */
import Cloud from './Cloud';
import Sidebar from './Sidebar';

// react-router
import { withRouter } from 'react-router';

// Constants
import CONSTANTS from '../../../../constants';

/**
 * Compose individual components
 */
@withRouter
@connect((state) => state)
export default class WordCloud extends Component {

  /**
   * Set initial state of component
   * @param  {Object} props Props of component
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedTopic: null
    };
    this.onSelectTopic = this.onSelectTopic.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(actions.getTags());
  }

  componentDidMount() {
    var value = this.props.location.pathname.split('/')[2];
    if (value) {
      this.setState({
        selectedTopic: CONSTANTS.searchInArray('label', value, this.props.tags.result)
      });      
    }
  }

  /**
   * Click handler
   * @param  {String} topic Whole topic object
   * @return {void}
   */
  onSelectTopic(topic) {
    let { dispatch } = this.props;
    var self = this;
    this.setState({
      videoList: topic.videos,
      selectedTopic: topic
    });
  }

  /**
   * Compose components
   * @return {ReactElement} [description]
   */
  render() {
    const {
      fontName,
      fontSizes,
      height,
      topics,
      width,
    } = this.props;

    if (topics.length === 0) {
      return (<span>No topics available.</span>);
    }

    return (
      <section className="wordcloud">
        <Cloud
          fontName={fontName}
          fontSizes={fontSizes}
          height={height}
          onSelectTopic={this.onSelectTopic}
          selectedTopic={this.state.selectedTopic}
          topics={topics}
          width={width}
        />
        <Sidebar
          topic={this.state.selectedTopic}
        />
      </section>
    );
  }
}

WordCloud.propTypes = {
  fontName: PropTypes.string,
  fontSizes: PropTypes.array,
  height: PropTypes.number,
  topics: PropTypes.array,
  width: PropTypes.number,
};

WordCloud.defaultProps = {
  fontName: 'Sans-Serif',
  fontSizes: [12, 20, 28, 36, 44, 52],
  height: 600,
  topics: [],
  width: 600,
};
