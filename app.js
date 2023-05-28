const express= require("express");
const app = express();
const https= require("https");
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname));
app.use(express.static("public"));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html");
    
    })

app.post("/",function(req,res){
    const fName1 = req.body.firstName;
    const lName1= req.body.lastName;
    const mail= req.body.email;
    // console.log(fName +" "+ lName +" "+ mail);
    const data = {
        members:[
            {
                email_address: mail,
                status : "subscribed",
                merge_fields: {
                    FNAME: fName1,
                    LNAME: lName1
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/5f1e4caaed";
    const Options ={
        method: "Post",
        auth: "satvik:fd3695fcb3437979f032e751ead7a5c7-us21"
    }
    const request =https.request(url, Options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is up and running");
})

// API key
// fd3695fcb3437979f032e751ead7a5c7-us21

// AudienceId
// 5f1e4caaed