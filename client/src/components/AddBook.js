import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

const AddBook = (props) => {
    const [bookInfo, setBookInfo] = useState({
        name: "",
        genre: "",
        authorId: "",
    });

  const displayAuthors = () => {
      var data = props.getAuthorsQuery;
      if(data.loading){
          return (
              <option disabled>Loading Authors...</option>
          )
      }
      else{
        return data.authors.map((author,idx) => {
            return (
                <option key={idx} value={author.id}>{author.name}</option>
            )
        })
      }
  }

  const submitForm = (e) => {
      e.preventDefault();
      props.addBookMutation({
          variables: {
              name: bookInfo.name,
              genre: bookInfo.genre,
              authorId: bookInfo.authorId,
          },
          refetchQueries: [{ query: getBooksQuery}]
      });
  }
  return (
      <div>
          <form id="add-book" onSubmit = {(e) => submitForm(e)}>

<div className="field">
    <label>Book Name:</label>
    <input type="text" onChange= { (e) => setBookInfo({...bookInfo ,name: e.target.value})}/>
</div>

<div className="field">
    <label>Genre:</label>
    <input type="text" onChange= { (e) => setBookInfo({...bookInfo ,genre: e.target.value})}/>
</div>

<div className="field">
    <label>Author:</label>
    <select onChange= { (e) => setBookInfo({...bookInfo, authorId: e.target.value})}>
        <option>Select author</option>
        {displayAuthors()}
    </select>
</div>

<button>+</button>
</form>
      </div>
  )
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"}),
)(AddBook);
