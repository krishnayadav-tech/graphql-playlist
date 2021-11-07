import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false
  })
});

function App() {
  const clickMe = ()=>{
    client
      .query({
        query: gql`
          query{
            allbooks{
              id,name,genre,author{
                id,
                name,age
              }
            }
          }
        `
      }).then(result => console.log(result)).catch(err=>console.log(err.message));
      client.query({
        query: gql`
          query($id:ID){
            author(id:$id){
              id,
              name,
              age,
              books{
                id,
                name
              }
            }
          }
        `,
        variables:{
          id:1
        }
      }).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err.message);
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={clickMe}>sendRequest</button>
      </header>
    </div>
  );
}

export default App;
