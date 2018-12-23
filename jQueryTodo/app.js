let todosList = ["Kill Voldemort", "Visit Hagrid", "Laugh at Ron", "Feed Hedwiga", "Talk with Ginnie"];
let todosContainer = $(".todosList");
let newTodoInput = $("input");
let deleteButtons = $(".fa-trash-alt");
let todoItems;
let htmlOfTodos = ``


function displayArray(arr) {
    arr.forEach(element => {
        htmlOfTodos+=`<div class="todoItem"><span class="fas fa-trash-alt hidden"></span>${element}</div>`;
    });
    todosContainer.append(htmlOfTodos);
}
function handleDoneTasks() {
    todosContainer.on('click', '.todoItem', function(event) {
        if($(event.target).hasClass("fa-trash-alt")) {
            $(event.target).parent().detach();
            todosList.splice(todosList.indexOf($(event.target).parent().text()), 1);
        }
        $(this).toggleClass("done");
    });
    todosContainer.on('mouseenter', '.todoItem', function(e) {
        $('span', this).removeClass("hidden");
    });
    todosContainer.on('mouseleave', '.todoItem', function(e) {
        $('span', this).addClass("hidden");
    })
}
function addNewTask(todo) {
    todosList.push(todo);
    todosContainer.append(`<div class="todoItem"><span class="fas fa-trash-alt hidden"></span>${todo}</div>`);
}
function handleInput() {
    newTodoInput.keypress(function(e) {
        if(e.which === 13) {
            addNewTask($(this).val());
            $(this).val("");
        }
  });
}
function handlePlusButton() {
    $(".fas.fa-plus").click(function() {
        newTodoInput.toggleClass("hidden");
    });
}
displayArray(todosList);
handleDoneTasks();
handleInput();
handlePlusButton();
