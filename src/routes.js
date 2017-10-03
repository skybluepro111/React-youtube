import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';
import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';
import CONSTANTS from '../constants';

/* Common Components */
import Nav from './components/Nav/Nav';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

/* Pages */
import Home from './components/Home/Home';
import Admin from './components/Admin/Ime';
import AllPrets from './components/Prets/AllPrets';
import NewPret from './components/Prets/NewPret';
import ExcersisesComponent from './components/Expressions/Exercises';
import AllExps from './components/Expressions/AllExps';
import EvalPret from './components/Prets/EvalPret';
import InfoPret from './components/Prets/InfoPret';
import Discover from './components/Discover/Discover';
import About from './components/About/About';
import Infer from './components/Inference/Inference';
import Ranking from './components/Ranking/Ranking';
// extra
import IframeClass from './components/iframe';

class App extends React.Component {
  state = {
    toggle: false
  };

  sidebarToggle() {
    this.setState({
      toggle: this.state.toggle ? false : true
    })
  }

  render() {
    return (
      <MainContainer {...this.props}>
        <Nav/>
        <Sidebar compress={this.state.toggle}/>
        <div id='body' className={this.state.toggle ? 'compress' : ''}>
          <div className='sidebar-toggle' onClick={this.sidebarToggle.bind(this)}>
            <img src='https://image.flaticon.com/icons/png/512/56/56763.png' width='15px'/>
          </div>
          <Grid>
            <Row>
              <Col id='section' xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer compress={this.state.toggle}/>
      </MainContainer>
    );
  }
}

function checkAccount(nextState, replace, callback) {
  var user = CONSTANTS.getUser();
  if (!user || !user.im || !user.im.prets || user.im.prets.length >= 3 || user.im.time <= 1) replace(`/dashboard`);
  callback();
}

function checkAdmin(nextState, replace, callback) {
  var user = CONSTANTS.getUser();
  if (user.im.role !== 1) replace(`/dashboard`);
  callback();
}

export default (
  <Route path='/dashboard' component={App}>
    <IndexRoute component={Home} />
    <Route path="/form" component={() => <IframeClass type={'form'}/>}/>
    <Route path="/admin" component={Admin} onEnter={checkAdmin}/>
    <Route path="/prets" component={AllPrets}/>
    <Route path="/ranking" component={Ranking}/>
    <Route path='/pret/info/:id' component={InfoPret} />
    <Route path='/pret/eval/:id' component={EvalPret} />
    <Route path="/wizard" component={NewPret} onEnter={checkAccount} />/>
    <Route path="/wizard/:id" component={NewPret} onEnter={checkAccount} />/>
    <Route path="/exercises" component={ExcersisesComponent}/>
    <Route path='/exps' component={AllExps} />
    <Route path='/discover' component={Discover}/>
    <Route path='/discover/:id' component={Discover} />
    <Route path='/infer' component={Infer} />
    <Route path='/about' component={About} />
  </Route>
);
