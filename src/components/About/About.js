import React from 'react';
import {
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  LoremIpsum,
  PanelHeader,
  PanelContainer,
  PanelLeft,
  PanelRight,
} from '@sketchpixy/rubix';
import { Link } from 'react-router';
import { Avatar } from '../User/Avatar';

export default class extends React.Component {
  render() {
    return (<PanelContainer>
      <Panel>
        <Col xs={4} style={{ textAlign: 'center' }}>
          <div>
            <img src="/imgs/logo.png" style={{ height: '42px' }} />
            <hr />
            <Link to="/form"> Contact form </Link>
            <hr />
              Email: <a href="mailto:interpretame.contact@gmail.com" target="_top"> interpretame.contact@gmail.com </a>
            <hr />
            <a href="https://twitter.com/interpretamecom"> @interpretamecom </a>
            <hr />
              Facebook: <a href="https://www.facebook.com/interpretame"> interpretame </a>
          </div>
        </Col>
        <Col xs={8} style={{ textAlign: 'center' }}>
          <Row>
            <Col xs={12} style={{ textAlign: 'center' }}>
              <h1>Fundadores</h1>
              <div className="about_row" >
                <a href="https://es.linkedin.com/in/alba-collado-cascales-775bbb67" target="_blank"><Avatar dimension="60" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAALEAAAAJDA0MDJlZTllLTkxODItNDlkYi1hZWNiLWJiZDhlNDA1ZGI0Mg.jpg">Alba Collado</Avatar></a>
                <a href="http://ayxos.github.io/" target="_blank"><Avatar dimension="60" src="https://media.licdn.com/media/AAEAAQAAAAAAAAcbAAAAJGI2ZWNjMmEwLTY5MDEtNGY4ZS04MGY3LTNjYzUwNTIzMjZhYQ.jpg">Marco A. Pajares</Avatar></a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} style={{ textAlign: 'center' }}>
              <h1>Colaboradores</h1>
              <div className="about_row" >
                <Avatar dimension="60" src="https://media.licdn.com/media/AAEAAQAAAAAAAAl7AAAAJGEyZjA2MGU4LTVjMjQtNDZkZS1iZjljLWVkMjQ0ODU3MzZkNg.jpg">Aitor Torres</Avatar>
                <Avatar dimension="60" src="https://media.licdn.com/media/AAEAAQAAAAAAAAlSAAAAJDY2ZjI2MDkzLTJmZjYtNGVmNC1hN2U5LTdlMjhmYzI2MTRlNg.jpg">Andrés J. Piñero</Avatar>
                <Avatar dimension="60" src="/imgs/app/avatars/bea.png">Beatriz Sevilla</Avatar>
                <Avatar dimension="60" src="https://media.licdn.com/media/AAEAAQAAAAAAAAROAAAAJDk4MTIzYzZjLTE5MWEtNDNiMC04NWMyLTQyM2E1M2Q1NjMyOQ.jpg">Nicolás Panzuto</Avatar>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} style={{ textAlign: 'center' }}>
              <h1>Agradecimientos</h1>
              <div className="about_row" >
                <Avatar dimension="60" src="/imgs/app/avatars/erica.png">Erika Dato</Avatar>
                <Avatar dimension="60" src="https://media.licdn.com/media/AAEAAQAAAAAAAAUpAAAAJGUyNzc3ZWEwLTMyYzUtNDhhNC1hZGM3LTlmNGM4MGFjY2I1Mw.jpg">Alex Berry</Avatar>
                <Avatar dimension="60" src="/imgs/app/avatars/Arttu.png">Arttu Kettula</Avatar>
                <Avatar dimension="60" src="/imgs/app/avatars/ana.jpeg">Ana Pérez</Avatar>
                <Avatar dimension="60" src="/imgs/app/avatars/adam.png">Adam Cottrell</Avatar>
              </div>
            </Col>
          </Row>
        </Col>
      </Panel>
    </PanelContainer>);
  }
}
