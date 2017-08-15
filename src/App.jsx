import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Header from './components/Header.jsx';
import Books from './components/Books.jsx';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      fetchedList: false,
    };
  }

  componentWillMount() {
    this.getBooks();
  }

  getBooks() {
    axios.request({
      method: 'get',
      url: 'https://www.googleapis.com/books/v1/volumes?q=Lord of the rings'
    }).then((response) => {
      this.setState({books: response.data.items, fetchedList: true}, () => {
        console.log(this.state);
      })
      
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col xs={12} md={12} lg={12}>
            {this.state.fetchedList ?
              <Books books={this.state.books} />            
            : ""}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
