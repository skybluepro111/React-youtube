import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  enrichTopics,
} from '../../../modules/dataprocessor';

const text = {
  loading: 'Cargando',
  space: 'Algunos topics no se muestran por el espacio disponible',
};

import d3Cloud from 'd3-cloud';

/**
 * Render the cloud using D3. Not stateless, because async rendering of d3-cloud
 */
class Cloud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cloudDimensions: [],
      isProcessing: true,
    };
  }

  /**
   * Process data. Add range of volumes and fontSizes
   * @return {void} Will call setState
   */
  componentDidMount() {
    if (this.props.topics.length === 0) {
      return;
    }
    const {
      fontName,
      fontSizes,
      height,
      topics,
      width,
    } = this.props;

    /** Start calculation of cloud */
    d3Cloud()
      .size([width, height])
      .words(enrichTopics(topics, fontSizes).entities)
      .padding(10)
      .font(fontName)
      .text(d => d.label)
      .fontSize((d) => {
        if (!d.fontSize) d.fontSize = 36;
        return d.fontSize;
      })
      .random(() => 0.5)
      .rotate(() => 0)
      .on('end', (cloudDimensions) => { this.setState({ cloudDimensions, isProcessing: false }); })
      .start();
  }

  /**
   * Render cloud as svg
   * @return {ReactElement} [description]
   */
  render() {
    const {
      fontName,
      height,
      onSelectTopic,
      selectedTopic,
      topics,
      width,
    } = this.props;

    if (this.state.isProcessing) {
      return (
        <div className="wordcloud__container_cloud">
          <span >{text.loading}</span>
        </div>
      );
    }

    /**
     * Build class names to highlight the selected component
     * @param  {Object} item  Topic item
     * @return {String}       Class names
     */
    const getClassNames = (item) => {
      let classNames = 'wordcloud__cloud_label';
      switch (item.color) {
        case 1:
          classNames += ' wordcloud__cloud_label--color-green';
          break;
        case 2:
          classNames += ' wordcloud__cloud_label--color-red';
          break;
        case 3:
          classNames += ' wordcloud__cloud_label--color-grey';
          break;
      }

      if (
        selectedTopic !== null
        && selectedTopic.hasOwnProperty('id')
        && selectedTopic.id === item.id
      ) {
        classNames += ' wordcloud__cloud_label--is-active';
      }
      return classNames;
    };

    return (
      <div className="wordcloud__container_cloud">
        <div className="wordcloud__cloud">
          <svg width={width} height={height}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
              {this.state.cloudDimensions.map((item, index) => (<text
                key={item._id}
                className={getClassNames(item)}
                onClick={() => onSelectTopic(item)}
                style={{
                  fontSize: item.size,
                  fontFamily: fontName,
                }}
                textAnchor="middle"
                transform={`translate(${item.x} , ${item.y} )`}
              >{item.text}</text>),
              )}
            </g>
          </svg>
        </div>
        {topics.length > this.state.cloudDimensions.length ? <p className="worcloud__hint">{text.space}</p> : ''}
      </div>
    );
  }
}

Cloud.propTypes = {
  fontName: PropTypes.string.isRequired,
  fontSizes: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  onSelectTopic: PropTypes.func.isRequired,
  selectedTopic: PropTypes.object,
  topics: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
};

Cloud.defaultProps = {
  selectedTopic: null,
};

export default Cloud;
