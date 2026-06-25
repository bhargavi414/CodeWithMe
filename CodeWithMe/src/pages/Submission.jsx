import { useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect} from "react";

export default function Submission(){
    const {id} = useParams() ;
    const [history, setHistory]=useState([]);
        async function handler(){
            try{
            const response = await fetch(`http://localhost:5713/submission/${id}`, {
                method : "GET",
                headers : {
                    "token" : localStorage.getItem("token")
                }});
            const temp= await response.json();
            setHistory(temp);
            }
            catch {console.log("error")}
        }
        useEffect(()=>{handler()}, []);

        try{
            return <div>{history.code}</div>;
        }
        catch{
            console.log("error");
        }
}    