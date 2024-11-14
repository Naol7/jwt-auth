import dotenv from 'dotenv';
import express from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express()
app.use(express.json())

const posts =[
    {
        username: 'Naol',
        title: 'post 1'
    },
    {
        username: 'Henok',
        title: 'post 2',
        
    }
]


app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })  
}

app.listen(3131)