const http = require('http');
const app = require("./app")

// set  port number
const port = process.env.PORT || 5001;
// server lis
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
})