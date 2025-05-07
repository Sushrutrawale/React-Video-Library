var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var ConString = "mongodb://127.0.0.1:27017";

app.get('/get-admin',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        database.collection("tbladmin").find({}).toArray().then(document=>{
            res.send(document);
            res.end();
        });
    });
});

app.get('/get-users',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        database.collection("tblusers").find({}).toArray().then(document=>{
            res.send(document);
            res.end();
        });
    });
});

app.get('/get-categories',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        database.collection("tblcategories").find({}).toArray().then(document=>{
            res.send(document);
            res.end();
        });
    });
});

app.get('/get-videos',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        database.collection("tblvideos").find({}).toArray().then(document=>{
            res.send(document);
            res.end();
        });
    });
});

app.get('/get-video/:id',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        database.collection("tblvideos").find({VideoId:parseInt(req.params.id)}).toArray().then(document=>{
            res.send(document);
            res.end();
        });
    });
});

app.get('/get-user/:userid',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        database.collection("tblusers").find({UserId:req.params.userid}).toArray().then(document=>{
            res.send(document);
            res.end();
        });
    });
});

app.get('/get-category/:id',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        database.collection("tblcategories").find({CategoryId:parseInt(req.params.id)}).toArray().then(document=>{
            res.send(document);
            res.end();
        });
    });
});

app.get('/filter-videos/:categoryid',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        database.collection("tblvideos").find({CategoryId:parseInt(req.params.categoryid)}).toArray().then(document=>{
            res.send(document);
            res.end();
        });
    });
});

app.post('/register-user',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");

        var user = {
            "UserId":req.body.UserId,
            "UserName":req.body.UserName,
            "Password":req.body.Password,
            "Email":req.body.Email,
            "Mobile":req.body.Mobile
        }

        database.collection("tblusers").insertOne(user).then(()=>{
            console.log("User Registered...");
            res.end();
        });
    });
});

app.post('/add-category',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");

        var category = {
            "CategoryId":parseInt(req.body.CategoryId),
            "CategoryName":req.body.CategoryName
        }

        database.collection("tblcategories").insertOne(category).then(()=>{
            console.log("Category Added...");
            res.end();
        });
    });
});

app.post('/add-video',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        
        var video={
            "VideoId":parseInt(req.body.VideoId),
            "Title":req.body.Title,
            "Url":req.body.Url,
            "Description":req.body.Description,
            "Likes":parseInt(req.body.Likes),
            "Dislikes":parseInt(req.body.Dislikes),
            "Views":parseInt(req.body.Views),
            "CategoryId":parseInt(req.body.CategoryId),
            "Comments":[req.body.Comments]
        }

        database.collection("tblvideos").insertOne(video).then(()=>{
            console.log("Video Added...");
            res.end();
        });
    });
});

app.put('/edit-video/:id',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");
        
        var video={
            "VideoId":parseInt(req.body.VideoId),
            "Title":req.body.Title,
            "Url":req.body.Url,
            "Description":req.body.Description,
            "Likes":parseInt(req.body.Likes),
            "Dislikes":parseInt(req.body.Dislikes),
            "Views":parseInt(req.body.Views),
            "CategoryId":parseInt(req.body.CategoryId),
            "Comments":[req.body.Comments]
        }

        database.collection("tblvideos").updateOne({VideoId:parseInt(req.params.id)},{$set:video}).then(()=>{
            console.log("Video Updated Successfully...");
            res.end();
        });
    });
});

app.put('/edit-category/:id',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");

        var category = {
            "CategoryId":parseInt(req.body.CategoryId),
            "CategoryName":req.body.CategoryName
        }

        database.collection("tblcategories").updateOne({CategoryId:parseInt(req.params.id)},{$set : category}).then(()=>{
            console.log("Category Updated Successfully...");
            res.end();
        });
    });
});

app.delete('/delete-category/:id',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");

        database.collection("tblcategories").deleteOne({CategoryId:parseInt(req.params.id)}).then(()=>{
            console.log("Category Deleted...");
            res.end();
        });
    });
});

app.delete('/delete-video/:id',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");

        database.collection("tblvideos").deleteOne({VideoId:parseInt(req.params.id)}).then(()=>{
            console.log("Video Deleted...");
            res.end();
        });
    });  
});


app.put('/edit-user-password/:id',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");

        const {NewPassword} = req.body;
        const userId = req.params.id
        
        database.collection("tblusers").updateOne({UserId:userId},{$set:{Password:NewPassword}}).then(()=>{
            console.log('Password Updated...');
            res.end();
        })
    })
});

app.put('/update-likes/:id',(req,res)=>{
    mongoClient.connect(ConString).then(clientObj=>{
        var database = clientObj.db("videodb");

        const videoId = parseInt(req.params.id);
        const { LikeChange, DislikeChange } = req.body;
        
        database.collection("tblvideos").updateOne({ VideoId:parseInt(videoId) },
            { $inc: { Likes: LikeChange, Dislikes: DislikeChange } }).then(()=>{
            console.log('Likes Updated...');
            res.end();
        })
    })
});

app.get('/get-comments/:videoId', (req, res) => {
    mongoClient.connect(ConString).then(clientObj => {
        var database = clientObj.db("videodb");
        var videoId = parseInt(req.params.videoId);

        database.collection("tblvideos").findOne({ VideoId: videoId })
            .then(video => {
                if (video) {
                    res.json({ VideoId: video.VideoId, Comments: video.Comments || [] });
                } else {
                    res.status(404).json({ message: "Video not found" });
                }
            });
    });
});

// ADD a comment to a video
app.post('/add-comment/:videoId', (req, res) => {
    mongoClient.connect(ConString).then(clientObj => {
        var database = clientObj.db("videodb");
        var videoId = parseInt(req.params.videoId);

        var newComment = {
            UserName: req.body.UserName,
            CommentText: req.body.CommentText,
            Timestamp: new Date().toISOString()
        };

        database.collection("tblvideos").updateOne(
            { VideoId: videoId },
            { $push: { Comments: newComment } }
        ).then(() => {
            res.json({ message: "Comment added successfully", comment: newComment });
        });
    });
});







app.listen(5050);
console.log("Server Started : http://127.0.0.1:5050");