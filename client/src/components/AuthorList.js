import {useQuery} from '@apollo/client';
import { getAuthorsQuery } from '../queries/queries';
function GetAuthors(){
    const {loading,error,data}=useQuery(getAuthorsQuery);
        if(loading) return(<option>Loading</option>);
        if(error){
            return(<option>Error: {error.message}</option>);
        }
        return data.authors.map(({name,age,id})=>(
            <option key={id} value={id}>{name} {age}</option>
        ));
}
export default function AuthorList(){
    return(
        <select>
            <option>select Author</option>
            {GetAuthors()}
        </select>
    );
}