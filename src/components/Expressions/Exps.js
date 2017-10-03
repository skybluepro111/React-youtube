import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import Select from 'react-select';
import ReactTable from 'react-table'
import { Table, Button, FormControl } from '@sketchpixy/rubix';
import { languageList } from '../../modules/language_list';

@withRouter
export default class extends React.Component {

  constructor() {
    super();
    this.state = {
      langFrom: 'en',
      langTo: 'es'
    };
  }

  createExp(e) {
    e.preventDefault();
    let { dispatch, actions } = this.props;
    let inputFrom = ReactDOM.findDOMNode(this.inputFrom);
    let inputTo = ReactDOM.findDOMNode(this.inputTo);
    let expFrom = inputFrom.value;
    let expTo = inputTo.value;

    dispatch(actions.createExp(this.props.user.im._id, {
      expFrom: {
        exp: expFrom, 
        languaje: this.state.langFrom
      }, expTo: {
        exp: expTo,
        languaje: this.state.langTo
      } 
    }));
    inputTo.value = '';
    inputFrom.value = '';
  }

  removeExp(item, context) {
    let { dispatch, actions } = this.props;
    dispatch(actions.removeExp({ _id: item._id }));
    dispatch(actions.getExps(this.props.user.im._id));
  }

  setFrom(val) {
    this.setState({langFrom: val.value})
  }

  setTo(val) {
    this.setState({langTo: val.value})
  }

  render() {
		var self = this;
		const columns = [{
				Header: 'From Language',
				Cell: item => <span className='number'>{item.original.expFrom.languaje}</span> // Custom cell components! 
		}, {
				Header: 'From Expresion',
				Cell: item => <span className='number'>{item.original.expFrom.exp}</span> // Custom cell components! 
		}, {
				Header: 'To Language',
				Cell: item => <span className='number'>{item.original.expTo.languaje}</span> // Custom cell components! 
		}, {
				Header: 'To Expresion',
				Cell: item => <span className='number'>{item.original.expTo.exp}</span> // Custom cell components! 
		}, {
				Header: 'Delete',
				Cell: item => <span className='number'><Button onClick={this.removeExp.bind(this, item.original)}> Borrar </Button></span> // Custom cell components! 
		}];

    return (<div>
			<div>
				<Table className='expTable'>
					<thead>
					<tr>
					    <th>From Language</th>
					    <th>From Expresion</th>
					    <th>To Language</th>
					    <th>To Expresion</th>
					    <th>Actions</th>
					</tr>
					</thead>
					<tbody>
						<tr>
							<td><Select name="form-field-name" value={self.state.langFrom} options={languageList} onChange={self.setFrom.bind(this)}/></td>
							<td><FormControl type='text' placeholder='Origen' ref={(input) => this.inputFrom = input} autoFocus /></td>
							<td><Select name="form-field-name" value={self.state.langTo} options={languageList} onChange={self.setTo.bind(this)} className='_right'/></td>
							<td><FormControl type='text' placeholder='Destino' ref={(input) => this.inputTo = input} autoFocus /></td>
							<td><Button bsStyle='green' className='remove-sm' onlyOnHover onClick={self.createExp.bind(this)}>Crear</Button></td>
						</tr>
					</tbody>
				</Table>
			</div>
			<ReactTable
					data={this.props.rows}
					pageSize={10} // the number of rows per page to be displayed 
					columns={columns}
			/>
		</div>
    );
  }
}