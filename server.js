const exp = require("constants");
const express = require("express");
const app =  express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let currentId = 1;  

app.post("/tasks", (request, response)=>{
    let bodyRequest = request.body;
    let newTask = {
        id: currentId++, //Novos IDs incrementais
        title: bodyRequest.title, 
        description: bodyRequest.description,
        status: bodyRequest.status
    }

    tasks.push(newTask);
    response.status(200).json({message: "Tarefa criada com sucesso", newTask});
})

app.get("/rota", (request, response)=>{
    return response.status(200).json("Olá, humano.");
})


app.get ("/tasks", (request, response)=>{
    return response.status(200).json(tasks);
})

app.delete("/tasks/:id", (request, response)=>{
    let idRequest = request.params.id;
    const taskFound = tasks.find((task) => task.id == idRequest);

    if (!taskFound) {
        return response.status(404).json({message: "Tarefa não encontrada."});
    }

    const taskIndex = tasks.findIndex((task) => task.id == idRequest);

    tasks.splice(taskIndex, 1);
    return response.status(200).json({message: "Tarefa foi deletada com sucesso.", taskFound});
})

app.put("/tasks/:id", (request, response)=>{
    let idRequest = request.params.id;
    let bodyRequest = request.body;

    const taskIndex = tasks.findIndex((task) => task.id == idRequest);

    if (taskIndex == -1) {
        return response.status(404).json({message: "Tarefa não encontrada."});
    }

    let taskUpdated = tasks[taskIndex];
    taskUpdated = {
        id: currentId++, //Manter ID
        title: bodyRequest.title, 
        description: bodyRequest.description,
        status: bodyRequest.status
    }

    return response.status(200).json({message: "Tarefa foi atualizada com sucesso.", taskUpdated});
})

app.get("/tasks/:id", (request, response)=>{
    let idRequest = request.params.id;
    const taskFound = tasks.find((task) => task.id == idRequest);

    if (!taskFound) {
        return response.status(404).json({message: "Tarefa não encontrada."});
    }

    return response.status(200).json(taskFound);
})

app.listen(PORT, ()=>{
    console.log("O servidor foi aberto na porta 3000.");
})