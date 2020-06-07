var express = require('express')
var app = express();
var XLSX = require('xlsx');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors()) 

app.get('/', (req, res) => {
    res.send("hello")
})
app.post('/upload', function (req, res) {

    console.log("api called")
    console.log("api data",req.body.data)
    var workbook = XLSX.readFile(__dirname + '/output.csv');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    // var r=JSON.parse(xlData);
    var outputData = [];
    var n = req.body.data
    console.log("n",n)
    for (var i = 0; i < xlData.length; i++) {
        var input = xlData[i];
        if (input.App == n) {
            console.log("response",input.AppClassification)
             res.send(input.AppClassification);
            // res.send(input.AppClassification)
           }
     
        }
    });
        
    const axios = require("axios");
    const BASE_URL = `https://sentim-api.herokuapp.com/api/v1/`
    module.exports = {
        getAnalyse: () => axios({
            method:"POST",
            json:true,
            url : BASE_URL ,
            headers: {
                Accept: "application/json", "Content-Type": "application/json"
            },
            body:{text:"good"}
           
        })
    }
app.post('/comment', function (req, res) {
    // let comment =[];
 let comment=req.body.data
    let pos=["good","great","love","happy","nice","awesome","fabulous","like","not bad"]
    let neg=["terrible","bad","worst","not good","disgusting","hate","dont like","Don't","Do not","waste"]
    let p=0
    let n=0
    comment=comment.split(' ')
    comment.map(word=>{
     pos.map(e=>{if(e===word)p=p+1;})
   neg.map(e=>{if(e===word)n=n+1;})
   
    })
    if(p>n){res.send("positive")}
   if(p<n){res.send("negative")}
    if(p==n) res.send("neutral")

console.log("p",p,"n",n)
       }
    )

app.listen(3010)
