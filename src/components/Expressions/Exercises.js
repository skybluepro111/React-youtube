import React from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import { Button } from '@sketchpixy/rubix';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import CONSTANTS from '../../../constants';

class Excercises extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			i: 0,
			question: props.exps[0].expFrom.exp,
			langFrom: props.exps[0].expFrom.languaje,
			langTo: props.exps[0].expTo.languaje,
			start: false
		}
	}
	
  componentDidMount() {
    $('#section').addClass('wizard');
  }

  componentWillUnmount() {
    $('#section').removeClass('wizard');
  }

	onComplete() {
		var self = this;
		this.setState({
			showResults: this.props.exps[this.state.i].expTo.exp
		});
		var next = function() {
			setTimeout(() => { self.handleNext(index) }, 2000)
		}
		var finish = function() { self.setState({ finish: true }) }
		var index = (this.state.i + 1 === this.props.exps.length) ? finish() : next();

	}

	handleNext(index) {
		var newIndex = (index > -1) ? index : this.state.i + 1;
		this.setState({
			i: newIndex, 
			showResults: null,
			question: this.props.exps[newIndex].expFrom.exp,
			langFrom: this.props.exps[newIndex].expFrom.languaje,
			langTo: this.props.exps[newIndex].expTo.languaje
		})
	}

	start() {
		this.setState({ start: true });
	}

	again() {
		this.setState({ finish: false });
		this.handleNext(0);
	}

	render() {
		return (
		  <div style={{height: '600px'}}>
	  		<h1>Practica!</h1>
				<Button bsStyle='orange75' onClick={this.start.bind(this)}> Empezar </Button>
	  		<p> En <b style={{color: 'orange'}}>{this.state.langFrom}</b> la expresión en <b style={{color: 'orange'}}>{this.state.langTo}</b> :</p>
				<h3 style={{color: 'blue'}}> {this.state.question} </h3>
	  		<div className='countdown'>
					{this.state.start ? this.state.showResults ? <h2 style={{color: 'red'}}> {this.state.showResults} </h2> : <ReactCountdownClock 
					  seconds={3}
						color="#000"
						alpha={0.9}
						size={300}
						onComplete={this.onComplete.bind(this)} 
					/> : null}
	  		</div>
				{this.state.finish ? <Button bsStyle='orange75' onClick={this.again.bind(this)}> ¿Otra vez? </Button> : <Button bsStyle='orange75' onClick={this.handleNext.bind(this)}> Siguiente expresión </Button>}
	  	</div>
		);
	}
}

@connect((state) => state)
export default class extends React.Component {
  static fetchData(store) {
    var user = CONSTANTS.getUser();
    return store.dispatch(actions.getExps(user.im._id));
  }

	render() {
		return (
			<Excercises
				exps={this.props.exps.result}
			/>
		);
	}
}