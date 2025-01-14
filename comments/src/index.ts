import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import axios from 'axios';

type comment = {
    id: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
}


const commentsByPostId : { [x: string]: comment[] } = {};

const app = express();

app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {

    res.send(commentsByPostId[req.params.id] || []);


});

app.post('/posts/:id/comments', async(req, res) => {

    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id]  || [] ;
    comments.push({id: commentId, content, status:'pending'});

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });

    res.status(201).send(comments);

});

app.post('/events',(req,res)=>{

    console.log("received event",req.body.type);
    res.send({});

})

app.listen(4001,()=>{
    console.log("Server is running on port 4001");
})