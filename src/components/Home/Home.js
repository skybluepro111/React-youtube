import React from 'react';
import CONSTANTS from '../../../constants';
import { Row, Button } from '@sketchpixy/rubix';
import { Link } from 'react-router';
import Mainboard from './Mainboard';
import UserBanner from '../User/Banner';

export default class Social extends React.Component {

  componentWillMount() {
    this.state = { user: CONSTANTS.getUser() };
  }

  infoModal() {
    vex.dialog.alert({ unsafeMessage: `<h2>Bienvenid@, ${CONSTANTS.capitalize(this.state.user.im.ref.username)}</h2>` +
      '<br><div class="inline-home icon-fontello-chat-empty"></div> <b>Foro:</b> Comparte tu experiencia y reta a otros usuarios.' +
      '<br><div class="inline-home icon-ikons-home"></div> <b>Inicio: </b> Estate al tanto de las últimas actualizaciones.' +
      '<br><div class="inline-home icon-simple-line-icons-fire"></div> <b>Explora: </b> Descubre nuevos temas sobre los que interpretar.' +
      '<br><div class="inline-home icon-feather-monitor"></div> <b>Prets: </b> Crea, evalúa y gestiona tus interPRETaciones.' +
      '<br><div class="inline-home icon-ikons-speech-bubble-2"></div> <b>Expresiones: </b> Anota todas las expresiones que se te hacen cuesta arriba y pon a prueba tu memoria.' +
      '<br><div class="inline-home icon-simple-line-icons-users"></div> <b>Perfil: </b> Cuéntanos tu historia.' +
      '<br><div class="inline-home icon-fontello-question"></div> <b>Contacto: </b> Háblanos, aconséjanos, critícanos. Queremos oírte.' +
      '<br><div class="inline-home icon-fontello-info"></div> <b>Quiénes somos: </b> Por si tienes curiosidad.' +
      '<br><div class="inline-home icon-ikons-login"></div> <b>Cerrar sesión: </b> Vuelve a la página principal.',
    });
  }

  videoModal() {
    vex.dialog.alert({
      unsafeMessage: '<iframe width="100%" height="450" src="https://www.youtube.com/embed/7c0HF0_B9ik" frameborder="0" allowfullscreen></iframe>',
    });
  }

  componentDidMount() {
    $('#body, html').addClass('posts');
    if (this.state.user.im.prets.length >= 3 || this.state.user.im.time <= 1) vex.dialog.alert('No puedes crear más prets, elimina alguno.');
    if (this.state.user.tour) this.infoModal();
  }

  componentWillUnmount() {
    $('#body, html').removeClass('posts');
  }

  render() {
    const { dispatch } = this.props;
    const user = this.state.user;
    return (
      <Row className="social">
        <UserBanner
          user={this.state.user}
          infoModal={this.infoModal.bind(this)}
          videoModal={this.videoModal.bind(this)}
        />
        <Mainboard
          user={this.state.user}
          dispatch={dispatch}
        />
      </Row>
    );
  }
}
