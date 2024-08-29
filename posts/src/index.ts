import express from 'express'
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser'
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

type Comment = {
    id: string;
    content: string;
  };
  
  type Post = {
    id: string;
    title: string;
    comments: Comment[];
  };
  
  const posts: { [postId: string]: Post } = {};

app.get("/posts", (req, res)=>{
    res.send(posts);
});

app.post("/posts",async (req, res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
        id, title,comments:[]
    };

    await axios.post('http://localhost:4005/events',{
        type: 'PostCreated',
        data: {
            id ,title
        }
    });

    res.status(201).send(posts[id]);
});


app.post('/events',(req,res)=>{

    console.log("received event",req.body.type);
    res.send({});

})

app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})