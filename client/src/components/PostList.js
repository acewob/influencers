import React from "react";
import { useQuery } from "@apollo/client";
import { getPostQuery } from "../queries/queries";

function PostListing(){
    const {loading,error,data}=useQuery(getPostQuery);
    if(loading) return(<p>Loading....</p>);
    if(error){
        return(<p>Error: {error.message}</p>);
    }
    return data.books.map(({name,title,id})=>(
        <div key={id}>
            <img src='' alt={name}/>
            <p><b>{name}</b>-{title} by </p>
        </div>
    ));
}

export default function PostList(){
    return(<div>
        <h2>Book List</h2>
        <br/>
        <PostListing/>
    </div>)
}
