import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'all',
    completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        // new Todo('Piedra del alma'),
        // new Todo('Piedra del espacio'),
        // new Todo('Piedra del tiempo'),
        // new Todo('Piedra del poder'),
        // new Todo('Piedra del realidad')
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🐱‍🚀');
}

const loadStore = () =>{
    if ( !localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateLocalStorage = () =>{
    localStorage.setItem('state',JSON.stringify(state))
}

const getTodos = ( filter = Filters.All ) => {
    switch (filter) {
        case Filters.All:
                return [...state.todos];
        break;

        case Filters.completed:
            return state.todos.filter(todo => todo.done);
        break;

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        break;

        default:
            throw new Error(`Option ${filter} is not valid.`);
        break;
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));

    saveStateLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo =>{
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) =>{
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteCompleted = ( todoId ) =>{
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setSelecterFilter = ( newFilter = Filters.All ) =>{
   state.filter = newFilter;
   saveStateLocalStorage();
}

const getCurrentFilter = () =>{
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    loadStore,
    setSelecterFilter,
    toggleTodo
}