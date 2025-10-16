//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

// Константы для замены магических строк
var BUTTON_EDIT_TEXT = "Edit";
var BUTTON_SAVE_TEXT = "Save";
var DELETE_ICON_SRC = './remove.svg';
var DELETE_ICON_ALT = 'Delete';
var TASK_ITEM_EDIT_CLASS = "task-item--edit";


//New task list item
// Вместо большой функции createNewTaskElement - добавляем маленькие функции:

var createCheckboxElement = function() {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    return checkbox;
};

var createLabelElement = function(taskString) {
    var label = document.createElement("label");
    label.innerText = taskString;
    label.className = 'task-item__label';
    return label;
};

var createEditInputElement = function() {
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task-item__input";
    return editInput;
};

var createEditButtonElement = function() {
    var editButton = document.createElement("button");
    editButton.innerText = BUTTON_EDIT_TEXT;
    editButton.className = "task-item__edit";
    editButton.type = "button";
    return editButton;
};

var createDeleteButtonElement = function() {
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");
    deleteButton.className = "task-item__delete";
    deleteButton.type = "button";
    deleteButtonImg.src = DELETE_ICON_SRC;
    deleteButtonImg.alt = DELETE_ICON_ALT;
    deleteButton.appendChild(deleteButtonImg);
    return deleteButton;
};

var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li");
    listItem.className = "task-item";

    listItem.appendChild(createCheckboxElement());
    listItem.appendChild(createLabelElement(taskString));
    listItem.appendChild(createEditInputElement());
    listItem.appendChild(createEditButtonElement());
    listItem.appendChild(createDeleteButtonElement());

    return listItem;
};



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

//Edit an existing task.
var editTask = function(){
    console.log("Edit Task...");

    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editButton = listItem.querySelector(".task-item__edit");
    var isInEditMode = listItem.classList.contains(TASK_ITEM_EDIT_CLASS);

    if(isInEditMode){
        // Exit edit mode
        label.innerText = editInput.value;
        editButton.innerText = BUTTON_EDIT_TEXT;
    } else {
        // Enter edit mode
        editInput.value = label.innerText;
        editButton.innerText = BUTTON_SAVE_TEXT;
    }

    listItem.classList.toggle(TASK_ITEM_EDIT_CLASS);
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");
    
    var checkbox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector(".task-item__edit");
    var deleteButton = taskListItem.querySelector(".task-item__delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkbox.onchange = checkBoxEventHandler;
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.