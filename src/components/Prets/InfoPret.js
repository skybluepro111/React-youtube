import React from 'react';
import ReactDOM from 'react-dom'
import ReactAudioPlayer from 'react-audio-player';
import Video_detail from "../Video/Video_detail";
import { withRouter } from 'react-router';
import {
  Row,
  Col,
  Nav,
  Grid,
  Icon,
  Form,
  Panel,
  Radio,
  Button,
  MenuItem,
  Checkbox,
  HelpBlock,
  PanelBody,
  FormGroup,
  InputGroup,
  SplitButton,
  PanelHeader,
  ButtonGroup,
  FormControl,
  PanelLeft,
  PanelRight,
  PanelFooter,
  ControlLabel,
  DropdownButton,
  PanelContainer,
  Table
} from '@sketchpixy/rubix';

var SelectMap = [
  {title:'Vocalización', name: 'voc'}, 
  {title:'Entonación', name: 'ent'}, 
  {title:'Volumen', name: 'vol'}, 
  {title:'Interjecciones', name: 'int'}, 
  {title:'Rellenos', name: 'rel'}, 
  {title:'Pausa Larga',name: 'paus_l'}, 
  {title:'Pausa Corta',name: 'paus_c'}, 
  {title:'Frase Inacabada', name: 'ina'}, 
  {title:'Autocorrección', name: 'aut'}, 
  {title:'Expresión Confusa', name: 'exp'}, 
  {title:'Coherencia', name: 'coh'}, 
  {title:'Gramática', name: 'gra'}, 
  {title:'Calcos', name: 'cal'}, 
  {title:'Sin sentido', name: 'sin'}, 
  {title:'Contrasentido', name: 'con'}, 
  {title:'Falso Sentido', name: 'fal'}, 
  {title:'Adición inapropiada', name: 'adi'}, 
  {title:'Supresión inapropiada', name: 'sup'}
];

// Redux
import { connect } from 'react-redux';
import actions from '../../redux/actions';

@withRouter
@connect((state) => state)
export default class extends React.Component {

  constructor(props) {
      super(props);
      var index = Number(this.props.location.pathname.split('/').pop());
      this.pret = (!this.props.prets.result) ? null : this.props.prets.result[index]
  }
  componentWillMount() {
    if (!this.pret) this.props.router.push('/prets');
  }
  componentDidMount() {
    $('#section').addClass('wizard');
  }
  componentWillUnmount() {
    $('#section').removeClass('wizard');
  }
  renderEv() {
    return (
      <tr>
        <td>Evaluación</td>
        <td>
          {SelectMap.map((attr, i) => {
            if (this.pret.eval[attr.name] && this.pret.eval[attr.name] !== '') return <div key={attr.title}>{attr.title} : {this.pret.eval[attr.name]}<br/></div>
          })}
        </td>
      </tr>
    )
  }
  render() {
    return (
      <div>
        {this.pret ? <Row>
          <Col sm={10} collapseRight>
            <PanelContainer>
              <Panel>
                <PanelBody>
                  <Grid>
                    <Row>
                      <Col xs={12}>
                        <h4 style={{marginTop: 0}}> Resumen </h4>
                        <Table bordered striped condensed>
                          <thead>
                            <tr>
                              <th>Key</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Video</td>
                              <td><a href={'https://www.youtube.com/watch?v=' + this.pret.video.id}>{'https://www.youtube.com/watch?v=' + this.pret.video.id}</a></td>
                            </tr>
                            <tr>
                              <td>Puntuación</td>
                              <td>{this.pret.mark ? this.pret.mark : 'n/a'}</td>
                            </tr>
                            <tr>
                              <td>Notas</td>
                              <td>{this.pret.eval && this.pret.eval.notes ? this.pret.eval.notes.replace(/↵/g, '<br>') : 'n/a'}</td>
                            </tr>
                            <tr>
                              <td>Tags</td>
                              <td>{this.pret.tags.toString()}</td>
                            </tr>
                            {this.pret.eval ? this.renderEv() : null}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelContainer>
          </Col>
        </Row> : null }
     </div>
    );
  }
}