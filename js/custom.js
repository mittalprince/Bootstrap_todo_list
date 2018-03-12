
let todos = [];
let todo_list_element;

function Todo(task,done){
    this.task = task;
    this.done = !!done;
}

$(document).ready(function () {

    let btn_add = $('#btn_add_todo');
    let btn_clr = $('#btn_clear_done');
    let input_todo = $('#input_new_todo');
    todo_list_element = $('#list_todos');

    refresh_todos(true);

    btn_add.on('click',function () {
        add_todo(input_todo.val());
    })
});

function refresh_todos(first_page_load = false){
    if(!first_page_load){
        save_todos();
    }
    if(!todo_list_element){
        return ;
    }

    retrieve_todos();
    todo_list_element.empty();
    for(i in todos){
        let todo_item = create_todo_list_item(i);
        todo_list_element.append(todo_item);
    }
}

function retrieve_todos(){
    let save_todo = localStorage.getItem('Todos');
    if(save_todo){
        todos = JSON.parse(save_todo);
    }
}

function save_todos(){
    localStorage.setItem('Todos', JSON.stringify(todos));
}

function add_todo(todo_task){
    todos.push(new Todo(todo_task, false));
    refresh_todos();
}

function create_todo_list_item(i){
    let todo_item = $(`<li data-id="${i}" class="list-group-item"></li>`);
    todo_item.append($(`<input type="checkbox" class="col-1">`).attr('checked', todos[i].done));
    todo_item.append($(`<span class="col-8">${todos[i].task}</span>`));
    todo_item.append($('<i class="fa fa-remove col-1 delete"></i>').click(delete_todo));
    todo_item.append($('<i class="fa fa-chevron-up col-1 icn-move"></i>').click(move_todo_up));
    todo_item.append($('<i class="fa fa-chevron-down col-1 icn-move"></i>').click(move_todo_down));

    return todo_item;
}

function delete_todo(ev){

    let id = $(ev.target).parent().attr('data-id');
    todos.splice(id,1);
    refresh_todos();

}

function move_todo_up(ev){

    let id = parseInt($(ev.target).parent().attr('data-id'));
    todos.splice((id-1),0,(todos.splice(id,1)[0]));
    refresh_todos();

}

function move_todo_down(ev){
    let id =parseInt($(ev.target).parent().attr('data-id'));
    todos.splice((id+1),0,todos.splice(id,1)[0]);
    refresh_todos();
}