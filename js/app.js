var taskInput = document.getElementById("new-task"); //new task
var addButton = document.getElementsByTagName("button")[0]; //first button
addButton.disabled = true;
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //ul of incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");  //ul of completed-tasks

//New Task List Item
var createNewTaskElement = function(taskString){

	//Create list item
	var listItem = document.createElement("li");

	//input (checkbox)
	var checkBox = document.createElement("input");

	//label
	var label = document.createElement("label");

	//input (text)
	var editInput = document.createElement("input");

	//button.edit
	var editButton = document.createElement("button");

	//button.delete
	var deleteButton = document.createElement("button");

	//Each element needs modifying
	checkBox.type = "checkbox";
	editInput.type = "text";
	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	//Each element needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

//Add a new task
var addTask = function() {
	console.log('Add task...');
	//Create a new li with the text from the #new-task:

	var listItem = createNewTaskElement(taskInput.value);

	//Append listItem to the incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";

}



//Edit an existing task
var editTask = function() {
	console.log('Edit task...');

	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	var containsClass = listItem.classList.contains("editMode");
	var editBtn = listItem.querySelector('button.edit');
	//if class of the parent is .editMode
	if (containsClass) {
		//switch from .editMode
		//label text become input's value
		label.innerText = editInput.value;
		editBtn.innerText = "Edit";
	} else {
		//switch to .editMode
		//input's value becomes label text
		editInput.value =label.innerText;
		//Change 'Edit' button to say 'Save'
		editBtn.innerText = "Save";
	}

		//Toggle .editMode
		listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function() {
	console.log('Delete task...');
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	//remove parent list item from the ul
	ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
	console.log('Complete task...');
	//append the task li to the #completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete)
}

//Mark a task as incomplete
var taskIncomplete = function() {
	console.log('Task incomplete...');
	//append the task li to the #incomplete-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents= function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	//bind editTask to edit button
	editButton.onclick = editTask;

	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;

	//bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;
}


//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

taskInput.addEventListener("input", function() {
  if (this.value === "") {
    addButton.disabled = true;
  }
  else {
    addButton.disabled = false;
  } 
});

//Cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
	//bind events to li children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Cycle over completedTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
	//bind events to li children (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskCompleted);
}

