<template>
  <div class="wrapper">
    <div style="margin-bottom: 24px">
      <el-input v-model="inputVal" style="width: 240px;margin-right: 8px" />
      <el-button @click="addList">添加</el-button>
    </div>
    <todoList title="Todolist" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import todoList from '_c/todo.vue'
export default {
  data() {
    return {
      inputVal: ''
    }
  },
  components: {
    todoList
  },
  methods: {
    ...mapMutations(['appendList']),
    addList() {
      const { inputVal } = this
      if (inputVal) {
        this.appendList(inputVal)
        this.inputVal = ''
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 60%;
  margin: 20px auto;
}
</style>