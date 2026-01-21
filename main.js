




const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");
  
  


let allTodos =getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
   addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();

    if (todoText.length > 0){
        const todoObject ={
            text:todoText,
            completed: false
 }
    allTodos.push(todoObject);
 updateTodoList();
 saveTodos();
    todoInput.value ="";

    }
  }

function updateTodoList(){
    todoListUL.innerHTML ="";
    allTodos.forEach((todo, todoIndex)=>{

        todoItem = createTodoItem(todo, todoIndex);
            todoListUL.append(todoItem);

    })
}
 function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement('li');
    
  
    todoLI.className = "todo flex mt-4 mb-3 py-0 px-3 bg-indigo-800 rounded-2xl items-center";
    
 
    const isChecked = todo.completed ? "checked" : "";

    todoLI.innerHTML = ` 
        <input type="checkbox" class="duration-300 ease-in peer hidden" id="${todoId}" ${isChecked}>
        <label class="peer-checked:bg-teal-500 peer-checked:[&_svg]:fill-stone-700 custom-checkbox border rounded-full min-h-[20px] min-w-[20px] flex justify-center items-center shrink-0 cursor-pointer" for="${todoId}">
            <svg class="fill-transparent" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text duration-300 ease-in p-2 pr-0 grow peer-checked:line-through text-stone-800 cursor-pointer">
            ${todo.text}
        </label>
        <button class="delete-button p-1 bg-none border-none flex justify-center items-center cursor-pointer">
            <svg class="hover:fill-orange-900 text-stone-900" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </button>`;


  
     const deleteButton = todoLI.querySelector(".delete-button");

deleteButton.addEventListener("click", ()=>{
    deleteTodoItem(todoIndex);
})

const checkbox = todoLI.querySelector("input");
checkbox.addEventListener("change", ()=>{
 allTodos[todoIndex].completed = checkbox.checked;
 saveTodos()
})
return todoLI;

  }

  
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i )=> i !== todoIndex);
    saveTodos();
    updateTodoList();

    
}


  function saveTodos() {
    const todosJson =JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
  }

  function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
  }

