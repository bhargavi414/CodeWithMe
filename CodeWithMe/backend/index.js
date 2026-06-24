const Problem = require("./models/Problem");
const Submission = require("./models/Submission");
const connectDB = require("./db");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app=express();
app.use(express.json());
app.use(cors());

function auth(request, response, next){
    try{
        const decoded = jwt.verify(request.headers.token, "mysecret");
        
        request.user=decoded;
        next();
    }
    catch(e){
        response.status(401);

        response.json({
        success: false,
        error: "Invalid Credentials"
        })

        return;
    }
}

app.get("/",(request, response)=>{
    response.send("xyz");
})

app.get("/me", auth, (request, response)=>{
    response.json({
        success: true,
        email: request.user.email
    })
})

app.post("/new_user");
app.post("/login", (request, response)=>{
    console.log(request.body.email)
    console.log(request.body.password)
    const Email = request.body.email;
    const Password = request.body.password;

    
    if(Email == "abc@1234" && Password=="1234") {
        const token = jwt.sign({email : Email}, "mysecret");

        response.status(200);
        response.json({
        success: true,
        error: "",
        token: token
        })
    }
    else {
        response.status(401);
        response.json({
        success: false,
        error: "Invalid Credentials"
        })
    }

})

const langMap={
    cpp : 54,
    python : 71,
    java : 63
}

function safeDecode(val) {
    try {
        return val ? atob(val) : "";
    } catch {
        return val || "";
    }
}
let counter = 0;
app.post("/submit", async (request, response) => {

    counter=counter+1;
    const {title, code, language, testcases } = request.body;
    const problemId = counter;

    let passed = 0;
    const result_array = [];

    for (let tc of testcases) {
        let input=null, expected=null, got=null, tcstatus=null;
        input = tc.input;
        expected = tc.output;

        const submitRes = await fetch(
            "https://ce.judge0.com/submissions?base64_encoded=false&wait=false",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    source_code: code,
                    language_id: langMap[language],
                    stdin: tc.input
                })
            }
        );

        const submitData = await submitRes.json();
        const token = submitData.token;
        console.log(token);

        let status = "Processing";
        let result = null;

        while (status === "Processing" || status === "In Queue") {

            await new Promise(resolve => setTimeout(resolve, 1000));

            const res = await fetch(
                `https://ce.judge0.com/submissions/${token}?base64_encoded=false`
            );

            result = await res.json();

            status = result?.status?.description;
        }

        const output = (result?.stdout || "").trim();
        got = output;
        console.log(output);
        if (output === tc.output.trim()) {
            passed++;
            tcstatus = "passed";
        }
        else tcstatus = "wrong output/ error"

        result_array.push({
            input : input,
            expected : expected,
            got : got,
            status : tcstatus
        })
    }

    console.log(passed);
    const verdict =
        passed === testcases.length ? "Accepted" : "Wrong Answer";

    await Submission.create({
        title,
        code,
        language,
        verdict,
        passed,
        total: testcases.length,
        results : result_array
    })

    response.json({
        verdict,
        passed,
        total: testcases.length,
        results : result_array
    });

});

app.post("/seed", async (request, response)=>{

    await Problem.deleteMany({});
    await Problem.create([{
        title: "Two sum",
        difficulty : "Easy",
        statement : "Given an array and a target number find the two indices whose sum is equal to target",
        example : "input : 4 9 2 7 11 15, output : 1 2",
        testcases : [
            {
                input : "4 9 2 7 11 15",
                output : "1 2"
            },
            {
                input : "5 3 4 2 1 5",
                output : "2 3"
            }
        ]
    }])

    response.json({
        success : true
    })
})

app.get("/submissions", async (request, response)=>{
    const submissions = await Submission.find();
    response.json(submissions);
})

app.get("/submission/:id", async (request, response)=>{
    const id=request.params.id;
    const submission = await Submission.findById(id);
    response.json(submission);
})
app.get("/problems",async (request, response)=>{
    const problems = await Problem.find();
    response.json(problems);
})

app.get("/problem/:id", async (request, response)=>{
    const id=request.params.id;
    const problem = await Problem.findById(id);
    response.json(problem);
})

app.get("/submissions/delete", async(request, response)=>{
    await Submission.deleteMany({});
    response.json({
        success : "true"
    })
})
connectDB();

app.listen(5713, ()=>{
    console.log("started")
})

