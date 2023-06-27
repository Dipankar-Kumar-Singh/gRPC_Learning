const grpc = require('@grpc/grpc-js') ;
const protoLoader = require('@grpc/proto-loader') 
const packageDef = protoLoader.loadSync("todo.proto" , {})
const grpcObject = grpc.loadPackageDefinition(packageDef) ;
const todoPackage = grpcObject.todoPackage ;


const client = new todoPackage.Todo("localhost:40000" , grpc.credentials.createInsecure()) ; 

// A simpel function call ... just like local fun call 
// gRPC --> don't make you feel like you are calling any API or endpint 
// Just simple funtion call as if it's native in file . 
// but it is a RPC call .. 
// actually a RPC SERVICE .. defined in proto file  

client.createTodo({
    "id" : -1 ,
    "text" : "Do Laundry"
} , (err , response)=> {
    // console.log("Recived from server " ,JSON.stringify(response)) ;
})

client.readTodos({} , (err , response)=> {
    response.items.forEach(element => {
            // console.log(element) ;
    });
})


// FOR STREAM .. 
const call = client.readTodosStream() ;
call.on("data" , item => {
    // console.log("recived item from the server " + JSON.stringify(item)) ;
    console.log("Server : ")
    console.log(item) ;
})

call.on("end" , e => console.log("Stream ended ! , SEVER DONE !")) ;