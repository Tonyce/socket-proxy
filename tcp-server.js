const net = require('net');
const url = require('url');

const servers = [
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:3003',
].map(item => url.parse(item));

// console.log(servers)

net.createServer((socket) => {
    const randomServer = Math.floor(Math.random() * 3);
    const randomServerAddr = servers[randomServer];
    // console.log(socket.remoteAddress);
    const serverSocket = net.connect({
        port: randomServerAddr.port,
        host: randomServerAddr.hostname,
    }, () => {
        socket.on('data', (data) => {
            console.log(`${data.length}`)
        }).on('end', () => {
            console.log(`clent end`)
        }).on('error', () => {
            console.log('err');
        }).pipe(serverSocket);
    
        serverSocket.on('data', (data) => {
            console.log(`-- ${data.length}`)
        }).on('end', () => {
            console.log(`server end`)
        }).on('error', () => {
            console.log('server err')
        }).pipe(socket);    
    });

    serverSocket.on('error', (err) => {
        socket.destroy();
    })

}).listen(9001, () => {
    console.log("server start at 9001")
})  