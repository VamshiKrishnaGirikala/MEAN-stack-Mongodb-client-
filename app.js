var MongoClient=require('mongodb').MongoClient;
var express=require('express');
var bodyParser=require("body-parser");
var engines=require("consolidate");
var ObjectId=require("mongodb").ObjectID;
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
        console.log("loaded");  
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

//EDIT:
app.get("/editpost/:id/edit",function(req,res){
    db.collection('formmodels').find({_id:ObjectId(req.params.id)}).toArray(function(err,data){
        if(err)
        {
            console.log(err);
        }
        else{
            // console.log("edit page!!")
            res.send(data);
        }
    })
});

//UPDATE POST:
app.put("/editpost/:id",function(req,res){
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var organisation=req.body.organisation;
    var editContent={firstname:req.body.firstname,
                     lastname:req.body.lastname,
                     organisation:req.body.organisation};
    db.collection('formmodels').updateOne({_id:ObjectId(req.params.id)},{$set:editContent},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
    // console.log(editContent);
})
//DELETE:
app.delete("/delete",function(req,res){
    
   console.log(req.body.delId);
    
    db.collection('formmodels').deleteOne({_id:ObjectId(req.body.delId)},function(err,data){
        if(err)
        {
            console.log("**********")
           console.log(err);
        }
        else{
            db.collection('formmodels').find().toArray(function(err,docs){
                res.end(JSON.stringify(docs));
                console.log("**********")
                // console.log(docs);
                
                // res.send({success:true})
                //  console.log(data);
                
                });

        }
    })
})

MongoClient.connect(mongodb_conn_str,function(err,client){
    if(!err)
    {
        app.listen(3000,function(){
            console.log("server started!!")
            db=client.db('form');
    })
       
    }


});

