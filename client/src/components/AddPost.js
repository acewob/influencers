import React,{useEffect, useState} from 'react';
import { useMutation,useQuery } from '@apollo/client';
import { ADD_POST,getAuthorsQuery,getPostQuery } from '../queries/queries';


function AddPost(){
    const GetAuthors=()=>{
        const {loading:authorloading, error:authorerror,data:authordata}=useQuery(getAuthorsQuery);
        if(authorloading){
            return(
                <option>Loading...</option> 
            );
        }
        if(authorerror){
            return(<option>Error: authorerror.message</option>);
        }else{
            return authordata.authors.map(({name,age,id})=>(
                <option key={id} value={id}>{name} {age}</option>
            ));
        }
        
    }
    
    const [name,setName]=useState('');
    const [title,setTitle]=useState('')
    const [authorId,setAuthorId]=useState('')

    const [addPost,{loading,error,data}]=useMutation(ADD_POST,{
        //update query after making a successfull POST 
        refetchQueries:[{
            query:getPostQuery
        }]
    });
    //display items in browser console.
    useEffect(()=>{
        console.log(
            addPost,
            loading,
            error,
            data
        );
    });
    //Display items in browser
    return(
        <div>
            <form id='addpost' onSubmit={(e)=>{
                e.preventDefault();
                addPost({variables:{
                    name ,
                    title, 
                    authorId
                }});
                //if their is no error rests the input fields
                if (!error){
                    setName('');
                    setTitle('');
                    setAuthorId('');
                }
            }}>
                <table>
                    <tr>
                    <th colSpan={2}>ADD POST</th>
                    </tr>
                    <tr>
                        <td><label>Name</label></td>
                        <td><input 
                        type="text" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)}/>
                    </td>
                    </tr>
                    <tr>
                        <td><label>Title</label></td>
                        <td><input type="text" 
                        value={title} onChange={(e)=>setTitle(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><label>Author:</label></td>
                        <td>
                            <select value={authorId} onChange={(e)=>setAuthorId(e.target.value)}>
                                <option>Select Author</option>
                                <GetAuthors/>
                            </select>
                        </td>
                    </tr>
                </table>
                <button disabled={loading ? true:false} type="submit">Add book</button>
                {error?<p>Error while adding post</p>:null}  
            </form>
        </div>
    );
}
export default function PlusBook(){
    return(
        <div>
            <h3>upload post</h3>
            <br/>
            <AddPost/>
        </div>)
}