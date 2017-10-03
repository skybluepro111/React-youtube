import React from 'react';
import { Link, withRouter } from 'react-router';
import { Button } from '@sketchpixy/rubix';

var text = {
  choose: 'Elige un tema de la nube para ver más detalles',
  info: 'Información',
  subInfo: 'Información del tema',
  mentions: 'Menciones totales:',
  infoVideo: 'Haz click en el link para crear tu interpretación'
};

/**
 * Renders Sidebar as functional component
 * @param  {Object} props Topic to display
 * @return {ReactElement}
 */
@withRouter
export default class extends React.Component {

  render() {
    const { topic } = this.props;
    if (topic === null) {
      return (
        <div className="wordcloud__container_sidebar">
          <div className="wordcloud__sidebar">
            <h1 className="wordcloud__sidebar_title">{text.info}</h1>
            <p className="wordcloud__description">
              {text.choose}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="wordcloud__container_sidebar">
        <div className="wordcloud__sidebar">
          <h1 className="wordcloud__sidebar_title">{text.subInfo} "{topic.label}"</h1>
          <h1 className="wordcloud__sidebar_title">{text.infoVideo}</h1>
          <table className="wordcloud__sidebar_metatable">
            <tbody>
              <tr className="wordcloud__sidebar_metatable_row">
                <td className="wordcloud__sidebar_metatable_label">{text.mentions} </td>
                <td className="wordcloud__sidebar_metatable_value">{topic.volume || '0'}</td>
              </tr>
              {topic.videos.map((video, index) => {
                return <tr key={index} className="wordcloud__sidebar_metatable_row">
                  <td className="wordcloud__sidebar_metatable_value">
                    <iframe width="140" height="105" src={"https://www.youtube.com/embed/"+ video}></iframe>
                  </td>
                  <td>
                    <Link to={'/wizard/' + video}>
                      <Button className='icon-simple-line-icons-earphones-alt' style={{background: '#FA7252', margin: '0 5px'}} title='Intentar'></Button>
                    </Link>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}