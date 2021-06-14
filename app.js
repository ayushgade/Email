const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

//to use css and images
app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    const firstname = req.body.fname
    const lastname = req.body.lname
    const email = req.body.email
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = " https://us6.api.mailchimp.com/3.0/lists/a15bc960a";

    const Option = {
        method:"POST",
        auth: 'Aayush:873e2cdb24ac4b00737a67add37becae-us6'
    }

    const request = https.request(url, Option, function(responce){

        if (responce.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html")
        } else {
            res.sendFile(__dirname + "/error.html")
        }
            responce.on("data",function(data){
                console.log(JSON.parse(data));
            })
    })

    request.write(jsonData);
    request.end();
})

app.post("/error", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000 , function(){
    console.log("server is running");
})

//api key
//873e2cdb24ac4b00737a67add37becae-us6

//id
//a15bc9600a