const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const { title, author, content } = req.body;
    const newPost = { title, author, content, comments: [] };
    posts.push(newPost);
    res.status(201).send('Post created successfully');
});

app.post('/comments/:postId', (req, res) => {
    const postId = req.params.postId;
    const { name, text } = req.body;
    const newComment = { name, text };
    posts[postId].comments.push(newComment);
    res.status(201).send('Comment added successfully');
});

app.delete('/comments/:postId/:commentId', (req, res) => {
    const { postId, commentId } = req.params;
    posts[postId].comments.splice(commentId, 1);
    res.status(200).send('Comment deleted successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
