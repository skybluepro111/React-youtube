import React from 'react';
import ReactDOM from 'react-dom'
import ReactAudioPlayer from 'react-audio-player';
import Video_detail from "../Video/Video_detail";
import { withRouter } from 'react-router';
import CONSTANTS from '../../../constants.js';
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
  OverlayTrigger,
  Popover
} from '@sketchpixy/rubix';

var SelectMap = [
    {name:'voc', title: 'Vocalización'},
    {name:'ent', title: 'Entonación'},
    {name:'ton', title: 'Tono'},
    {name:'flu', title: 'Fluidez'},
    {name:'exp', title: 'Expresión'},
    {name:'coh', title: 'Coherencia'},
    {name:'gra', title: 'Gramática'},
    {name:'con', title: 'Convicción'},
    {name:'sim', title: 'Simlitud'},
    {name:'com', title: 'Completado'} 
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
      this.state = {
          mark: 0
      }
      this.marks = {};
  }
  componentWillMount() {
    if (!this.pret) this.props.router.push('/prets');
    for (var i = 0; i < SelectMap.length;i++) {
        this.marks[SelectMap[i].name] = 1;
    }
    this.notes = null;
    this.state = { user: CONSTANTS.getUser() };
  }
  checkFinal() {
      var value = 0;
      var finalLength = SelectMap.length;
      for(var i = 0; i < finalLength;i++) {
          var aux = this.marks[SelectMap[i].name];
          if (aux) value += aux;
      }
      this.setState({
          mark: value/finalLength
      });
  }
  selectHandler(value) {
      var result = Number(ReactDOM.findDOMNode(this.refs[value]).value);
      this.marks[value] = result;
      this.checkFinal();
  }
  renderDrop(index) {
      var value = SelectMap[index];
      var title = value.title;
      var kpi = value.name;
      var id = "dropdownselect-" + kpi;
      return (
        <FormGroup className="checkerDrop" controlId={id}>
          <ControlLabel>{title}</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.selectHandler.bind(this, kpi)} ref={kpi}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
          </FormControl>
        </FormGroup>
      )
  }
  finish() {
    var { dispatch,  pret, router } = this.props;
    var {user} = this.state;
    this.pret.eval = this.state.eval;
    this.pret.mark = this.state.mark;
    this.pret.feedback.completed = true;
    this.pret.feedbacks.push({
      eval:this.state.eval,
      mark: this.state.mark,
      author: {
        _id: user.im._id,
        name: user.im.ref.username,
        pic: user.info.picture
      },
      completed: true
    });
    dispatch(actions.updatePret(this.pret));
    this.props.router.push('/prets');
  }
  componentDidMount() {
    $('#section').addClass('wizard');
  }
  componentWillUnmount() {
    $('#section').removeClass('wizard');
  }
  blur(el) {
    this.setState({
      eval: {
        voc: ReactDOM.findDOMNode(this.voc).value,
        ent: ReactDOM.findDOMNode(this.ent).value,
        vol: ReactDOM.findDOMNode(this.vol).value,
        int: ReactDOM.findDOMNode(this.int).value,
        rel: ReactDOM.findDOMNode(this.rel).value,
        paus_l: ReactDOM.findDOMNode(this.paus_l).value,
        paus_c: ReactDOM.findDOMNode(this.paus_c).value,
        ina: ReactDOM.findDOMNode(this.ina).value,
        aut: ReactDOM.findDOMNode(this.aut).value,
        exp: ReactDOM.findDOMNode(this.exp).value,
        coh: ReactDOM.findDOMNode(this.coh).value,
        gra: ReactDOM.findDOMNode(this.gra).value,
        cal: ReactDOM.findDOMNode(this.cal).value,
        sin: ReactDOM.findDOMNode(this.sin).value,
        con: ReactDOM.findDOMNode(this.con).value,
        fal: ReactDOM.findDOMNode(this.fal).value,
        adi: ReactDOM.findDOMNode(this.adi).value,
        sup: ReactDOM.findDOMNode(this.sup).value,

        notes: ReactDOM.findDOMNode(this.notes).value
      }
    });
  }
  render() {
    return (
      <PanelContainer noOverflow>
        {this.pret ? <Panel horizontal>
          <Row>
            <PanelHeader className='bg-green fg-white'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3> Evalúa tu interpretación</h3>
                  </Col>
                </Row>
              </Grid>
            </PanelHeader>
            <Grid>
              <Row style={{padding: '5%'}}>
                <Col md={6}>
                      <Video_detail video={{
                        id: {
                          videoId: this.pret.video.id
                        },
                        snippet: {
                          title: this.pret.video.title,
                          description: this.pret.video.desc
                        }
                      }}/>
                      <div id="audioPlayer">
                          <ReactAudioPlayer
                              src={'/audios/' + this.pret.audio}
                              type="audio/mpeg"
                          />
                      </div>
                </Col>
                <Col md={6}>
                  <textarea type='textarea' placeholder='Notas' id='notes' ref={(input) => this.notes = input} autoFocus onBlur={this.blur.bind(this, 'notes')}/>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form>
                    <FormGroup>
                        <Col sm={4}>
                        <h2> Pres. Formal </h2>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> racias (gracias).</Popover>}>
                          <FormControl type='text' placeholder='Vocalización' ref={(input) => this.voc = input} onBlur={this.blur.bind(this, 'voc')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> monótona, sin convicción...</Popover>}>
                          <FormControl type='text' placeholder='Entonación' ref={(input) => this.ent = input} onBlur={this.blur.bind(this, 'ent')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> demasiado alto.</Popover>}>
                          <FormControl type='text' placeholder='Volumen' ref={(input) => this.vol = input} onBlur={this.blur.bind(this, 'vol')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> ¡Ay, no!</Popover>}>
                          <FormControl type='text' placeholder='Interjecciones' ref={(input) => this.int = input} onBlur={this.blur.bind(this, 'int')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> Muletillas (mmmm, ehhhh...)</Popover>}>
                          <FormControl type='text' placeholder='Rellenos' ref={(input) => this.rel = input} onBlur={this.blur.bind(this, 'rel')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> ¿Cuántos segundos?</Popover>}>
                          <FormControl type='text' placeholder='Pausa larga' ref={(input) => this.paus_l = input} onBlur={this.blur.bind(this, 'paus_l')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> ¿Cuántos segundos?</Popover>}>
                          <FormControl type='text' placeholder='Pausa corta' ref={(input) => this.paus_c = input} onBlur={this.blur.bind(this, 'paus_c')}/>
                        </OverlayTrigger>

                        </Col>
                        <Col sm={4}>
                        <h2> Expresión </h2>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> "Y eso no ocurrirá hasta que..."</Popover>}>
                          <FormControl type='text' placeholder='Frase inacabada' ref={(input) => this.ina = input} onBlur={this.blur.bind(this, 'ina')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> "Los ladro... los ladrones son... los robos son unos de..."</Popover>}>
                          <FormControl type='text' placeholder='Autocorrección' ref={(input) => this.aut = input} onBlur={this.blur.bind(this, 'aut')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> "La mayor idea de esta idea es la que queremos."</Popover>}>
                          <FormControl type='text' placeholder='Expresión confusa' ref={(input) => this.exp = input} onBlur={this.blur.bind(this, 'exp')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> "La policía les denunció. [...] La policía no les denunció."</Popover>}>
                          <FormControl type='text' placeholder='Coherencia' ref={(input) => this.coh = input} onBlur={this.blur.bind(this, 'coh')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>Errores gramaticales</strong> (p. ej.: forma verbal incorrecta).</Popover>}>
                          <FormControl type='text' placeholder='Gramática' ref={(input) => this.gra = input} onBlur={this.blur.bind(this, 'gra')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'><strong>P. ej.: </strong> Robatorio (por robo) o balance (por equilibrio).</Popover>}>
                          <FormControl type='text' placeholder='Calcos' ref={(input) => this.cal = input} onBlur={this.blur.bind(this, 'cal')}/>
                        </OverlayTrigger>

                        </Col>
                        <Col sm={4}>
                        <h2> Contenido </h2>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'> Lo que se dice es incomprensible.</Popover>}>
                          <FormControl type='text' placeholder='Sin sentido' ref={(input) => this.sin = input} onBlur={this.blur.bind(this, 'sin')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'> Lo que se dice es lo contrario que el original.</Popover>}>
                          <FormControl type='text' placeholder='Contrasentido' ref={(input) => this.con = input} onBlur={this.blur.bind(this, 'con')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'> Lo que se dice es distinto al original.</Popover>}>
                          <FormControl type='text' placeholder='Falso sentido' ref={(input) => this.fal = input} onBlur={this.blur.bind(this, 'fal')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'> Se añade información que no es neutral ni aporta contexto.</Popover>}>
                          <FormControl type='text' placeholder='Adición inapropiada' ref={(input) => this.adi = input} onBlur={this.blur.bind(this, 'adi')}/>
                        </OverlayTrigger>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id='popover-bottom-2'> Se omite una idea clave (las ideas secundarias, los ejemplos, las digresiones, etc. pueden omitirse).</Popover>}>
                          <FormControl type='text' placeholder='Supresión inapropiada' ref={(input) => this.sup = input} onBlur={this.blur.bind(this, 'sup')}/>
                        </OverlayTrigger>

                        </Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col xs={8}>
                  <Form>
                      {this.renderDrop(0)}
                      {this.renderDrop(1)}
                      {this.renderDrop(2)}
                      {this.renderDrop(3)}
                      {this.renderDrop(4)}
                      {this.renderDrop(5)}
                      {this.renderDrop(6)}
                      {this.renderDrop(7)}
                      {this.renderDrop(8)}
                      {this.renderDrop(9)}
                  </Form>
                </Col>
                <Col sm={4} style={{color:'#7CD5BA'}}>
                  <p style={{display: 'inline-block'}}>Nota Final:</p>
                  <h1 style={{display: 'inline-block', margin: '20px', fontSize: '1000%'}}>{this.state.mark}</h1>
                  /5
                </Col>
              </Row>
            </Grid>
            <PanelFooter className='bg-darkgreen45 text-right'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <br/>
                    <div style={{padding: '0 2%'}}>
                      <Button outlined bsStyle='lightgreen'>Cancelar</Button>{' '}
                      <Button outlined bsStyle='lightgreen' onClick={this.finish.bind(this)}>Finalizar</Button>
                    </div>
                    <br/>
                  </Col>
                </Row>
              </Grid>
            </PanelFooter>
          </Row>
        </Panel> : null }
      </PanelContainer>
    );
  }
}