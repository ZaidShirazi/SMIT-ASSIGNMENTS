var todoDatabase = []; // todos array which works like a database
var todoInput = document.getElementById('todoInput');
var todoListContainer = document.getElementById('todoListContainer');

//1. Todo Add function
function addTodo(){
    // Empty input validation
    if(todoInput.value.length < 1){
        alert("Empty input detected! Please try again.");
        return;
    }

    // todo object
    const todoObj = {
        text: todoInput.value,
        id:  Math.floor(Math.random() * 900000) + 100000,// 6 Digit ID
        createdAt: new Date(),
    }
    todoDatabase.push(todoObj);// storing todo object in array
    console.log(todoDatabase); // for checking
    renderTodo();
    todoInput.value = ""; // todo input value reset to empty
}

//2. Todo Render function

function renderTodo(){
    todoListContainer.innerHTML = '';
    for(var i = 0; i<todoDatabase.length; i++){

        todoListContainer.innerHTML += 
        `<div class = "todos">
            <span>${todoDatabase[i].text}</span>
        <div>`;
    }
}

//3. Todo Update function
function updateTodo(){

}

//4. Todo Delete function
function deleteTodo(){

}
