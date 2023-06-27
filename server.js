// const grpc = require('@grpc/grpc-js') ;
// const protoLoader = require('@grpc/proto-loader') 

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync("todo.proto", {})

const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;



const server = new grpc.Server();

const something = todoPackage.Todo.service ;

server.addService(todoPackage.Todo.service, {
        "createTodo": createTodo,
        "readTodos": readTodos
});

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});


// server.start();

// console.log("packageDef : " , packageDef ) ;
// console.log("grcObjct" , grpcObject) ;
// console.log("todoPackage" , todoPackage) ;


const toodos = [] ;
function createTodo(call, callback) {
    
    const todoItem = {
        "id" : toodos.length + 1 ,
        "text" : call.request.text 
    }

    toodos.push(todoItem) ;

    console.log(call);
}


function readTodos(call, callback) {

}


