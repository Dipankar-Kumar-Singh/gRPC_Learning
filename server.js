// const grpc = require('@grpc/grpc-js') ;
// const protoLoader = require('@grpc/proto-loader') 

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync("todo.proto", {})

const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;



const server = new grpc.Server();

const something = todoPackage.Todo.service ;


// maping of the grpc servies to JS funtion in server.js
server.addService(todoPackage.Todo.service, {
        "createTodo": createTodo,
        "readTodos": readTodos ,
        "readTodosStream" : readTodosStream 
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

    // console.log(call);
    console.log(call.request)

    // null is error object !
    callback(null ,todoItem) ;
    // console.log(callback) ;
}


function readTodos(call, callback) {
    // can't send naked totods array because return type is 
    // return type -->toDoItems --> array of item --> array name : items  
    callback(null , {"items" : toodos})
}


// 🤩🤩🤩🤩 STREAM 🎏🎏🌊🚿♒♒♒
function readTodosStream(call , callback) {

    // for streams , call back is not called ..
    // insted .. data is written on call object !

    toodos.forEach(item =>  call.write(item)) ;
    call.end() ;
}