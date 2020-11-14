import logo from './quotation.svg';
import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Quote from './components/QuoteCard.js';
import {PlusSquareFill} from 'react-bootstrap-icons';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addShow: false,
      quotes: [],
      newAuthor: '',
      newContent: ''
    };
    this.handleAddClose = this.handleAddClose.bind(this);
    this.handleAddShow = this.handleAddShow.bind(this);
    this.fetchQuotes = this.fetchQuotes.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleAddQuote = this.handleAddQuote.bind(this);
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

  handleAddQuote = async() => {
    const quote = {
      author: this.state.newAuthor,
      content: this.state.newContent
    }
    await axios.post("http://localhost:8080/quote", quote)
      .then(response => {
        console.log(response.data)
      })
    .catch(error => console.error(error))
    this.fetchQuotes()
    this.handleAddClose()

  }

  onChangeHandler = (event) => {
    const value = event.target.value;
    this.setState({
        [event.target.name] : value
    })
  }
  

  render() {
    const {addShow, quotes} = this.state;
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
            {quotes.map((quote,index) =>
              <Quote
                  quoteNum={index + 1}
                  key={index}
                  id={quote._id}
                  author={quote.author}
                  content={quote.content}
                  createdAt={quote.createdAt}
                  callback={this.fetchQuotes}
              />)
            }
            
          </Container>
        </div>
        {/*edit modal*/}
        <Modal show={addShow} onHide={this.handleAddClose}>
          <Modal.Header closeButton>
          <Modal.Title>Add Quote</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Author
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="newAuthor" placeholder="Author" onChange={this.onChangeHandler} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Quote
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="newContent" placeholder="Quote" onChange={this.onChangeHandler}/>
              </Col>
            </Form.Group>
          </Form>

          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={this.handleAddClose}>
              Close
          </Button>
          <Button variant="primary" onClick={this.handleAddQuote}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
      </div> 
    );
  }
}

export default App;
