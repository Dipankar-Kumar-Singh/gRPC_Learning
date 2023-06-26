const grpc = require('@grpc/grpc-js') ;
const protoLoader = require('@grpc/proto-loader') 


const packageDef = protoLoader.loadSync("todo.proto" , {})


const grpcObject = grpc.loadPackageDefinition(packageDef) ;

const todoPackage = grpc.todoPackage ;



const server = new grpc.Server() ;
server.bind("0.0.0.0:40000" , grpc.ServerCredentials.createInsecure()) ;

server.addService(todoPackage.Todo.serivce ,
    {
        "createTodo"  : createTodo ,
        "readTodos" : readTodos 
    })

server.start() ;

console.log("packageDef : " , packageDef ) ;
console.log("grcObjct" , grpcObject) ;
console.log("todoPackage" , todoPackage) ;



function createTodo (call , callback) {
    console.log(call) ;
}


function readTodos () {

}


