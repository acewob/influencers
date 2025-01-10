import { ApolloClient, ApolloProvider, InMemoryCache,gql} from '@apollo/client';
//import { BrowserRouter as Router,Switch,Route,Link } from 'react-router-dom' 
//components
import PostList from "./components/PostList";
import AddPost from './components/AddPost'; 
import React from 'react';
//import HomeIcon from '@mui/icons-material';

const client=new ApolloClient({
  uri:'http://localhost:8000/influencer',
  cache:new InMemoryCache(),
});

client.query({
  query:gql`
  query Book{
    books{
      id
      name
    }
  }
  `,
}).then((result)=>console.log(result))

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Library</h1>
        <br/>
        <PostList />
        <br/>
        <AddPost/>
      </div>
    </ApolloProvider>
    
  );
}

export default App;
