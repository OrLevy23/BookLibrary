
import React, { Component } from 'react';
import { Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import CustomModal from "./CustomModal.jsx";
import styles from "./Books.css"
class Books extends Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.updateInputValue = this.updateAuthor.bind(this);
    this.updateInputValue = this.updateTitle.bind(this);
    this.updateInputValue = this.updateDate.bind(this);
    this.state = {
      edit : [],
      books: this.props.books,
      showDeleteDialog: false,
      showAddBookDialog: false,
      invalidInputs: false,
    };
  }
  toggleEdit(book) {
      const {edit = []} = this.state;
      const id = this.state.books.indexOf(book);
      if (id !== -1) {
        edit[id] = edit[id] ? !edit[id] : true;
        this.setState({
          edit,
          title: null,
          authors: null,
          date: null,
        });
      }
  }

  saveChanges(book) {
    const {edit = []} = this.state;
    const id = this.state.books.indexOf(book);
    edit[id] = false;
    const { books } = this.state;
    if (this.state.title === "" || this.state.authors === "" || (this.state.date && !this.validateDates(this.state.date))) {
      alert("Inputs are not valid")
     return;
    }
    if (-1 !== id) {
      books[id].volumeInfo.title = this.state.title ?  this.state.title : books[id].volumeInfo.title;
      books[id].volumeInfo.authors = this.state.authors ?  this.state.authors :  books[id].volumeInfo.authors;
      books[id].volumeInfo.publishedDate = this.state.date  ?  this.state.date : books[id].volumeInfo.publishedDate;
    }
      this.setState({
         edit,
         books,
         title: null,
         date: null,
         authors: null,
        });
  }

  deleteBook(book) {
    this.setState({showDeleteDialog : true,
      bookToDelete: Object.keys(this.state.edit),
      edit: [],
    });
  }
  deleteRecord() {
    let { edit, books } = this.state;
    const id = this.state.bookToDelete;
    edit.splice(id, 1);
    books.splice(id, 1);
    this.setState({
      books,
      edit,
      showDeleteDialog: false,
      bookToDelete: null,
    });
  }
  removeDeleteDialog() {
    this.setState({
      showDeleteDialog: false,
    })
  }

  updateTitle(v) {
    this.setState({
      title: v.target.value
    });
  }

  updateAuthor(v) {
    this.setState({
      authors: v.target.value
    });
  }

  updateDate(v) {
    this.setState({
      date: v.target.value
    });
  }

  toggleNewBook() {
    const showAddBookDialog = !this.state.showAddBookDialog;
    this.setState({ showAddBookDialog });
  }
  saveNewBook() {
    let { books } = this.state;
    let newBook = {volumeInfo: {}};
    if (this.state.title && this.state.date && this.state.authors && this.validateDates(this.state.date)) {
      newBook.volumeInfo.title = this.state.title;
      newBook.volumeInfo.publishedDate = this.state.date;
      newBook.volumeInfo.authors = this.state.authors;
      books.push(newBook);
      this.setState({
         title: "",
         date: "",
          authors: "",
          books,
          showAddBookDialog: false,
       });
  } else {
    alert("Inputs are not valid");
  }
  }

  //Google Api gives as an option multiple dates
  validateDates(date) {
    if (!date) {
      return false;
    }
    if (!isNaN(date) && parseInt(date, 10) && 0 < date < 2017 ) {  //Integer which is a year
      return true;
    }
    const regMonthYear = /(0[1-9]|[12][0-9]|3[01])[- -.]\d\d/; //Month and a year with - as a seperator
    if (date.match(regMonthYear)) {
      return true;
    }    
    const regFull = /(0[1-9]|[12][0-9]|3[01])[- -.](0[1-9]|1[012])[- -.](19|20)\d\d/; //Year month and day with - as a seperator
  if (date.match(regFull)) {
    return true;
  }
    else {
   return false;
  }
  }

 
  

  render() {
    let listOfBooks = this.state.books || [];
     listOfBooks = this.state.books.map((book, idx) => {     
        let id = book.id;
        let title = book.volumeInfo.title;
        let thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "";
        let authors = book.volumeInfo.authors;
        let publishedDate = book.volumeInfo.publishedDate;
        return (
        
          <div>
            {
              this.state.showAddBookDialog ?
          <CustomModal title={"Add New Book"} body={
                    <div className={styles.dialogDiv}>
                      <span> Title: </span> <input  type="text" placeholder={""} onChange={((e) => {this.updateTitle(e)})} /> <br/>
                      <div className={styles.dialogDivider} />
                      <span> Author: </span><input  type="text" placeholder={""}  onChange={((e) => {this.updateAuthor(e)})}/> <br/>
                      <div className={styles.dialogDivider} />
                      <span> Date: </span><input  type="text" placeholder={""}  onChange={((e) => {this.updateDate(e)})}/> <br/>
                      <div style={{marginTop: "3px"}} />  
                    </div>
                  } footer={
                    <div>
                    <Button onClick={this.toggleNewBook.bind(this)}> Discard</Button>
                    <Button onClick={(()=> {this.saveNewBook()})}> Add new Book</Button>
                  </div>
                  } />
        
         : ""

            }
           { this.state.showDeleteDialog ? 
            <CustomModal title={"Delete"} body={"Are you sure you want to delete  ?"} footer={
              <div>
                <Button onClick={this.removeDialog}> Keep</Button>
                <Button onClick={(()=> {this.deleteRecord(book)})}> Delete</Button>
              </div>
            } />
      : ""}
          <Panel key={id} header={title} eventKey={id}>
            <Grid>
              <Row>
                <Col xs={3} md={3} lg={3}>
                  <img src={thumbnail}  />
                </Col>
                <Col xs={8} md={8} lg={8}>

                {this.state.edit && this.state.edit[idx] ?
                  <CustomModal title={"Edit"} body={
                    <div className={styles.dialogDiv}>
                      {this.state.valid ? <span style="color:red"> author name is not valid </span> : ""}
                      <span> Title: </span> <input  type="text" placeholder={title} onChange={((e) => {this.updateTitle(e)})} /> <br/>
                      <div className={styles.dialogDivider} />
                      <span> Author: </span><input  type="text" placeholder={authors}  onChange={((e) => {this.updateAuthor(e)})}/> <br/>
                      <div className={styles.dialogDivider} />
                      <span> Date: </span><input  type="text" placeholder={publishedDate}  onChange={((e) => {this.updateDate(e)})}/>
                      <div style={{marginTop: "3px"}} />  
                    </div>
                  } footer={
                    <div>
                    <Button onClick={(() => {this.toggleEdit(book)})}> Discard</Button>
                    <Button onClick={(()=> {this.saveChanges(book)})}> Save Changes</Button>
                    <Button onClick={(()=> {this.deleteBook()})}> Delete Book</Button>
                  </div>
                  } />
                  : "" }
                 <ListGroup>
                    <ListGroupItem><strong>Authors: </strong>{authors}</ListGroupItem>
                    <ListGroupItem><strong>Publish Date: </strong>{publishedDate}</ListGroupItem>
                  </ListGroup>                 
                
                  
                </Col>
              </Row>
              <Row>
                <Col xs={11} md={11} lg={11}>
                <div style={{marginTop: "5px"}}/>
                    <Button onClick={(() => {this.toggleEdit(book)})}>Edit</Button> 
                </Col>
              </Row>
            </Grid>
          </Panel>
          </div>
        );
      }, this)
    
    return (
      <div>
        <Button onClick={this.toggleNewBook.bind(this)}>Add New Book</Button>          
        <div className={styles.dialogDivider} />        
        <Accordion>
          {listOfBooks}
        </Accordion>
      </div>
    );
  }
}

export default Books;
