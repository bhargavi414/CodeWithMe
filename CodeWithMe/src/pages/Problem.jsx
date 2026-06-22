import { useParams } from "react-router-dom"

export default function Problem(){
    const {id} = useParams();
    const problems = [{
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        statement: "Given an array and a target number find the two indices whose sum is equal to target",
        example: "nums=[2,7,11,15]"
    },
    {   
        id: 2,
        title: "Reverse Linked List",
        difficulty: "Easy",
        statement: "Reverse the given linked list",
        example: "[1,2,3,4]"
    }
    ]

    const selectedProblem=problems.find((problem)=>{
        return problem.id== id
    });
    return(
        <div>
            <div>Problem {id} </div>
            <div>{selectedProblem.title}</div>
            <div>{selectedProblem.difficulty}</div>
            <div>{selectedProblem.statement}</div>
            <div>{selectedProblem.example}</div>
        </div>
    )
}