import React, { Component } from 'react';
import {Card, Modal, Button, Row, Col} from 'react-bootstrap';
import { PencilFill, Trash} from 'react-bootstrap-icons';
import './Quote.css';

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
          createdAt: this.props.createdAt
        };
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleEditShow = this.handleEditShow.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
        this.handleDeleteShow = this.handleDeleteShow.bind(this);
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
                <Modal.Body>insert form</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleEditClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleEditClose}>
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
                <Button variant="danger" onClick={this.handleDeleteClose}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }
}

export default QuoteCard;
