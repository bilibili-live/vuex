import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

const key = 'todolist'

export const setLocal = (data, k = key)=> {
  const result = JSON.stringify(data)
  window.localStorage.setItem(key, result)
}
export const getLocal = (k = key)=> {
  try {
    let res = JSON.parse(window.localStorage.getItem(k))
    if (res === null) return []
    return res
  } catch (error) {
    return []
  }
}

const removeIndexItem = index=> {
  let data = getLocal()
  data.splice(index, 1)
  setLocal(data)
}

export default new Vuex.Store({
  state: {
    todoList: []
  },
  actions: {
    async getTodoList({ commit }) {
      const list = getLocal()
      commit('setList', list)
    },
    async getNetworkTodoList({ commit }) {
      // TODO 通过网络请求获取`todolist`
    },
    async removeItem({ commit }, index) {
      try {
        removeIndexItem(index)
        commit('removeItem', index)
      } catch (error) {
        throw new Error(error)
      }
    },
    async removeAllItem({ commit }) {
      try {
        setLocal([])
        commit('removeAllItem')
      } catch (error) {
        throw new Error(error)
      }
    },
    async change({ commit, state }, data) {
      try {
        const { item, index } = data
        item.date = item.date.toString()
        const list = JSON.parse(JSON.stringify(state.todoList))
        list[index] = item
        setLocal(list)
        commit('setList', list)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async changeAllStatus({ commit, state }) {
      try {
        const list = state.todoList
        const result = list.map(item=> {
          item.status = 2
          return item
        })
        setLocal(result)
        commit('setList', result)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  mutations: {
    setList(state, list) {
      state.todoList = list
    },
    appendList(state, ctx) {
      const now = new Date()
      const item = {
        date: now.toString(),
        ctx,
        status: 0
      }
      state.todoList.unshift(item)
      setLocal(state.todoList)
    },
    removeItem(state, index) {
      state.todoList.splice(index, 1)
    },
    removeAllItem(state) {
      state.todoList = []
    }
  },
  getters: {
    todoList(state) {
      const list = JSON.parse(JSON.stringify(state.todoList))
      const result = list.map(item=>{
        let status = '', type = ''
        switch (item.status) {
          case 0:
            status = '没开始'
            type = 'info'
            break
          case 1:
            status = '开始了'
            type = 'warning'
            break
          case 2:
            status = '已完成'
            type = 'success'
            break
        }
        item.status = status
        item.type = type
        item.date = dayjs(item.date).format("YYYY年MM月DD日")
        return item
      })
      return result
    }
  }
})