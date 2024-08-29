import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';

type Comment = {
    id: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
  };
  
  type Post = {
    id: string;
    title: string;
    comments: Comment[];
  };
  
  const posts: { [postId: string]: Post } = {};
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/posts',(req,res)=>{

    res.send(posts);

});

app.post('/events',(req,res)=>{

    const {type,data} = req.body;

    if(type==='PostCreated'){
        const {id,title} = data;
        posts[id] = {id,title,comments:[]};
    }

    if(type==='CommentCreated'){
        const {id,content, postId ,status} = data;
        // const post = posts[postId];
        posts[postId].comments.push({id,content,status})
    }
    console.log(posts);
    res.send({});


});

app.listen(4002,()=>{
    console.log("Server is running on port 4002");
})