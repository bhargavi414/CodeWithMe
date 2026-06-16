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

app.get("/profile", auth, (request, response)=>{
    response.json({
        success: true,
        email: request.user.email
    })
})
app.listen(5713, ()=>{
    console.log("started")
})

