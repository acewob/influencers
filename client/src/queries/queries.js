import {gql} from "@apollo/client";

const getPostQuery=gql`{
    post{
        name
        title
        id
        author{
            name
        }
    }
}`
const getAuthorsQuery=gql`{

    
    authors{
        name
        age
        id
    }
}`
// check out option for mutation function for graphql

const ADD_POST=gql`
    mutation ADD_BOOK($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
        name
        genre
        }
  }`
export {getAuthorsQuery,getPostQuery,ADD_POST};