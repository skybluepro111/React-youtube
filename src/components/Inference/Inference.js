import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import actions from '../../redux/actions';

import {
  Row,
  Col,
  Grid,
  Panel,
  Alert,
  PanelBody,
  PanelContainer,
  Button
} from '@sketchpixy/rubix';

@connect((state) => state)
export default class AllExps extends React.Component {

  componentWillMount() {
    var { dispatch } = this.props;
    dispatch(actions.getNews());
  }

  renderNews() {
    let { news, dispatch } = this.props;
    let { result } = news;
    var self = this;
    if (!result || !result.length) return null;
    return result.map((singleNew, index) => {
      return <div key={index}><Grid>
            <Col xs={6}>
                <p key={index}> <a href={singleNew.link} target='_blank'> {singleNew.title} </a></p>
            </Col>
                <Col xs={6}>
                <textarea style={{height: '100px', minHeight: '0'}} type='textarea' placeholder='Notas' id='notes' />
            </Col></Grid>
        </div>;
    });
  }

  render() {

    return (
      <PanelContainer style={{marginTop: '20px'}}>
        <Panel>
          <PanelBody style={{padding: '4%', paddingBottom: 25}}>
            <Grid>
              <Row>
                <h2> Inferencia del contexto</h2>
                <h3> Infiere todo lo que puedas a partir del título. Al acabar, haz click en el título para leer la noticia. </h3>
                <quote><i> *Las notas son temporales, no permanecen guardadas puesto que es un ejercicio de entrenamiento </i></quote><br></br>
                <quote><i> *Los titulares provienen de la página <a href='https://www.meneame.net/' target='_blank'> meneame </a></i></quote>
                <Col md={12}>
                  <h3>Tu lista de noticias:</h3>
                  {this.renderNews()}
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}
