import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos,renderPending } from "./use-cases";

const ElementsIDs = {
    ClearCompleted : ".clear-completed",
    NewTodoInput: '#new-todo-input',
    TodoList : '.todo-list',
    todoFilters : '.filtro',
    PendingCountLabel: '#pending-count'
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () =>{
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementsIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        renderPending(ElementsIDs.PendingCountLabel);
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
    const ClearCompletedButton = document.querySelector(ElementsIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementsIDs.todoFilters);


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
    });

    todolistUl.addEventListener('click', (event)=>{
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    ClearCompletedButton.addEventListener('click', ()=>{
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element => {

        element.addEventListener('click', (element) => {

            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');
            console.log(element.target.text);

            switch(element.target.text){
                case 'Todos':
                    todoStore.setSelecterFilter(Filters.All);
                break;
                case 'Pendientes':
                    todoStore.setSelecterFilter(Filters.Pending);
                break;
                case 'Completados':
                    todoStore.setSelecterFilter(Filters.completed);
                break;
            }
            displayTodos();
        });
    });
}