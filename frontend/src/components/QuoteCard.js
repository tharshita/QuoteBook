import React, { Component } from 'react';
import {Card, Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { PencilFill, Trash} from 'react-bootstrap-icons';
import './Quote.css';
import axios from 'axios';

class QuoteCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          editShow: false,
          deleteShow: false,
          quoteNum: this.props.quoteNum,
          id: this.props.id,
          author: this.props.author,
          content: this.props.content,
          createdAt: this.props.createdAt,
          newAuthor: this.props.author,
          newContent: this.props.content
        };
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleEditShow = this.handleEditShow.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
        this.handleDeleteShow = this.handleDeleteShow.bind(this);
        this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
        this.handleEditQuote = this.handleEditQuote.bind(this);
    }

    handleEditClose = () => {
        this.setState({
            editShow : false
        })
    }

    handleEditShow = () => {
        this.setState({
            editShow : true
        })
    }

    handleDeleteClose = () => {
        this.setState({
            deleteShow : false
        })
    }

    handleDeleteShow = () => {
        this.setState({
            deleteShow : true
        })
    }

    handleDeleteQuote = async () => {
        await axios.delete("http://localhost:8080/quote/" + this.state.id)
        .then(response => {
            this.props.callback()
            
        })
        .catch(error => console.error(error))

        this.handleDeleteClose()
    }

    onChangeHandler = (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name] : value
        })
    }

    handleEditQuote = async() => {
        const quote = {
          author: this.state.newAuthor,
          content: this.state.newContent
        }
        await axios.put("http://localhost:8080/quote/" + this.state.id, quote)
          .then(response => {
            this.props.callback()
            console.log(response.data)
          })
        .catch(error => console.error(error))
        this.handleEditClose()
    
      }


  render() {
    const { editShow, deleteShow, content, quoteNum, author } = this.state;
  
    return (
        <div className="App">
            <Card>
                <Card.Header>
                <Row>
                    <Col md={10} className="text-left">Quote {quoteNum}</Col>
                    <Col md={1}> <PencilFill onClick={this.handleEditShow}/></Col>
                    <Col md={1}><Trash onClick={this.handleDeleteShow}/></Col>

                </Row>
                </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                        {' '}
                        {content}
                        {' '}
                        </p>
                        <footer className="blockquote-footer">
                        By <cite title="Source Title">{author}</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
            
            {/*edit modal*/}
            <Modal show={editShow} onHide={this.handleEditClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Quote</Modal.Title>
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
                <Button variant="secondary" onClick={this.handleEditClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleEditQuote}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            {/*delete modal*/}
            <Modal show={deleteShow} onHide={this.handleDeleteClose}>
                <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this quote?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleDeleteClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={this.handleDeleteQuote}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }
}

export default QuoteCard;
