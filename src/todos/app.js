import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";

const ElementsIDs = {
    TodoList : '.todo-list',
    NewTodoInput: '#new-todo-input',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () =>{
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementsIDs.TodoList, todos);
    }

    //Funcion Autoinvocada
    // Cuando la funcion App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementsIDs.NewTodoInput);
    const todolistUl = document.querySelector(ElementsIDs.TodoList);

    //listeners
    newDescriptionInput.addEventListener('keyup', ( event ) =>{
        if(event.keyCode !== 13) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todolistUl.addEventListener('click', (event)=>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    todolistUl.addEventListener('click', (event)=>{
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    })
}