import React from 'react';
import { Link, withRouter } from 'react-router';
import {
  Tag,
  Row,
  Col,
  Grid,
  Panel,
  Button,
  PanelBody,
  PanelHeader,
  PanelLeft,
  PanelRight,
  LoremIpsum,
  InputGroup,
  FormControl,
  PanelContainer,
} from '@sketchpixy/rubix';

// Redux
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import Tags from './Tags';

import CONSTANTS from '../../../constants.js';

const forums = CONSTANTS.forums;

class MainItem extends React.Component {
  render() {
    return (<Col md={4} xs={12}>
      <PanelContainer className="home-section" controls={false}>
        <Panel>
          {this.props.to ? <Link to={this.props.to}>
            <PanelHeader>
              <div style={{ background: `url(${this.props.img})`, height: 250, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            </PanelHeader>
          </Link> : <a href={this.props.href} target="_blank">
            <PanelHeader>
              <div style={{ background: `url(${this.props.img})`, height: 250, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            </PanelHeader>
          </a>}
          <PanelBody>
            <Grid>
              <Row>
                <Col md={12}>
                  <h3 className="fg-black50">{this.props.title}</h3>
                  <Grid>
                    <Row>
                      <Col xs={12} collapseLeft collapseRight>
                        <div className="fg-darkgray50">
                          <small>{this.props.desc}</small>
                        </div>
                      </Col>
                    </Row>
                  </Grid>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    </Col>);
  }
}

export default class extends React.Component {
  render() {
    return (
      <PanelContainer plain collapseBottom controls={false}>
        <Panel horizontal>
          <PanelLeft>
            <Row style={{ margin: '0' }}>
              <MainItem
                to="/ranking"
                img="https://www.mbs.ac.uk/news/archive/wp-content/uploads/mba-ranking-image-v2-702x336.jpg"
                title="Ranking"
                desc="Aceptas el reto?"
              />
              <MainItem
                to="/infer"
                img="http://1.darkroom.shortlist.com/1200/3fbf1c9d56bd78928a3d871ea9b67c24:44f312ebd61d426b2d976e837d6f481b/sherlock-holmes-statue.jpg"
                title="Inferencia"
                desc="Deduce noticias a partir del titulo"
              />
              <MainItem
                href="https://forums.interpretame.com/"
                img="http://fundacioncompartir.org/sites/default/files/styles/articulo/public/inscripciones-abiertas-al-foro-la-construccion-de-paz_retos-de-la-educacion.jpg?itok=XvA1C-Xk"
                title="Foro"
                desc="Únete al club de los intérpretes"
              />
              <MainItem
                to="/discover"
                img="https://ichef.bbci.co.uk/news/270/media/images/76027000/jpg/_76027398_thinkstock640x360.jpg"
                title="Descubre"
                desc="Mira qué es lo más interpretado"
              />
              <MainItem
                href="https://www.interpretame.com/wiki"
                img="http://municipalmagazine.com/wp-content/uploads/2017/04/jayankondam-wiki.png"
                title="Wiki"
                desc="Déjanos ayudarte"
              />
              <MainItem
                href="https://www.interpretame.com/wiki/tutorial"
                img="http://www.mba-lyon.fr/static/mba/contenu/actualites/Une-du-site/Picto-audioguide-garcon-fille_900px.jpg"
                title="Audio guía"
                desc="Déjanos guiarte"
              />
              <MainItem
                href="https://www.interpretame.com/slack"
                img="https://blog.trackduck.com/wp-content/uploads/2014/09/sl.jpg"
                title="Slack"
                desc="Únete a nuestro slack"
              />
            </Row>
          </PanelLeft>
          <PanelRight className="hidden-xs" style={{ width: 350 }}>
            <Tags dispatch={this.props.dispatch} />
          </PanelRight>
        </Panel>
      </PanelContainer>
    );
  }
}
