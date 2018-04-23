var MongoClient=require('mongodb').MongoClient;
var express=require('express');
var bodyParser=require("body-parser");
var engines=require("consolidate");
var app=express();
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const mongodb_conn_str="mongodb://localhost:27017/";
var db="";
app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/views/mongodb.html");
});
// //Read:
app.get("/getarticles",function(req,res){
    db.collection('formmodels').find().toArray(function(err,docs){
        res.end(JSON.stringify(docs));
        console.log("*********")
        console.log(docs);
        });
})
 //Create:
app.post("/new",function(req,res){
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var organisation=req.body.organisation;
    var formContent={firstname:firstname,lastname:lastname,organisation:organisation};
    db.collection('formmodels').insertMany([formContent],function(err,data){
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);
            console.log(data)
        }
    });
});


// //SHOW:
// app.get("/:id",function(req,res){
//     db.collection('articles').findOne()
// })

// //DELETE:
// app.delete("/delete/:id",function(req,res){
//     var id=req.params.id;
//     console.log('+++++++++++++++++++++++++=')
//     console.log(id)
//     db.collection('articles').deleteOne({"_id":"ObjectId("+id+")"},function(err,data){
//         if(!err)
//         {
//             res.redirect("/");
//         }
//     })
// })

MongoClient.connect(mongodb_conn_str,function(err,client){
    if(!err)
    {
        app.listen(3000,function(){
            console.log("server started!!")
            db=client.db('form');
    })
        //  db=client.db('marlabs');
        // db.collection('users').find().toArray(function(err,docs){
        //     console.log(docs);
        // })
        // console.log("connection established!!!");
    }


});

