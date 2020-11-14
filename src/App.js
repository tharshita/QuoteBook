import logo from './quotation.svg';
import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Container} from 'react-bootstrap';

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to QuoteBank101
          </p>
        </header>
        <div>
          <Container>
            <Card>
              <Card.Header>Quote</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {' '}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                    erat a ante.{' '}
                  </p>
                  <footer className="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div> 
    );
  }
}

export default App;
