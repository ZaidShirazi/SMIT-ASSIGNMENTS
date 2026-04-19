var todoDatabase = []; // todos array which works like a database
var todoInput = document.getElementById('todoInput');
var todoListContainer = document.getElementById('todoListContainer');
var clearAllDiv = document.getElementById("clearButtonBox");
var todoToBeUpdate = null;

getlocalStorageData(); // calling function to get existing data first 

//1. Todo Add function
function addTodo(){
    // Empty input validation
    if(todoInput.value.length < 1){
        alert("Empty input detected! Please try again.");
        return;
    }
    // Minimum length validation
    if(todoInput.value.length < 2){
        alert("Input length should be atleast 2 characters.");
        return;
    }
    // Maximum length validation
    if(todoInput.value.length > 150){
        alert("Todo is too long.\nInput length cannot be greater than 150 characters.");
        return;
    }

    for(var i = 0; i<todoDatabase.length; i++){
        if(todoDatabase[i].text === todoInput.value){
            alert("This todo is already exists");
            return;
        }
    }

    // todo object
    var todoObj = {
        text: todoInput.value,
        id:  Math.floor(Math.random() * 900000) + 100000, // 6 digit random id
        createdAt: new Date(),
        isCompleted: false,
    }
    todoDatabase.push(todoObj);// storing todo object in array

    // storing the data in the local Storage
    window.localStorage.setItem("todos", JSON.stringify(todoDatabase));

    console.log(todoDatabase); // for checking
    renderTodo();
    todoInput.value = ""; // todo input value reset to empty
}

//2. Todo Render function

function renderTodo(){
    todoListContainer.innerHTML = '';
    for(var i = 0; i<todoDatabase.length; i++){

        if (todoDatabase[i].isCompleted === true) {

            todoListContainer.innerHTML += 
            `<div class = "todos doneTodos">
                <span>${(i+1) +". "+ todoDatabase[i].text}</span>

                <button disabled type="button" id="editButton" onClick="doneTodo(${todoDatabase[i].id})">
                    <img src="./assets/images/doneIcon.svg" alt="done icon image" width="40px" height ="30px" >
                </button>

                <button disabled type="button" id="editButton" onClick="editTodo(${todoDatabase[i].id})">
                <img src="./assets/images/editIcon.svg" alt="edit icon image" width="40px" height ="30px" >
                </button>

                <button type="button" id="deleteButton" onClick="deleteTodo(${todoDatabase[i].id})">
                <img src="./assets/images/deleteIcon.svg" alt="delete icon image" width="40px" height ="30px" >
                </button>
            <div>`;
            
        }
        else{

            todoListContainer.innerHTML += 
            `<div class = "todos">
                <span>${(i+1) +". "+ todoDatabase[i].text}</span>

                <button onClick="doneTodo(${todoDatabase[i].id})">
                    <img src="./assets/images/doneIcon.svg" alt="done icon image" width="40px" height ="30px" >
                </button>
                <button type="button" id="editButton" onClick="editTodo(${todoDatabase[i].id})">
                <img src="./assets/images/editIcon.svg" alt="edit icon image" width="40px" height ="30px" >
                </button>

                <button type="button" id="deleteButton" onClick="deleteTodo(${todoDatabase[i].id})">
                <img src="./assets/images/deleteIcon.svg" alt="delete icon image" width="40px" height ="30px" >
                </button>
            <div>`;
        }
    }

    if(todoDatabase.length == 0){
        todoListContainer.style.backgroundImage = "url('./assets/images/todoPic.jpg')";
    } else{
        todoListContainer.style.backgroundImage = "none";
    }

    if(todoDatabase.length > 1){
        clearAllDiv.style.display = "flex";
    }else{
        clearAllDiv.style.display = "none";
    }
}

//3. Todo Edit function

function editTodo(id) {
    var addButton = document.getElementById('addButton');
    var saveButton = document.getElementById('saveButton');

    for(var i = 0; i<todoDatabase.length; i++){
        if(todoDatabase[i].id === id){
            todoInput.value = todoDatabase[i].text;
            indexToBeUpdate = i;
            todoToBeUpdate = todoDatabase[i];
            break;
        }
    }
    addButton.style.display = "none";
    saveButton.style.display = "block";
    todoInput.focus(); // for focus the input field automatically when the edit button is clicked
}

//4. Todo Update function

function updateTodo(){
    var addButton = document.getElementById('addButton');
    var saveButton = document.getElementById('saveButton');

    // Empty input validation
    if(todoInput.value.length < 1){
        alert("Empty input detected! Please try again.");
        return;
    }
    // Minimum length validation
    if(todoInput.value.length < 2){
        alert("Input length should be atleast 2 characters.");
        return;
    }
    // Maximum length validation
    if(todoInput.value.length > 150){
        alert("Todo is too long.\nInput length cannot be greater than 150 characters.");
        return;
    }
    
    for(var i = 0; i<todoDatabase.length; i++){

        /* the alert only shows when the clicking object and current object text matches also their id not matches
        (means the object skip itself)
        */        
        if(todoDatabase[i].text === todoInput.value && todoDatabase[i].id !== todoToBeUpdate.id){
        alert("This todo is already exists");
        return;
        }

    }    
    todoToBeUpdate.text = todoInput.value;
    
    todoInput.value = "";
    addButton.style.display = "block";
    saveButton.style.display = "none";

    window.localStorage.setItem("todos", JSON.stringify(todoDatabase));// update the localStorage todos from todos array
    renderTodo();
}

//5. Todo Delete function

function deleteTodo(id){
   console.table(todoDatabase);
   for (var i = 0; i < todoDatabase.length; i++) {
       if (todoDatabase[i].id === id) {
           todoDatabase.splice(i,1);

           window.localStorage.setItem("todos", JSON.stringify(todoDatabase));// update the localStorage todos from todos array

           todoInput.value = "";
           if(saveButton.style.display === "block"){
                saveButton.style.display = "none";
                addButton.style.display = "block";
            }
           renderTodo();
       }
   }
}

//6.  function to get data from local storage

function getlocalStorageData(){
    
    var localSorageData = window.localStorage.getItem("todos");
    localSorageData = JSON.parse(localSorageData);

    if(localSorageData !== null){
        todoDatabase = localSorageData;
    }
    renderTodo();

}

//7. Done todo function

function doneTodo(id){
    
    for(var i = 0; i < todoDatabase.length; i++){
        
        if(todoDatabase[i].id == id){
            todoDatabase[i].isCompleted = true;
            break;
        }
        
    }
    window.localStorage.setItem('todos', JSON.stringify(todoDatabase));
    renderTodo();
}

//8. Todo Delete all function

function deleteAllTodo(){
    var saveButton = document.getElementById('saveButton');
    window.localStorage.removeItem("todos"); // removes all todos from local storage
    todoDatabase = []; // reseting the todo array
    todoInput.value = "";
    if(saveButton.style.display === "block"){
        saveButton.style.display = "none";
        addButton.style.display = "block";
    }
    renderTodo();
}

