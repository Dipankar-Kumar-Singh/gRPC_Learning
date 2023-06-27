# Learning gRPC 
## by making a ToDo APP ! 



> [!NOTE] Make you feel Home 
> In gRPC Clinet , you don't have to fetch data from API or call a API with data to make API do some work , 
> in gRPC , client will feel like it's all local , like a monolithic architecture 
> 
> call any function from different microservices just like it's your own function and receive the response from the server 

### Proto File : for Schema : 
```proto
service Todo {
    rpc createTodo(TodoItem) returns (TodoItem){};
    rpc readTodos(voidNoParams) returns (TodoItems){};
};


message voidNoParams {   };
message TodoItem {
    int32 id = 1;
    string text = 2;
};
```
_Note : you need to give something in params : thus creating custom void ( void is reserved ! )_

### server side Fun handling : 

```JS
function readTodos(call, callback) {
    // can't send naked totods array because return type is 
    // return type -->toDoItems --> array of item --> array name : items  
    callback(null , {"items" : toodos})
}
```

`call` contians the data from the client ( all the paylaod is inside call , extract it if you want )
`callback` : here `null` ( first arg ) is for error 




Flow of gRPC : 
![image](https://github.com/Dipankar-Kumar-Singh/gRPC_Learning/assets/66475186/866dfa5d-6ccd-465e-8799-f6dacdfa48a7)
