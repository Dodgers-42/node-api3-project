// code away!
const express = require('express')
const logger = require('./middleware/logger')
const userRouter = require('./users/userRouter')
// const postRouter = require('./posts/postRouter')

const server = express()
const app = require("./server.js");
const port = 4001;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

server.use(express.json())

server.use(logger('long'))

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware</h2>`);
});

server.use(userRouter)
// server.use(postRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong, please try again"
    })
})