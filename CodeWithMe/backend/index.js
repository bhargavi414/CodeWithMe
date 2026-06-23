const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app=express();
app.use(express.json());
app.use(cors());

const safeDecode = (val) => {
    try {
        return val ? atob(val) : "";
    } catch (e) {
        return val;
    }
};

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

const submissions=[];
const langMap={
    cpp : 54,
    python : 71,
    java : 63
}

app.post("/submit", async (request, response)=>{
    submissions.push(
        {
            problemId : request.body.problemId, 
            code : request.body.code, 
            language : request.body.language,
        }
    )

    const lang =request.body.language
    const source_code = request.body.code
    const testcases = request.body.testcases

    
   let passed = 0;

    for (let tc of testcases) {

        const judgeResponse = await fetch(
            "https://ce.judge0.com/submissions?base64_encoded=false&wait=false", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    source_code: source_code,
                    language_id: langMap[lang],
                    stdin: tc.input
                })
        });

        const result = await judgeResponse.json();
        const token = result.token;

        let status = "Processing";
        let codeResult="";

        while (status === "Processing") {

            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            const judge = await fetch(
                `http://localhost:5713/submission/${token}`,
                {
                    method : "GET"
                }
            );

            codeResult = await judge.json();

            if (!codeResult.status) {
                break;
            }
        status = codeResult.status.description;
        }

        const output = safeDecode(codeResult.stdout || "");
        
        if (output.trim() === tc.output.trim()) {
            passed++;
        }
    }
    console.log(passed);
    const verdict =
        passed === testcases.length ? "Accepted" : "Wrong Answer";

    response.json({
        verdict,
        passed,
        total: testcases.length
    });

})

app.get("/submission/:token",async  (request, response)=>{
    const token = request.params.token;
    const judge = await fetch(
        `https://ce.judge0.com/submissions/${token}?base64_encoded=false`,
        {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
            }
        }
    )
    const result = await judge.json();
    response.json(result);
})

app.get("/submissions", (request, response)=>{
    response.json(submissions);
})

app.listen(5713, ()=>{
    console.log("started")
})

