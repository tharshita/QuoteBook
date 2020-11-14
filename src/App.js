import logo from './quotation.svg';
import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import Quote from './components/QuoteCard.js';

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
      </div> 
    );
  }
}

export default App;
