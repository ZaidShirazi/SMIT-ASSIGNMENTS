// Global Variables
var todoDatabase = []; // todos array which works like a database
var todoInput = document.getElementById("todoInput");
var saveButton = document.getElementById("saveButton");
var addButton = document.getElementById("addButton");
var todoListContainer = document.getElementById("todoListContainer");
var clearAllDiv = document.getElementById("clearButtonBox");
var todoToBeUpdate = null;
var indexToBeUpdate = null;

// calling function to get existing data first
getlocalStorageData(); 

//1. Todo Add function
function addTodo() {
  // reset the variables first to ensure add button will not accidentally reset the existing todo
  indexToBeUpdate = null;
  todoToBeUpdate = null;

  // Empty input validation
  if (todoInput.value.trim().length < 1) {
    alert("Empty input detected! Please try again.");
    return;
  }
  // Minimum length validation
  if (todoInput.value.trim().length < 2) {
    alert("Input length should be atleast 2 characters.");
    return;
  }
  // Maximum length validation
  if (todoInput.value.trim().length > 150) {
    alert(
      "Todo is too long.\nInput length cannot be greater than 150 characters.",
    );
    return;
  }

  for (var i = 0; i < todoDatabase.length; i++) {
    if (
      todoDatabase[i].text.trim().toLowerCase() ===
      todoInput.value.trim().toLowerCase()
    ) {
      alert("This todo is already exists");
      return;
    }
  }

  // todo object definition
  var todoObj = {
    text: todoInput.value.trim(), // here trim() fixes the one space problem
    id: Math.floor(Math.random() * 900000) + 100000, // 6 digit random id
    createdAt: new Date(),
    isCompleted: false,
  };
  todoDatabase.push(todoObj); // storing todo object in array

  // storing the data in the local Storage
  window.localStorage.setItem("todos", JSON.stringify(todoDatabase));

  // console.log(todoDatabase); // for checking
  renderTodo();
  todoInput.value = ""; // todo input value reset to empty
}

//2. Todo Render function

function renderTodo() {
  todoListContainer.innerHTML = "";
  for (var i = 0; i < todoDatabase.length; i++) {
    if (todoDatabase[i].isCompleted === true) {
      todoListContainer.innerHTML += `<div class = "todos doneTodos">
                <span>${i + 1 + ". " + todoDatabase[i].text}</span>

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
    } else {
      todoListContainer.innerHTML += `<div class = "todos">
                <span>${i + 1 + ". " + todoDatabase[i].text}</span>

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

  if (todoDatabase.length === 0) {
    todoListContainer.style.backgroundImage =
      "url('./assets/images/todoPic.jpg')";
  } else {
    todoListContainer.style.backgroundImage = "none";
  }

  if (todoDatabase.length > 1) {
    clearAllDiv.style.display = "flex";
  } else {
    clearAllDiv.style.display = "none";
  }
}

//3. Todo Edit function

function editTodo(id) {
  for (var i = 0; i < todoDatabase.length; i++) {
    if (todoDatabase[i].id === id) {
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

function updateTodo() {
  // Empty input validation
  if (todoInput.value.trim().length < 1) {
    alert("Empty input detected! Please try again.");
    return;
  }
  // Minimum length validation
  if (todoInput.value.trim().length < 2) {
    alert("Input length should be atleast 2 characters.");
    return;
  }
  // Maximum length validation
  if (todoInput.value.trim().length > 150) {
    alert(
      "Todo is too long.\nInput length cannot be greater than 150 characters.",
    );
    return;
  }

  for (var i = 0; i < todoDatabase.length; i++) {
    /*
    the alert only shows when the clicking object and current object text matches also their id not matches
    (means the object skip itself)
    */
    if (
      todoDatabase[i].text.trim().toLowerCase() ===
        todoInput.value.trim().toLowerCase() &&
      todoDatabase[i].id !== todoToBeUpdate.id
    ) {
      alert("This todo is already exists");
      return;
    }
  }
  todoToBeUpdate.text = todoInput.value;

  todoInput.value = "";
  addButton.style.display = "block";
  saveButton.style.display = "none";

  // update the localStorage todos from todos array
  window.localStorage.setItem("todos", JSON.stringify(todoDatabase));

  // resetting variables so updateTodo() forgets the current todo
  indexToBeUpdate = null;
  todoToBeUpdate = null;
  renderTodo();
}

//5. Todo Delete function

function deleteTodo(id) {
  //    console.table(todoDatabase);
  for (var i = 0; i < todoDatabase.length; i++) {
    if (todoDatabase[i].id === id) {
      todoDatabase.splice(i, 1);

      // update the localStorage todos from todos array
      window.localStorage.setItem("todos", JSON.stringify(todoDatabase));

      // resetting update variables & input
      todoInput.value = "";
      indexToBeUpdate = null;
      todoToBeUpdate = null;

      if (saveButton.style.display === "block") {
        saveButton.style.display = "none";
        addButton.style.display = "block";
      }
      renderTodo();
    }
  }
}

//6.  Function to retrieve data from local storage (if exists)

function getlocalStorageData() {
  var localSorageData = window.localStorage.getItem("todos");
  localSorageData = JSON.parse(localSorageData);

  if (localSorageData !== null) {
    todoDatabase = localSorageData;
  }
  renderTodo();
}

//7. Done todo function

function doneTodo(id) {
  for (var i = 0; i < todoDatabase.length; i++) {
    if (todoDatabase[i].id === id) {
      todoDatabase[i].isCompleted = true;

      // reset input and variables
      todoInput.value = "";
      indexToBeUpdate = null;
      todoToBeUpdate = null;

      // switching buttons if necessary
      if (saveButton.style.display === "block") {
        saveButton.style.display = "none";
        addButton.style.display = "block";
      }
      break; // breaking the loop (if id matches)
    }
  }

  // update the localStorage todos from todos array
  window.localStorage.setItem("todos", JSON.stringify(todoDatabase));
  renderTodo(); // re-render the todos
}

//8. Todo Delete all function

function deleteAllTodo() {
  // removes all todos from local storage
  window.localStorage.removeItem("todos");

  // reseting the todo array & todo input
  todoDatabase = [];
  todoInput.value = "";
  // resetting update variables
  indexToBeUpdate = null;
  todoToBeUpdate = null;

  // switching buttons if necessary
  if (saveButton.style.display === "block") {
    saveButton.style.display = "none";
    addButton.style.display = "block";
  }
  renderTodo(); // re-render the todos
}


/* *********************** EVENT LISTENERS CODE *********************** */

// 1. Triggers Add or Update logic when the enter key is pressed.
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    /*This tells the browser: Stop your default action (like refreshing the page or submitting a form) and only do what I tell you to do next.*/
    event.preventDefault();

    /*
         Initial State: In HTML/CSS, the button is visible, but element.style.display only reads "inline styles".JavaScript sees it as an empty string. so "" !== "block". That's why i wrote condition like this.
         */
    if (
      saveButton.style.display === "none" ||
      saveButton.style.display === ""
    ) {
      addTodo();
    } else {
      updateTodo();
    }
  }
});

// 2. Replacing Save Button by Add Button when input length = 0
todoInput.addEventListener("input", function () {
  if (todoInput.value.trim().length === 0) {

    if (saveButton.style.display === "block") {
      saveButton.style.display = "none";
      addButton.style.display = "block";

      // resetting variables so updateTodo() forgets the current todo
      indexToBeUpdate = null;
      todoToBeUpdate = null;
    }

  }
});
