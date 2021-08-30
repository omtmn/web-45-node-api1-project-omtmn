const server = require('./api/server');

const port = 3000;

// START YOUR SERVER HERE

server.listen(port, (req, res) => {
    console.log('Listening on port 3000!')
})
