import React from 'react'
import {Link} from 'react-router'
// Redux
import { connect } from 'react-redux'
import actions from '../../redux/actions'

import ReactTable from 'react-table'
import { PanelContainer } from '@sketchpixy/rubix';


class UsersTable extends React.Component {
    render() {
        // console.log(2, this.props)
        if (!this.props.result || !this.props.result.length) return null;

        let count = 0;
        let authId = "";

        this.props.result.map(pret => {
            authId = pret.author;
            if (pret.publish === true){
                count += 1;
            }
        })
        
        const columns = [{
            Header: 'Name',
            accessor: 'name', // String-based value accessors!
            Cell: user => <Link to={'/user/' + user.original._id}> 
                {user.viewIndex === 0 ? <img src='/imgs/app/rank/gold.png' width='14px'/> : null} 
                {user.viewIndex === 1 ? <img src='/imgs/app/rank/silver.png' width='14px'/> : null} 
                {user.viewIndex === 2 ? <img src='/imgs/app/rank/bronze.png' width='14px'/> : null} 
                @{user.original.ref.slug} 
            </Link> // Custom cell components!  
        }, {
            Header: 'Prets',
            Cell: (user) => <span className='number'>{
                authId === user.original._id ? count : user.original.prets.length
            } </span>
          
        }, {
            Header: 'Rank', // Required because our accessor is not a string 
            accessor: 'rank'
        }]
        console.log("USERS", this.props.users, this.props.result)
        
        return (
            <ReactTable
                data={this.props.users}
                pageSize={5} // the number of rows per page to be displayed 
                columns={columns}
                sorted={[
                    { // the sorting model for the table 
                        id: 'Prets',
                        desc: true
                    }
                ]}
            />
        );
  }
}

@connect((state) => state)
export default class extends React.Component {

  componentDidMount() {
      this.props.dispatch(actions.getUsers());
      this.props.dispatch(actions.getAllPrets());
  }
  render() {
    return (<PanelContainer>
        <div className='row'>
            <div className='col-md-12 text-center'>
                {this.props.users && this.props.users.result && this.props.users.result.length && this.props.prets ? <UsersTable users={this.props.users.result} result={this.props.prets.result}/> : [] }
            </div>
        </div>
        </PanelContainer>
    );
  }
}
