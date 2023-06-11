<template>
  <div id="app">
      <input v-model="addValue" type="text">
      <button @click="handleClick">Add Todo</button>
    <ul>
        <li
                v-for="todo in getTodos"
                :key="todo.id"
        >{{ todo.task }}
            <button @click="handleDelete(todo.id)">delete</button>
        </li>
    </ul>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";

export default (await import('vue')).defineComponent({
    data(){
        return {
            addValue: ''
        }
    },
    methods:{
        ...mapActions(["fetchTodos","addTodo","deleteTodo"]),
        handleClick(){
            const obj = {
                task: this.addValue,
                completed: false
            }
            this.addTodo(obj)
            this.addValue = ''
        },
        handleDelete(id){
            this.deleteTodo(id)
        }
    },
    mounted() {
        this.fetchTodos()
    },
    computed:{
        ...mapGetters(['getTodos'])
    }
})
</script>
