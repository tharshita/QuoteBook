import logo from './quotation.svg';
import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, Button} from 'react-bootstrap';
import Quote from './components/QuoteCard.js';
import {PlusSquareFill} from 'react-bootstrap-icons';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addShow: false,
    };
    this.handleAddClose = this.handleAddClose.bind(this);
    this.handleAddShow = this.handleAddShow.bind(this);
  }

  handleAddClose = () => {
      this.setState({
          addShow : false
      })
  }

  handleAddShow = () => {
    this.setState({
        addShow : true
    })
  }
  

  render() {
    const {addShow} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to QuoteBank101
          </p>
        </header>
        <div>
          <p>Add Quote</p>
        <PlusSquareFill onClick={this.handleAddShow} size={50}/>
        </div>
        
        <div>
          <Container>
            <Quote>

            </Quote>
            <Quote>
              
            </Quote>
            <Quote>
              
            </Quote>
            <Quote>
              
            </Quote>
            <Quote>
              
            </Quote>
          </Container>
        </div>
        {/*edit modal*/}
        <Modal show={addShow} onHide={this.handleAddClose}>
          <Modal.Header closeButton>
          <Modal.Title>Add Quote</Modal.Title>
          </Modal.Header>
          <Modal.Body>insert form</Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={this.handleAddClose}>
              Close
          </Button>
          <Button variant="primary" onClick={this.handleAddClose}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
      </div> 
    );
  }
}

export default App;
