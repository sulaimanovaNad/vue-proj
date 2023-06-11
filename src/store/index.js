import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos:[]
  },
  getters: {
    getTodos(state){
      return state.todos
    }
  },
  mutations: {
    updateTodos(state,payload){
      state.todos = payload
    },
    addTodo(state,payload){
      state.todos.push(payload)
    },
    deleteTodo(state,payload){
      state.todos = state.todos.filter(todo => todo.id !== payload)
    }
  },
  actions: {
    async fetchTodos(ctx){
      const { data } = await axios ("http://localhost:8000/todos")
      ctx.commit("updateTodos",data)
    },
    async addTodo(ctx,newTodo){
      const {data} = await axios.post("http://localhost:8000/todos",newTodo)
      ctx.commit("addTodo",data)
    },
    async deleteTodo(ctx,id){
      await axios.delete(`http://localhost:8000/todos/${id}`)
      ctx.commit("deleteTodo",id)
    }
  }
})
