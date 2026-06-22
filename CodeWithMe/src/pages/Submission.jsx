import { useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect} from "react";

export default function Submission(){
    const {key} = useParams() ;
    const [history, setHistory]=useState([]);
        async function handler(){
            try{
            const response = await fetch("http://localhost:5713/submissions", {method : "GET"});
            const temp= await response.json();
            setHistory(temp);
            }
            catch {console.log("error")}
        }
        useEffect(()=>{handler()}, []);
        const selectedElement = history.find((submission)=>{return submission.problemId==key})

        try{
            return <div>{selectedElement.code}</div>;
        }
        catch{
            console.log("error");
        }
}    