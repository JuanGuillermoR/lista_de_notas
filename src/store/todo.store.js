import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad')
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore 🐱‍🚀');
}

const loadStore = () =>{
    throw new Error('Not implemented');
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
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) =>{
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

/**
 * 
 * @param {String} todoId 
 */
const deleteCompleted = ( todoId ) =>{
    state.todos = state.todos.filter(todo => todo.done);
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setSelecterFilter = ( newFilter = Filters.All ) =>{
   state.filter = newFilter;
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