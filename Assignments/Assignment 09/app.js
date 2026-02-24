var todoDatabase = []; // todos array which works like a database
var todoInput = document.getElementById('todoInput');
var todoListContainer = document.getElementById('todoListContainer');
var todoToBeUpdate = null;

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
            <span>${(i+1) +". "+ todoDatabase[i].text}</span>
            <button type="button" id="editButton" onClick="editTodo(${todoDatabase[i].id})">
                <img src="./assets/images/editIcon.svg" alt="edit icon image" width="40px" height ="30px" >
            </button>

            <button type="button" id="deleteButton" onClick="deleteTodo(${todoDatabase[i].id})">
                <img src="./assets/images/deleteIcon.svg" alt="delete icon image" width="40px" height ="30px" >
            </button>
        <div>`;
    }

    if(todoDatabase.length == 0){
        todoListContainer.style.backgroundImage = "url('./assets/images/todoPic.jpg')";
    } else{
        todoListContainer.style.backgroundImage = "none";
    }
}

//3. Todo Edit function

function editTodo(id) {
    var addButton = document.getElementById('addButton');
    var updateButton = document.getElementById('updateButton');
    for(var i = 0; i<todoDatabase.length; i++){
        if(todoDatabase[i].id === id){
            todoInput.value = todoDatabase[i].text;
            indexToBeUpdate = i;
            todoToBeUpdate = todoDatabase[i];
        }
            
        addButton.style.display = "none";
        updateButton.style.display = "block";
        
        todoInput.focus();
    }
}

//4. Todo Update function

function updateTodo(){
    var addButton = document.getElementById('addButton');
    var updateButton = document.getElementById('updateButton');
    todoToBeUpdate.text = todoInput.value;
    todoInput.value = "";
    addButton.style.display = "block";
    updateButton.style.display = "none";
    renderTodo();
}

//5. Todo Delete function

function deleteTodo(id){
   console.table(todoDatabase);
   for (var i = 0; i < todoDatabase.length; i++) {
       if (todoDatabase[i].id === id) {
           todoDatabase.splice(i,1);
           renderTodo();
           todoInput.value = "";
       }
   }
}
