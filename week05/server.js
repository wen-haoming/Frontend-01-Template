const http = require('http')

const server = http.createServer((req,res)=>{
    console.log(req.headers)
    res.setHeader('Content-Type','text/html')
    res.setHeader('X-Foo','bar')
    
    res.writeHead(200,{
        'Content-Type':'text/plain'
    })
    res.end('okIamabody')
})
// server.on('connection',(socket)=>{
//    socket.on('data',(data)=>{
//     console.log(data.toString())
//    })
// })


server.listen(8088)