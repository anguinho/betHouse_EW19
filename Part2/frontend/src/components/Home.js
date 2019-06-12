import React, { Component } from 'react';
import '../App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './Modal';
import {getEventos} from '../actions/eventos'
import axios from 'axios';

/*
var data = [
  {id: 1, name: 'Gob', value: '2'},
  {id: 2, name: 'Buster', value: '5'},
  {id: 3, name: 'George Michael', value: '4'}
];

var rows = [
  { id: 1, firstName: 'Paul', lastName: 'Darragh', }
]
var columns = [
  { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, },
  { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, },
]
export default class Home extends Component {
  render() {
    return (
      <div>
        <p className="Table-header">BetESS</p>
        <Table data={data}/>
      </div>
    );
  }
}
 
*/
const products = [];

//const products = [ {id:"5d0045df5355770012aabd12",data: '2019-12-12',equipa1:"Porto",equipa2:"Benfica",odd1:1.2,oddx:3,odd2:2}];
const columns = [{
  dataField: 'data',
  text: 'Data'
}, {
  dataField: 'equipa1',
  text: 'Equipa'
}, {
  dataField: 'equipa2',
  text: 'Equipa'
}];

function isLoggedIn() {
  if (localStorage.getItem('jwtToken')){
    return true
  }
  else
  return false
}


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "", 
      show: false,
      modalShow: false, 
      token: localStorage.getItem('jwtToken'), 
      products: []
    };
    axios.get('http://localhost/eventos').then(response => {
      this.setState({products: response.data})
    })
    this.aposta = {data: "", valor: "", prognostico: "", evento: ""}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleSubmit(row,event) {
    //alert('Equipa Selecionada: ' + JSON.stringify(row));
    event.preventDefault();
    this.setState({ modalShow: true });
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {

    const expandRow = {
    
      renderer: row => (
        
          <div>
          <p>{ `This Expand row is belong to rowKey ${row.data},${JSON.stringify(row)}` }</p>
          <p><b>{`${row.equipa1}:`}</b>{` ${row.odd1}`}</p>
          <p><b>{`Empate`}</b>{` ${row.odd1}`}</p>
          <p><b>{`${row.equipa2}:`}</b>{` ${row.odd2}`}</p>
          <form /*onSubmit={this.handleShow}*/>
          <label>
            Selecione a equipa: 
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="" selected disabled hidden>Selecione</option>
              <option value={`${row.equipa1}-1`}>{`${row.equipa1} `}</option>
              <option value={`Empate-2`}>Empate</option>
              <option value={`${row.equipa2}-3`}>{`${row.equipa2}`}</option>
            </select>
          </label>
          <Button variant="outline-dark" onClick={event=>this.handleSubmit(row,event)}>Apostar</Button>
          <MyVerticallyCenteredModal
            show={this.state.modalShow}
            equipa = {this.state.value}
            row = {row}
            onHide={() => this.setState({ modalShow: false })}
          />
  
          </form>
            
        </div>
      )
    };
    
  const expandRow1 = {
    
    renderer: row => (
      
        <div>
        <p>{ `This Expand row is belong to rowKey ${row.data},${JSON.stringify(row)}` }</p>
        <p><b>{`${row.equipa1}:`}</b>{` ${row.odd1}`}</p>
        <p><b>{`Empate`}</b>{` ${row.odd1}`}</p>
        <p><b>{`${row.equipa2}:`}</b>{` ${row.odd2}`}</p>

          
      </div>
    )
  };

    return (
      <div>
        <h1 class="text-center">BetESS </h1>
        <p>{this.state.token} </p>
        {this.state.token  ? (<BootstrapTable keyField='id' data={ this.state.products } columns={ columns } expandRow={ expandRow }/>)
          : (<BootstrapTable keyField='id' data={ this.state.products } columns={ columns } expandRow={ expandRow1 }/>)}
      
      </div>
      
    );
  }
}