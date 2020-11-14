import logo from './quotation.svg';
import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, Button} from 'react-bootstrap';
import Quote from './components/QuoteCard.js';
import {PlusSquareFill} from 'react-bootstrap-icons';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addShow: false,
      quotes: []
    };
    this.handleAddClose = this.handleAddClose.bind(this);
    this.handleAddShow = this.handleAddShow.bind(this);
  }

  componentDidMount() {
    this.fetchQuotes();
  }

  fetchQuotes = async () => {
    await axios.get("http://localhost:8080/quote")
      .then(response => {
        console.log(response.data)
        this.setState({
          quotes: response.data
        });
      })
      .catch(error => console.error(error))
  
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
            {this.state.quotes.map((quote,index) =>
              <Quote
                  quoteNum={index + 1}
                  key={index}
                  id={quote._id}
                  author={quote.author}
                  content={quote.content}
                  createdAt={quote.createdAt}
              />)
            }
            
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
