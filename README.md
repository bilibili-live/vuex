# vuex-demo

`vuex` 解决了组件之间通信的问题, 有以下几种概念

- state
- mutation
- action
- getter
- model

## FAQ

在你的 `vue` 项目中使用(应该使用 `-D` )

```console
cnpm i -D vuex
```

然后创建 `./store.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count: 1
  }
})
```

在 `main.js` 引入

```js
import store from './store`
new Vue({
  store
})
```

## Store

`state` 是提供唯一的公共数据源，所有共享的数据都要统一放在 `Store` 下管理

```js
export default new Vuex.Store({
  state: {
    count: 0
  }
})
```

如何使用

1. 使用全局的 `$store`

```vue
<template>
  <div>{{ $store.state.count }}</div>
</template>
```

2. 使用 `mapState`

```vue
<template>
  <div>{{ count }}</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'count'
    ])
  }
}
</script>
```

## Mutation

主要用来变更 `store` 的数据, 通过提交一个 `commit`

> 只能通过 `mutation` 来变更 `store` 的数据, 不能直接操作 `store` 的数据

```js
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutation: {
    add(state) {
      state.count++
    },
    addN(state, n){
      state.count += n
    }
  }
})
```

如何使用

1. 全局使用 `commit`

```vue
<template>
  <div>{{ count }}</div>
  <button @click="add">add</button>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([ 'count ])
  },
  methods: {
    add() {
      this.$state.commit('add')
    }
  }
}
```

2. 使用 `mapMutation` 辅助函数

```vue
<template>
  <div>{{ count }}</div>
  <button @click="add">add</button>
</template>
<script>
import { mapMutation, mapState } from 'vuex'
export default {
  computed: {
    ...mapState([ 'count ])
  },
  methods: {
    ...mapMutation([
      'add'
    ])
  }
}
```

## Action

主要用来做异步请求, 因为在 `mutation` 中不应该是用异步方法, 但是在 `action` 中还是要通过 `commit` 来触发 `mutation` 的方式间接变更数据

```js
import { getUserInfo } from '@/api/user'
export default new Vuex.Store({
  store: {
    userInfo: {}
  },
  mutation: {
    changeUserInfo(store, userInfo) {
      store.userInfo = userInfo
    }
  },
  action: {
    changeUserInfo: async ({ commit }) {
      const data = await getUserInfo()
      const { data: userInfo } = data
      commit('changeUserInfo', userInfo)
    }
  }
})
```

如何使用

1. 全局使用 `this.$store.dispatch()`

```vue
<template>
  <div>{{ count }}</div>
  <button @click="add">add</button>
</template>
<script>
export default {
  computed: {
    ...mapState([ 'count ])
  },
  methods: {
    add() {
      this.$store.dispatch('changeUserInfo')
    }
  }
}
```

2. 使用 `mapAction` 辅助函数

```vue
<template>
  <div>{{ count }}</div>
  <button @click="changeUserInfo">add</button>
</template>
<script>
import { mapAction } from 'vuex'
export default {
  computed: {
    ...mapState([ 'count' ])
  },
  methods: {
    ...mapAction([ 'changeUserInfo' ])
  }
}
```

## getter

`Getter` 用户对 `state` 中的数据进行加工处理形成新的数据, `state` 里的值更改之后, `getter` 会自动更新

```js
export default new Vuex.Store({
  store: {
    count: 0
  },
  getter: {
    showCount(state) {
      return `当前count的值: ${ state.count }`
    }
  }
})
```

如何使用

1. 使用 `this.$store.getter.showCount`

```vue
<template>
  <div>{{ $store.getter.showCount }}</div>
</template>
<script>
export default {
  methods: {
    get() {
      console.log(this.$store.getter.showCount)
    }
  }
}
</script>
```

2. 使用辅助函数 `mapGetter`

```vue
<template>
  <div>{{ showCount }}</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([ 'showCount ])
  }
}
</script>
```

## Model

多模块, 同上操作

## 常见问题

1. 如何使用 `v-model`, 参照: [next](https://itnext.io/anyway-this-is-how-to-use-v-model-with-vuex-computed-setter-in-action-320eb682c976)

```vue
<input v-model="getVal" />

computed: {
    getVal: {
        get() {
            return this.$store.state.value
        },
         set(newVal) {
             this.$store.commit('handleVal', newVal)
         }
    }
}

// store.js
mutations: {
    handleVal(state, payload) {
        state.value = payload
    }
}
```